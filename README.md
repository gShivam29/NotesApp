# 📝 Full Stack Notes Application

A modern, responsive note-taking web application built with **Java Spring Boot** and **React.js**. Create, edit, delete, and search through your personal notes with a clean and intuitive interface.

![image](https://github.com/user-attachments/assets/8753b05b-fad3-46d5-bf3c-9f6f01d5f7db)


## ✨ Features

- 📄 **CRUD Operations** - Create, read, update, and delete notes
- 🔍 **Real-time Search** - Search through titles and content instantly  
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile
- ⚡ **Fast Performance** - Optimized React frontend with Spring Boot API
- 🗄️ **MongoDB Integration** - Reliable NoSQL database storage

![demo](https://github.com/user-attachments/assets/be8f1161-6943-4ec3-a69b-796356b10acf)


## 🛠️ Tech Stack

**Backend:**
- Java 17
- Spring Boot 3.2
- Spring Data MongoDB
- Maven

**Frontend:**
- React.js
- Tailwind CSS
- Axios
- Lucide Icons

**Database:**
- MongoDB

## 🚀 Quick Start

### Prerequisites
- Java 17+
- Node.js 18+
- Maven 3.6+
- MongoDB (local or Atlas)

### Backend Setup
```bash
cd backend
mvn clean install
mvn spring-boot:run
```

Backend runs on `http://localhost:8080`

### Frontend Setup
```bash
cd frontend
npm install
npm start
```

Frontend runs on `http://localhost:3000`


## 📁 Project Structure

```
notes-app/
├── backend/          # Spring Boot API
│   ├── src/main/java/
│   ├── pom.xml
│   └── application.yml
├── frontend/         # React Application
│   ├── src/
│   ├── package.json
│   └── public/
└── README.md
```

## 🔧 Configuration

**Backend** - Update `application.yml`:
```yaml
spring:
  data:
    mongodb:
      uri: mongodb://localhost:27017/notesapp
```

**Frontend** - Update API base URL in `noteService.js`:
```javascript
const API_BASE_URL = 'http://localhost:8080/api/notes';
```

## 📸 Screenshots

### Main Interface
![image](https://github.com/user-attachments/assets/9c23ad48-0405-45f7-841b-c88cd007d1a6)


### Creating Notes
![image](https://github.com/user-attachments/assets/9945eb30-2758-4ad6-8b1b-e451762aea5d)


### Search Functionality
![image](https://github.com/user-attachments/assets/0afc1f55-1cb0-4356-a0da-5e60a73ad864)

### Edit Functionality
![image](https://github.com/user-attachments/assets/94320eb8-296f-4f5e-af9e-250a1e21fb68)

![image](https://github.com/user-attachments/assets/09d59eec-c8fd-4775-a7e2-dc84335d6a0e)

## 🌐 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/notes` | Get all notes |
| POST | `/api/notes` | Create new note |
| PUT | `/api/notes/{id}` | Update note |
| DELETE | `/api/notes/{id}` | Delete note |
| GET | `/api/notes/search?q={term}` | Search notes |

## 🚀 Deployment

### Backend
```bash
mvn clean package
java -jar target/notes-backend-1.0.0.jar
```

### Frontend
```bash
npm run build
# Deploy build/ folder to your hosting service
```

## 📝 Usage

1. **Create Note** - Click "New Note" button
2. **Edit Note** - Click edit icon on any note
3. **Search** - Type in the search bar to filter notes
4. **Delete** - Click trash icon (with confirmation)
