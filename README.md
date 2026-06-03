# BloggyTech 🚀

A modern full-stack blogging platform built using the MERN stack, where users can create, share, and engage with blogs through likes, dislikes, claps, comments, follows, and personalized profiles.

## ✨ Features

### 👤 User Authentication
- Register and Login
- JWT-based Authentication
- Protected Routes
- User Profile Management

### 📝 Blog Posts
- Create Posts
- Update Posts
- Delete Posts
- View Post Details
- Categorized Content

### ❤️ Engagement System
- Like Posts
- Dislike Posts
- Clap Posts
- Real-time UI Updates
- Comment on Posts

### 👥 Social Features
- Follow Users
- Unfollow Users
- Block Users
- Unblock Users
- Public User Profiles

### 🖼️ Media Uploads
- Profile Image Upload
- Cover Image Upload
- Blog Post Image Upload

### 🔍 Discovery
- Browse All Posts
- Category Filtering
- Random Post Suggestions
- Author Profiles

### 🎨 Modern UI
- Responsive Design
- React Toast Notifications
- Loading States
- Error Handling
- Clean User Experience

---

## 🛠️ Tech Stack

### Frontend
- React.js
- Redux Toolkit
- React Router DOM
- Axios
- Tailwind CSS
- React Icons
- React Toastify

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JWT Authentication
- Bcrypt

### Cloud Services
- Cloudinary (Image Storage)

---

## 📂 Project Structure

```text
BloggyTech/
│
├── frontend/
│   ├── src/
│   ├── public/
│   └── package.json
│
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── models/
│   ├── middleware/
│   ├── config/
│   └── package.json
│
└── README.md
```

---

## 🚀 Installation

### Clone Repository

```bash
git clone https://github.com/your-username/bloggytech.git
```

```bash
cd bloggytech
```

---

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key

CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

Start backend:

```bash
npm run dev
```

---

### Frontend Setup

```bash
cd frontend
npm install
```

Start frontend:

```bash
npm run dev
```

---

## 🔐 Environment Variables

The following environment variables are required:

```env
MONGO_URI=
JWT_SECRET=

CLOUDINARY_CLOUD_NAME=
CLOUDINARY_API_KEY=
CLOUDINARY_API_SECRET=
```

---

## 📸 Screenshots

Add screenshots of:

- Home Page
- Create Post Page
- Post Details Page
- User Profile
- Authentication Pages

---

## 🎯 Future Improvements

- Bookmark Posts
- Search Functionality
- Rich Text Editor
- Notifications
- Dark Mode
- User Messaging
- Admin Dashboard
- Post Analytics

---

## 👨‍💻 Author

Krish Goyal

B.Tech CSE Student | MERN Stack Developer

---

## 📜 License

This project is licensed under the MIT License.

Feel free to use, modify, and distribute this project.
