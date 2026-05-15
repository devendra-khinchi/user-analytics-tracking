# 📊 User Analytics Application

A full-stack application to track user interactions (page views & clicks) and visualize them through session analytics and heatmaps.

---

## 🚀 Tech Stack

### Frontend

- React (JavaScript)
- TailwindCSS

### Backend

- Node.js (Express)

### Database

- MongoDB (MongoDB Atlas)

---

## ✨ Features

- Track user events (page_view, click)
- Session-based tracking using localStorage
- View sessions with total event counts
- User journey visualization (ordered events)
- Heatmap visualization of click positions
- Reusable tracking script (`tracker.js`) in `/backend/public/`

---

## ⚙️ Setup Instructions

### 1. Clone the repository

git clone https://github.com/devendra-khinchi/user-analytics-tracking.git

---

### 2. Backend Setup

cd backend
npm install

Create `.env` file:
PORT=5000
MONGO_URI=your_mongodb_connection
DATABASE_NAME=database_name

Run backend:
npm start

---

### 3. Frontend Setup

cd frontend
npm install

Run frontend:
npm start

---

### 4. Demo Page

Open in browser:
http://localhost:8000/demo.html

---

## 🧠 How Tracking Works

- `tracker.js` is served from backend
- It captures:
  - page_view (on load)
  - click (with x/y coordinates)

- Events are sent to backend API
- Stored in MongoDB
- Displayed in dashboard

---

## ⚖️ Assumptions / Trade-offs

- No authentication implemented
- Session stored in localStorage (not cross-device)
- Events are sent individually (no batching)
- Basic heatmap visualization (no clustering)

---

## 🚀 Future Improvements

- Event batching for performance
- Real-time analytics (Polling / WebSockets)
- Heatmap intensity clustering

---

## 👨‍💻 Author

Devendra Khinchi
