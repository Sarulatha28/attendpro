// src/App.jsx
<<<<<<< HEAD
import { Routes, Route } from "react-router-dom";
import Layouts from "./components/Layouts"; // ✅ Correct import
import Attendance from "./pages/Attanance"; // ✅ fixed typo
import Profile from "./pages/Profile";
import EmployeeDashboard from "./components/EmployeeDashboard";
import ApplyLeave from "./pages/ApplyLeave";


export default function App() {
  return (
    <Routes>
      {/* ✅ Wrap all employee pages in Layout */}
      <Route path="/" element={<Layouts />}>
        <Route path="dashboard" element={<EmployeeDashboard />} />
        <Route path="attendance" element={<Attendance />} />
<Route path="leave-requests" element={<ApplyLeave/>} />
        <Route path="profile" element={<Profile />} />
      </Route>
    </Routes>
=======
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Signin from "./pages/Signin";
import Dashboard from "./components/Dashboard";
import Employee from "./pages/EmployeeCard";
import Log from "./pages/Log";
import AddEmployeemodel from "./components/AddEmployeeModal"; // ✅ create this page wrapper
import { AppProvider } from "./AppContext";

function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/signin" replace />;
}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/signin" element={<Signin />} />

          {/* Protected routes */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/employee"
            element={
              <PrivateRoute>
                <Employee />
              </PrivateRoute>
            }
          />
          <Route
            path="/log"
            element={
              <PrivateRoute>
                <Log />
              </PrivateRoute>
            }
          />

          {/* ➕ Add Employee page route */}
          <Route
            path="/add-employee"
            element={
              <PrivateRoute>
                <AddEmployee />
              </PrivateRoute>
            }
          />

          {/* Default redirect */}
          <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
>>>>>>> a43ee5e50977a1a76fc4c8d6bc1fae1ec9cad9ce
  );
}
