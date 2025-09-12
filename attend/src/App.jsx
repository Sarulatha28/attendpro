// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AppProvider } from "./AppContext";

// Components & Pages
import AddEmployeemodel from "./components/AddEmployeeModal";
import ApplyLeave from "./components/ApplyLeave";
import Dashboard from "./components/Dashboard";
import EmployeesPage from "./components/EmployeesPage";
import Layouts from "./components/Layouts";
import Attendance from "./pages/Attendance";
import CompanyForm from "./pages/CompanyForm";
import EmployeeDashboard from "./pages/EmployeeDashboard";
import Log from "./pages/Log";
import EmployeeDetails from "./pages/EmployeeDetails";
import Notification from "./pages/Notification";
import Profile from "./pages/Profile";
import WelcomePage from "./components/WelcomePage";
import AdminSignUp from "./components/AdminSignUp";
import AdminSignIn from "./components/AdminSignIn";
import EmployeeSignIn from "./pages/EmployeeSignIn";
import AdminPage from "./components/AdminPage";

// Private Route Wrapper
function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/" replace />;
}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<WelcomePage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/adminsignup" element={<AdminSignUp />} />
          <Route path="/adminsignin" element={<AdminSignIn />} />
          <Route path="/employeesignin" element={<EmployeeSignIn />} />

          {/* Protected Admin Routes */}
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/employees"
            element={
              <PrivateRoute>
                <EmployeesPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/add-employee"
            element={
              <PrivateRoute>
                <AddEmployeemodel />
              </PrivateRoute>
            }
          />
          <Route
            path="/company-form"
            element={
              <PrivateRoute>
                <CompanyForm />
              </PrivateRoute>
            }
          />
          <Route
            path="/employee/:id"
            element={
              <PrivateRoute>
                <EmployeeDetails />
              </PrivateRoute>
            }
          />
          <Route
            path="/notification"
            element={
              <PrivateRoute>
                <Notification />
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

          {/* Protected Employee Routes with Sticky Layout */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Layouts />
              </PrivateRoute>
            }
          >
            <Route path="employee-dashboard" element={<EmployeeDashboard />} />
            <Route path="attendance" element={<Attendance />} />
            <Route path="leave-requests" element={<ApplyLeave />} />
            <Route path="profile" element={<Profile />} />
          </Route>

          {/* Catch-all: Redirect unknown paths */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AppProvider>
  );
}
