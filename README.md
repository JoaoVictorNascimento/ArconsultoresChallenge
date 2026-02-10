# ArconsultoresChallenge

Full-stack application for transaction management with React frontend and Node.js backend.

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Technologies](#technologies)
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Environment Variables](#environment-variables)
- [API Documentation](#api-documentation)
- [Features](#features)

## 🎯 Project Overview

This is a full-stack transaction management application that allows users to create and view transactions through a modern web interface.

**Frontend**: Built with React, featuring a form with validation using React Hook Form and Zod, styled with Tailwind CSS and shadcn/ui components.

**Backend**: RESTful API built with Node.js and Express, storing data in memory.

## 🚀 Technologies

### Frontend
- React 19.2.4
- React Hook Form 7.71.1
- Zod 4.3.6 (validation)
- Tailwind CSS 3.x
- shadcn/ui components
- Axios/Fetch API

### Backend
- Node.js
- Express 4.x
- CORS
- Nodemon (development)

## 📁 Project Structure

```
ArconsultoresChallenge/
├── frontend/                 # React application
│   ├── src/
│   │   ├── components/      # React components
│   │   │   ├── ui/         # shadcn/ui components
│   │   │   └── TransactionForm.jsx
│   │   ├── config/         # Configuration files
│   │   │   └── api.js      # API endpoints configuration
│   │   ├── App.js
│   │   └── index.js
│   ├── .env                # Environment variables
│   └── package.json
│
├── backend/                 # Node.js API
│   ├── server.js           # Express server
│   └── package.json
│
└── README.md
```

## ✅ Prerequisites

Before running this project, make sure you have installed:

- **Node.js** (version 14 or higher)
- **npm** (comes with Node.js)

To check if you have Node.js and npm installed:

```bash
node --version
npm --version
```

## 📦 Installation

### 1. Clone the repository

```bash
git clone <repository-url>
cd ArconsultoresChallenge
```

### 2. Install Backend Dependencies

```bash
cd backend
npm install
```

### 3. Install Frontend Dependencies

```bash
cd ../frontend
npm install
```

## 🏃 Running the Application

You need to run both the backend and frontend servers simultaneously.

### Option 1: Using Two Terminal Windows

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```
The backend will start on `http://localhost:5001`

**Terminal 2 - Frontend:**
```bash
cd frontend
npm start
```
The frontend will start on `http://localhost:3000`

### Option 2: Using Background Processes

**Start backend in background:**
```bash
cd backend
npm run dev &
```

**Start frontend:**
```bash
cd frontend
npm start
```

### 🎉 Access the Application

Once both servers are running, open your browser and navigate to:
```
http://localhost:3000
```

## 🔐 Environment Variables

### Frontend (.env)

Create a `.env` file in the `frontend` directory:

```env
REACT_APP_API_URL=http://localhost:5001
```

**Note**: After changing environment variables, you must restart the React development server.

### Backend

The backend uses the following default configuration:
- **Port**: 5001 (configurable via `PORT` environment variable)
- **CORS Origin**: http://localhost:3000

To change the port, you can set the `PORT` environment variable:

```bash
PORT=8000 npm run dev
```

## 📚 API Documentation

### Base URL
```
http://localhost:5001/api
```

### Endpoints

#### 1. Create Transaction
```http
POST /api/transactions
Content-Type: application/json

{
  "value": 100.50,
  "description": "Transaction description"
}
```

**Response (201 Created):**
```json
{
  "message": "Transaction created successfully",
  "transaction": {
    "id": 1,
    "value": 100.50,
    "description": "Transaction description",
    "createdAt": "2024-01-01T12:00:00.000Z"
  }
}
```


#### 3. Get Transaction by ID
```http
GET /api/transactions/:id
```

**Response (200 OK):**
```json
{
  "id": 1,
  "value": 100.50,
  "description": "Transaction description",
  "createdAt": "2024-01-01T12:00:00.000Z"
}
```

**Response (200 OK):**
```json
{
  "message": "Transaction deleted successfully",
  "transaction": { ... }
}
```


## ✨ Features

### Frontend Features
- ✅ Modern, responsive UI with Tailwind CSS
- ✅ Form validation with React Hook Form + Zod
- ✅ Real-time validation feedback
- ✅ Loading states during API calls
- ✅ Success/Error alerts
- ✅ Automatic form reset after successful submission

### Backend Features
- ✅ RESTful API architecture
- ✅ CORS enabled for frontend communication
- ✅ Input validation
- ✅ Error handling
- ✅ In-memory data storage
- ✅ Auto-incrementing IDs
- ✅ Timestamps for each transaction

### Validation Rules

**Value field:**
- Required
- Must be a positive number

**Description field:**
- Required
- Minimum 3 characters

## 🔧 Development Scripts

### Backend
```bash
npm start       # Start production server
npm run dev     # Start development server with nodemon
```

### Frontend
```bash
npm start       # Start development server
npm run build   # Create production build
npm test        # Run tests
```

## 🐛 Troubleshooting

### Port 5000 already in use
If you encounter `EADDRINUSE` error on port 5000:

**macOS users**: Port 5000 is used by AirPlay Receiver. The project is configured to use port 5001 instead.

To change the port:
1. Edit `backend/server.js` and change the PORT constant
2. Update `frontend/.env` with the new API URL
3. Restart both servers

### CORS Issues
If you encounter CORS errors:
1. Ensure the backend is running on port 5001
2. Verify the frontend `.env` file has the correct API URL
3. Check that the backend CORS configuration allows `http://localhost:3000`

### Frontend not loading styles
If Tailwind CSS styles are not appearing:
1. Ensure you restarted the frontend server after any configuration changes
2. Check that `postcss.config.js` and `tailwind.config.js` are properly configured
3. Verify `@tailwind` directives are present in `src/index.css`

## 📝 Notes

- Data is stored in memory, so restarting the backend will clear all transactions
- For production use, consider implementing a proper database (MongoDB, PostgreSQL, etc.)
- Environment variables should be configured before starting the servers

## 👨‍💻 Author

Test repository for Arconsultores Challenge
