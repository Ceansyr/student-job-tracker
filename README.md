# Student Job Tracker

A full-stack web application designed to help students track their job applications throughout the job search process.

---

## ✨ Features

- **Job Application Management**: Add, view, edit, and delete job applications
- **Status Tracking**: Track application status (Applied, Interview, Offer, Rejected)
- **Filtering**: Filter applications by status and application date
- **Responsive Design**: Works on desktop and mobile devices
- **Real-time Updates**: Instant feedback with notifications

---

## 🛠️ Tech Stack

### Frontend

- React 19
- React Router 7
- Vite 6
- CSS3

### Backend

- Node.js
- Express
- MongoDB
- Mongoose
- Zod (Validation)

---

## 📚 Project Structure

```
student-job-tracker/
├── frontend/               # React frontend
│   ├── src/                # Source files
│   │   ├── pages/          # Page components
│   │   ├── App.jsx         # Main application component
│   │   └── App.css         # Application styles
│   ├── public/             # Static files
│   └── package.json        # Frontend dependencies
├── backend/                # Node.js backend
│   ├── config/             # Configuration files
│   ├── controllers/        # Request handlers
│   ├── middlewares/        # Express middlewares
│   ├── models/             # Mongoose models
│   ├── routes/             # API routes
│   ├── validators/         # Input validation
│   ├── server.js           # Server entry point
│   └── package.json        # Backend dependencies
└── README.md               # Project documentation
```

---

## ✨ Getting Started

### 🚀 Prerequisites

- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- Git

### ☑️ Installation

1. Clone the repository:

```bash
git clone https://github.com/Ceansyr/student-job-tracker.git
cd student-job-tracker
```

2. Install backend dependencies:

```bash
cd backend
npm install
```

3. Create a `.env` file in the `backend` directory:

```env
PORT=5000
MONGO_URI=mongodb://localhost:27017/student-job-tracker
```

4. Install frontend dependencies:

```bash
cd ../frontend
npm install
```

5. Create a `.env` file in the `frontend` directory:

```env
VITE_API_URL=http://localhost:5000/api
```

### 🌍 Running Locally

Start the backend server:

```bash
cd backend
npm run dev
```

Start the frontend development server:

```bash
cd frontend
npm run dev
```

Open your browser and navigate to `http://localhost:5173`

---

## 🚀 Deployment

### Backend Deployment (Render)

1. Create a new **Web Service** on [Render](https://render.com)
2. Connect your GitHub repository
3. Configure the service:
   - Build Command: `npm install`
   - Start Command: `node server.js`
4. Add environment variable: `MONGO_URI`
5. Deploy

### Frontend Deployment (Vercel)

1. Push your code to GitHub
2. Import the project in [Vercel](https://vercel.com)
3. Configure build settings:
   - Framework Preset: `Vite`
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Add environment variable: `VITE_API_URL`
5. Deploy

---

## 🔗 API Endpoints

| Method | Endpoint        | Description      | Request Body                                            |
| ------ | --------------- | ---------------- | ------------------------------------------------------- |
| GET    | `/api/jobs`     | Get all jobs     | Query: `status`, `appliedDate`, `page`, `limit`         |
| POST   | `/api/jobs`     | Create a new job | `title`, `company`, `location`, `status`, `appliedDate` |
| PATCH  | `/api/jobs/:id` | Update a job     | Any job fields to update                                |
| DELETE | `/api/jobs/:id` | Delete a job     | None                                                    |

---

## 🚀 Future Enhancements

- User authentication
- Job application notes
- Interview scheduling
- Email notifications
- Data visualization
- Export to CSV/PDF

---

## 💼 License

MIT

---

## 👤 Author

**Chinmay Mandavkar**
