# Anyware Task Project

## Project Overview

This project is a **React + TypeScript** web application that implements **role-based authentication**. It was created as a submission for the Anyware Software technical task.

Although the task only required a basic dashboard, I implemented **full authentication with user roles** (Admin and Regular User) and protected routes for a professional structure.

---

## Features

### Authentication & Authorization

- **Login Page**: Users can log in using email and password.
- **Register Page**: Users can create new accounts.
- **Role-based Access**:
  - **Admin**: Access to the full dashboard, including the Admin Dashboard page.
  - **User**: Access only to the Home page.
- **Protected Routes**: Ensures only authorized users can access certain pages.
- **Session Persistence**: Authentication token stored in `localStorage`.
- **Logout Functionality**: Users can log out safely.

### Dashboard Layout

- **Responsive Layout**: Built with Material UI `Grid` and `Box`.
- **Sidebar Navigation**: Dynamic navigation with labels translated using `react-i18next`.
- **Navbar**: Displays user name and provides logout and menu actions.
- **Mobile Support**: Sidebar drawer for smaller screens.

### Pages

- **Home**: Default landing page for all authenticated users.
- **Admin Dashboard**: Displays key statistics for Admin users:
  - Total Users
  - Active Courses
  - Pending Tasks
  - Announcements
- **Schedule**: Page showing user's schedule.
- **Courses**: List of courses.
- **Gradebook**: Shows grades and performance.
- **Performance**: Analysis of user performance.
- **Announcements**: Displays latest announcements.

---

## Tech Stack

- **Frontend**: React, TypeScript, Material UI, React Router v6, React Context API
- **State Management**: `useState`, `useContext`, `useMemo`
- **Localization**: `react-i18next` for translations
- **API**: Axios for HTTP requests with token-based authentication

---

## Project Structure

src/
├─ api/ # Axios configuration & API client
├─ components/ # Shared UI components (Sidebar, Navbar)
├─ context/ # AuthContext for authentication management
├─ layouts/ # DashboardLayout
├─ pages/ # App pages (Home, Login, Schedule, Courses, etc.)
├─ services/ # authService with login, register, profile
├─ utils/ # API response helpers
├─ App.tsx # App entry point with routing setup
└─ index.tsx # Main rendering file

yaml
Copy code

---

## How to Run Locally

1. **Clone the repository:**

```bash
git clone https://github.com/davidzakii/Quiz-task.git
cd Quiz-task
Backend setup:

bash
Copy code
cd backend
npm install

# Create a .env file in the backend folder with the following variables
MONGODB_LOCAL=mongodb://localhost:27017/dbname
PORT=3000
SECRETKEY=your_secret_key

# Start backend server in development mode
npm run start:dev

# API docs will be available at:
http://localhost:3000/api/docs
Frontend setup:

bash
Copy code
cd ../frontend
npm install

# Start frontend development server
npm run dev

# Open in your browser:
http://localhost:5173
Notes
Make sure MongoDB is running locally before starting the backend.

The backend runs on port 3000 and the frontend runs on port 5173 by default.

Once both servers are running, you can log in, register, and test the role-based dashboard features.

Deployment
The project can be deployed on Vercel or any hosting platform supporting React and Node.js.

Deploy the frontend folder.

Make sure API endpoints point to your backend deployment URL.

Ensure environment variables are set on the hosting platform.

Submission Instructions for Anyware HR
GitHub Repository: Ensure your code is pushed to GitHub.

Video Demonstration: Record a short video (8-9 minutes)
You can watch the video here: [Demo Video](./demo-video.mp4)

Login & register

Admin vs User views

Navigation between pages

Submission: Send the GitHub link and video link together.

Notes
This project includes features beyond the original task requirements (full authentication with role-based access) to demonstrate professional-level coding practices.

Authentication is secure, using JWT tokens stored in localStorage.

All navigation and routes are protected according to user roles.
```
