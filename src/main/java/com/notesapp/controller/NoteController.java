package com.notesapp.controller;

import com.notesapp.model.Note;
import com.notesapp.service.NoteService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/notes")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
@Slf4j
public class NoteController {
    
    private final NoteService noteService;
    
    @GetMapping
    public ResponseEntity<List<Note>> getAllNotes() {
        log.info("GET /api/notes - Fetching all notes");
        List<Note> notes = noteService.getAllNotes();
        return ResponseEntity.ok(notes);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Note> getNoteById(@PathVariable String id) {
        log.info("GET /api/notes/{} - Fetching note by id", id);
        Note note = noteService.getNoteById(id);
        return ResponseEntity.ok(note);
    }
    
    @PostMapping
    public ResponseEntity<Note> createNote(@Valid @RequestBody Note note) {
        log.info("POST /api/notes - Creating new note");
        Note createdNote = noteService.createNote(note);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdNote);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Note> updateNote(@PathVariable String id, 
                                         @Valid @RequestBody Note noteDetails) {
        log.info("PUT /api/notes/{} - Updating note", id);
        Note updatedNote = noteService.updateNote(id, noteDetails);
        return ResponseEntity.ok(updatedNote);
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteNote(@PathVariable String id) {
        log.info("DELETE /api/notes/{} - Deleting note", id);
        noteService.deleteNote(id);
        return ResponseEntity.noContent().build();
    }
    
    @GetMapping("/search")
    public ResponseEntity<List<Note>> searchNotes(@RequestParam String q) {
        log.info("GET /api/notes/search?q={} - Searching notes", q);
        List<Note> notes = noteService.searchNotes(q);
        return ResponseEntity.ok(notes);
    }
}