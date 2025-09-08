import React from "react";
import { Routes, Route } from "react-router-dom";
import Layout from "./components/Layout.jsx";
import Dashboard from "./components/Dashboard.jsx";
import Employee from "./pages/Employee.jsx";
import Log from "./pages/Log.jsx";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="employee" element={<Employee />} />
        <Route path="log" element={<Log />} />
        <Route path="*" element={<Dashboard />} /> {/* default */}
      </Route>
    </Routes>
  );
}
