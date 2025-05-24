// import axios from 'axios';

// // API base URL - points to your Spring Boot backend
// const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080/api/notes';

// // Configure axios defaults
// axios.defaults.headers.common['Content-Type'] = 'application/json';

// // Add request interceptor for debugging
// axios.interceptors.request.use(
//   (config) => {
//     console.log('Making API request:', config.method?.toUpperCase(), config.url);
//     return config;
//   },
//   (error) => {
//     console.error('Request error:', error);
//     return Promise.reject(error);
//   }
// );

// // Add response interceptor for error handling
// axios.interceptors.response.use(
//   (response) => {
//     console.log('API response received:', response.status, response.config.url);
//     return response;
//   },
//   (error) => {
//     console.error('API error:', error.response?.status, error.response?.data || error.message);
//     return Promise.reject(error);
//   }
// );

// const noteService = {
//   /**
//    * Get all notes from the backend
//    */
//   async getAllNotes() {
//     try {
//       const response = await axios.get(API_BASE_URL);
//       return response.data;
//     } catch (error) {
//       console.error('Error fetching notes:', error);
//       throw new Error(error.response?.data?.message || 'Failed to fetch notes');
//     }
//   },

//   /**
//    * Create a new note
//    */
//   async createNote(note) {
//     try {
//       const response = await axios.post(API_BASE_URL, note);
//       return response.data;
//     } catch (error) {
//       console.error('Error creating note:', error);
//       throw new Error(error.response?.data?.message || 'Failed to create note');
//     }
//   },

//   /**
//    * Update an existing note
//    */
//   async updateNote(id, updates) {
//     try {
//       const response = await axios.put(`${API_BASE_URL}/${id}`, updates);
//       return response.data;
//     } catch (error) {
//       console.error('Error updating note:', error);
//       throw new Error(error.response?.data?.message || 'Failed to update note');
//     }
//   },

//   /**
//    * Delete a note
//    */
//   async deleteNote(id) {
//     try {
//       await axios.delete(`${API_BASE_URL}/${id}`);
//       return { success: true };
//     } catch (error) {
//       console.error('Error deleting note:', error);
//       throw new Error(error.response?.data?.message || 'Failed to delete note');
//     }
//   },

//   /**
//    * Search notes by query string
//    */
//   async searchNotes(query) {
//     try {
//       if (!query || !query.trim()) {
//         return this.getAllNotes();
//       }
//       const response = await axios.get(`${API_BASE_URL}/search?q=${encodeURIComponent(query.trim())}`);
//       return response.data;
//     } catch (error) {
//       console.error('Error searching notes:', error);
//       throw new Error(error.response?.data?.message || 'Failed to search notes');
//     }
//   },

//   /**
//    * Get a single note by ID
//    */
//   async getNoteById(id) {
//     try {
//       const response = await axios.get(`${API_BASE_URL}/${id}`);
//       return response.data;
//     } catch (error) {
//       console.error('Error fetching note:', error);
//       throw new Error(error.response?.data?.message || 'Failed to fetch note');
//     }
//   }
// };

// export default noteService;

// Simulated in-memory notes database
let notes = [
//   {
//     id: "1",
//     title: "First Note",
//     content: "This is your first note.",
//     createdAt: new Date().toISOString(),
//     updatedAt: new Date().toISOString(),
//   },
//   {
//     id: "2",
//     title: "Second Note",
//     content: "Another note for testing.",
//     createdAt: new Date().toISOString(),
//     updatedAt: new Date().toISOString(),
//   },
];

// Helper function to generate a simple unique ID
function generateId() {
  return Math.random().toString(36).substr(2, 9);
}

const noteService = {
  async getAllNotes() {
    return [...notes]; // Return a copy
  },

  async getNoteById(id) {
    const note = notes.find((n) => n.id === id);
    if (!note) throw new Error("Note not found");
    return { ...note };
  },

  async createNote(note) {
    const newNote = {
      id: generateId(),
      title: note.title || "Untitled",
      content: note.content || "",
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    notes.push(newNote);
    return { ...newNote };
  },

  async updateNote(id, updates) {
    const index = notes.findIndex((n) => n.id === id);
    if (index === -1) throw new Error("Note not found");

    notes[index] = {
      ...notes[index],
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    return { ...notes[index] };
  },

  async deleteNote(id) {
    const index = notes.findIndex((n) => n.id === id);
    if (index === -1) throw new Error("Note not found");

    notes.splice(index, 1);
    return { success: true };
  },

  async searchNotes(query) {
    const q = query.toLowerCase();
    return notes.filter(
      (n) =>
        n.title.toLowerCase().includes(q) || n.content.toLowerCase().includes(q)
    );
  },
};

export default noteService;
