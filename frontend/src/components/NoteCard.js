import React from 'react';
import { Edit2, Trash2 } from 'lucide-react';
import NoteForm from './NoteForm';

const NoteCard = ({ 
  note, 
  isEditing, 
  onEdit, 
  onSave, 
  onCancel, 
  onDelete, 
  isLoading, 
  formatDate 
}) => {
  if (isEditing) {
    return (
      <div className="bg-white rounded-lg shadow-lg p-6 border border-indigo-200">
        <NoteForm note={note} onSave={onSave} onCancel={onCancel} isLoading={isLoading} />
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200 hover:shadow-xl transition-all duration-200 note-card">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-xl font-semibold text-gray-800 truncate flex-1 mr-2">
          {note.title}
        </h3>
        <div className="flex gap-2 flex-shrink-0">
          <button
            onClick={onEdit}
            disabled={isLoading}
            className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors disabled:opacity-50"
            title="Edit note"
          >
            <Edit2 className="h-4 w-4" />
          </button>
          <button
            onClick={onDelete}
            disabled={isLoading}
            className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors disabled:opacity-50"
            title="Delete note"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
      
      <p className="text-gray-600 mb-4 line-clamp-4 leading-relaxed">
        {note.content}
      </p>
      
      <div className="flex justify-between items-center text-sm text-gray-500 border-t pt-3">
        <span title={`Created: ${formatDate(note.createdAt)}`}>
          Created: {formatDate(note.createdAt)}
        </span>
        {note.updatedAt && note.updatedAt !== note.createdAt && (
          <span title={`Updated: ${formatDate(note.updatedAt)}`}>
            Updated: {formatDate(note.updatedAt)}
          </span>
        )}
      </div>
    </div>
  );
};

export default NoteCard;