# AI Resume Builder

AI Resume Builder is a full-stack web application that helps users create, customize, and manage professional resumes with AI assistance. Users can build resumes from scratch, upload existing PDF resumes, improve content using AI, customize templates and colors, share resumes publicly, and export them as PDF documents.

---

## ✨ Features

### 🔐 Authentication

- User registration and login
- JWT-based authentication
- Secure password hashing with bcrypt
- Persistent sessions using local storage

### 📄 Resume Management

- Create multiple resumes
- Edit and update resumes
- Delete resumes
- Upload an existing PDF resume
- Add resume images
- Control resume visibility (Public/Private)
- Share resumes via public links

### 🤖 AI Assistance

- AI-powered resume content enhancement
- Improve professional summaries
- Enhance work experience descriptions
- Generate more professional and impactful content

### 🎨 Customization

- Multiple resume templates
- Custom accent colors
- Live resume preview
- Responsive design

### 📤 Export & Sharing

- Download resumes as PDF
- Print resumes directly from the browser
- Share public resumes with others

---

## 🛠 Tech Stack

### Frontend

- React
- Vite
- Tailwind CSS
- Redux Toolkit
- React Router
- Axios
- Lucide React
- React Hot Toast

### Backend

- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT (jsonwebtoken)
- Bcrypt
- Multer
- ImageKit
- OpenAI API
- CORS

---

## 📁 Project Structure

```text
ai-resume-builder/
│
├── client/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── server/
│ │ ├── controllers/
│ │ ├── routes/
│ │ ├── middlewares/
│ │ ├── models/
│ │ ├── configs/
│ │ └── package.json
│ └── server.js
└── README.md
```

---

## 📋 Supported Resume Sections

- Personal Information
- Professional Summary
- Work Experience
- Education
- Projects
- Skills

---

## 🚀 API Routes

### User Routes

Handles:

- User registration
- User login
- Authentication
- Password management

### Resume Routes

Handles:

- Resume CRUD operations
- Resume customization
- Resume visibility settings
- Resume sharing

### AI Routes

Handles:

- AI-powered content enhancement
- Resume section improvements

---

## ⚙️ Installation

### Clone the Repository

```bash
git clone https://github.com/giorgi583/Resume-builder-website.git
cd Resume-builder-website
```

### Install Frontend Dependencies

```bash
cd client
npm install
```

### Install Backend Dependencies

```bash
cd ../server
npm install
```

---

## 🔑 Environment Variables

Create a `.env` file inside the `server` directory:

```env
PORT=5000

MONGO_URI=

JWT_SECRET=

OPENAI_API_KEY=

IMAGEKIT_PUBLIC_KEY=

IMAGEKIT_PRIVATE_KEY=

IMAGEKIT_URL_ENDPOINT=
```

---

## ▶️ Running the Application

### Start the Backend

```bash
cd server
npm run dev
```

### Start the Frontend

```bash
cd client
npm run dev
```

Frontend:

```text
http://localhost:5173
```

Backend:

```text
http://localhost:3000
```

---

## 🔒 Authentication Flow

1. User registers or logs in.
2. Server validates credentials.
3. JWT access token is generated.
4. Token is stored in local storage.
5. Protected routes require a valid token.
6. Backend verifies the token before processing requests.

---

## 🖼 Image Uploads

Resume images are handled using:

- Multer for file processing
- ImageKit for image storage and delivery

---

## 🤖 AI Integration

The application uses the OpenAI API to enhance resume content.

Examples include:

- Improving professional summaries
- Enhancing work experience descriptions
- Refining project details
- Making content more professional and ATS-friendly

---

## 📄 PDF Support

Users can:

- Upload existing PDF resumes
- Download generated resumes as PDF
- Print resumes directly from the browser

---

## 🔮 Future Improvements

- Resume analytics
- Resume version history
- Cover letter generation
- Multi-language support
- Resume scoring system
- More advanced AI suggestions

---

## 📦 Repository

Repository: https://github.com/giorgi583/Resume-builder-website

---

## 📜 License

This project is intended for educational and portfolio purposes.