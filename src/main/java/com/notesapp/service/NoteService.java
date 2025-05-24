package com.notesapp.service;

import com.notesapp.model.Note;
import java.util.List;

public interface NoteService {
    List<Note> getAllNotes();
    Note getNoteById(String id);
    Note createNote(Note note);
    Note updateNote(String id, Note note);
    void deleteNote(String id);
    List<Note> searchNotes(String searchTerm);
}