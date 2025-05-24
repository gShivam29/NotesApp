import React, { useState } from 'react';
import { Save, X } from 'lucide-react';

const NoteForm = ({ note, onSave, onCancel, isLoading }) => {
  const [title, setTitle] = useState(note?.title || '');
  const [content, setContent] = useState(note?.content || '');

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (title.trim() && content.trim()) {
      onSave({ title: title.trim(), content: content.trim() });
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && e.ctrlKey) {
      handleSubmit(e);
    }
    if (e.key === 'Escape') {
      onCancel();
    }
  };

  return (
    <div className="mb-8 bg-white rounded-lg shadow-lg p-6 border border-gray-200">
      <div>
        <div className="mb-4">
          <input
            type="text"
            placeholder="Note title..."
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            onKeyDown={handleKeyDown}
            className="w-full text-xl font-semibold border-none outline-none placeholder-gray-400 p-2 rounded focus:bg-gray-50"
            autoFocus
          />
        </div>
        <div className="mb-6">
          <textarea
            placeholder="Write your note here... (Ctrl+Enter to save, Escape to cancel)"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            onKeyDown={handleKeyDown}
            rows={6}
            className="w-full border-none outline-none resize-none placeholder-gray-400 p-2 rounded focus:bg-gray-50"
          />
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleSubmit}
            disabled={isLoading || !title.trim() || !content.trim()}
            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 transition-colors"
          >
            <Save className="h-4 w-4" />
            {isLoading ? 'Saving...' : 'Save'}
          </button>
          <button
            onClick={onCancel}
            disabled={isLoading}
            className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 disabled:opacity-50 flex items-center gap-2 transition-colors"
          >
            <X className="h-4 w-4" />
            Cancel
          </button>
        </div>
        <div className="mt-2 text-sm text-gray-500">
          <kbd className="px-2 py-1 bg-gray-100 rounded text-xs">Ctrl+Enter</kbd> to save, 
          <kbd className="px-2 py-1 bg-gray-100 rounded text-xs ml-1">Escape</kbd> to cancel
        </div>
      </div>
    </div>
  );
};

export default NoteForm;