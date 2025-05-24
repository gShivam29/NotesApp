import React, { useState, useEffect } from 'react';
import { Search, Plus, FileText } from 'lucide-react';
import noteService from './services/noteService';
import NoteCard from './components/NoteCard';
import NoteForm from './components/NoteForm';
import './App.css';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [editingNote, setEditingNote] = useState(null);
  const [isCreating, setIsCreating] = useState(false);
  const [error, setError] = useState('');

  // Load notes on component mount
  useEffect(() => {
    loadNotes();
  }, []);

  // Search functionality with debouncing
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery.trim()) {
        handleSearch();
      } else {
        loadNotes();
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  const loadNotes = async () => {
    try {
      setIsLoading(true);
      setError('');
      const fetchedNotes = await noteService.getAllNotes();
      setNotes(fetchedNotes);
    } catch (err) {
      setError(err.message);
      console.error('Failed to load notes:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async () => {
    try {
      setIsLoading(true);
      setError('');
      const searchResults = await noteService.searchNotes(searchQuery);
      setNotes(searchResults);
    } catch (err) {
      setError(err.message);
      console.error('Search failed:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateNote = async (noteData) => {
    try {
      setIsLoading(true);
      setError('');
      const newNote = await noteService.createNote(noteData);
      setNotes(prev => [newNote, ...prev]);
      setIsCreating(false);
    } catch (err) {
      setError(err.message);
      console.error('Failed to create note:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpdateNote = async (id, updates) => {
    try {
      setIsLoading(true);
      setError('');
      const updatedNote = await noteService.updateNote(id, updates);
      setNotes(prev => prev.map(note => note.id === id ? updatedNote : note));
      setEditingNote(null);
    } catch (err) {
      setError(err.message);
      console.error('Failed to update note:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteNote = async (id) => {
    if (!window.confirm('Are you sure you want to delete this note?')) return;
    
    try {
      setIsLoading(true);
      setError('');
      await noteService.deleteNote(id);
      setNotes(prev => prev.filter(note => note.id !== id));
    } catch (err) {
      setError(err.message);
      console.error('Failed to delete note:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8 max-w-6xl">
        {/* Header */}
        <div className="text-center mb-8 animate-fade-in">
          <div className="flex items-center justify-center mb-4">
            <FileText className="h-12 w-12 text-indigo-600 mr-3" />
            <h1 className="text-4xl font-bold text-gray-800">Notes App</h1>
          </div>
          <p className="text-gray-600 text-lg">Organize your thoughts and ideas</p>
        </div>

        {/* Search and Create Section */}
        <div className="flex flex-col md:flex-row gap-4 mb-8 animate-slide-up">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <input
              type="text"
              placeholder="Search notes..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all duration-200"
            />
          </div>
          <button
            onClick={() => setIsCreating(true)}
            disabled={isLoading}
            className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2 font-medium"
          >
            <Plus className="h-5 w-5" />
            New Note
          </button>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-100 border border-red-300 text-red-700 rounded-lg animate-slide-up">
            <p className="font-medium">Error:</p>
            <p>{error}</p>
            <button
              onClick={() => setError('')}
              className="mt-2 text-sm text-red-600 hover:text-red-800 underline"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Create Note Form */}
        {isCreating && (
          <div className="animate-slide-up">
            <NoteForm
              onSave={handleCreateNote}
              onCancel={() => setIsCreating(false)}
              isLoading={isLoading}
            />
          </div>
        )}

        {/* Loading State */}
        {isLoading && !isCreating && !editingNote && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600"></div>
            <p className="mt-2 text-gray-600">Loading notes...</p>
          </div>
        )}

        {/* Notes Grid */}
        {!isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {notes.length === 0 ? (
              <div className="col-span-full text-center py-12 animate-fade-in">
                <FileText className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-500 mb-2">No notes found</h3>
                <p className="text-gray-400">
                  {searchQuery ? 'Try a different search term' : 'Create your first note to get started'}
                </p>
              </div>
            ) : (
              notes.map((note, index) => (
                <div key={note.id} className="animate-slide-up" style={{ animationDelay: `${index * 0.1}s` }}>
                  <NoteCard
                    note={note}
                    isEditing={editingNote?.id === note.id}
                    onEdit={() => setEditingNote(note)}
                    onSave={(updates) => handleUpdateNote(note.id, updates)}
                    onCancel={() => setEditingNote(null)}
                    onDelete={() => handleDeleteNote(note.id)}
                    isLoading={isLoading}
                    formatDate={formatDate}
                  />
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default App;