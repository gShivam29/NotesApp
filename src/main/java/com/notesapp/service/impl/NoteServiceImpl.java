package com.notesapp.service.impl;

import com.notesapp.exception.NoteNotFoundException;
import com.notesapp.model.Note;
import com.notesapp.repository.NoteRepository;
import com.notesapp.service.NoteService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
@RequiredArgsConstructor
@Slf4j
public class NoteServiceImpl implements NoteService {
    
    private final NoteRepository noteRepository;
    
    @Override
    public List<Note> getAllNotes() {
        log.debug("Fetching all notes");
        return noteRepository.findAllByOrderByUpdatedAtDesc();
    }
    
    @Override
    public Note getNoteById(String id) {
        log.debug("Fetching note with id: {}", id);
        return noteRepository.findById(id)
                .orElseThrow(() -> new NoteNotFoundException("Note not found with id: " + id));
    }
    
    @Override
    public Note createNote(Note note) {
        log.debug("Creating new note with title: {}", note.getTitle());
        note.setCreatedAt(LocalDateTime.now());
        note.setUpdatedAt(LocalDateTime.now());
        Note savedNote = noteRepository.save(note);
        log.debug("Note created with id: {}", savedNote.getId());
        return savedNote;
    }
    
    @Override
    public Note updateNote(String id, Note noteDetails) {
        log.debug("Updating note with id: {}", id);
        Note existingNote = getNoteById(id);
        
        existingNote.setTitle(noteDetails.getTitle());
        existingNote.setContent(noteDetails.getContent());
        existingNote.setUpdatedAt(LocalDateTime.now());
        
        Note updatedNote = noteRepository.save(existingNote);
        log.debug("Note updated with id: {}", updatedNote.getId());
        return updatedNote;
    }
    
    @Override
    public void deleteNote(String id) {
        log.debug("Deleting note with id: {}", id);
        Note note = getNoteById(id);
        noteRepository.delete(note);
        log.debug("Note deleted with id: {}", id);
    }
    
    @Override
    public List<Note> searchNotes(String searchTerm) {
        log.debug("Searching notes with term: {}", searchTerm);
        if (searchTerm == null || searchTerm.trim().isEmpty()) {
            return getAllNotes();
        }
        return noteRepository.findByTitleContainingIgnoreCaseOrContentContainingIgnoreCase(searchTerm.trim());
    }
}