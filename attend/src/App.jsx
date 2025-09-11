// src/App.jsx
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
  );
}
