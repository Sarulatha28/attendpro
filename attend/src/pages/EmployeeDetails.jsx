import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function EmployeeDetails() {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const [attendance, setAttendance] = useState({ records: [], attendancePercent: 0 });

  const fetchEmployee = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/employees/${id}`);
      setEmployee(res.data);
    } catch (err) {
      console.error("Error fetching employee:", err);
    }
  };

  const fetchAttendance = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/attendance/${id}`);
      setAttendance(res.data);
    } catch (err) {
      console.error("Error fetching attendance:", err);
    }
  };

  useEffect(() => {
    fetchEmployee();
    fetchAttendance();
  }, [id]);

  if (!employee) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4">{employee.name}</h2>
      <img
        src={employee.photo || "https://via.placeholder.com/100"}
        alt={employee.name}
        className="w-32 h-32 object-cover rounded-full mb-4"
      />
      <p><strong>Employee ID:</strong> {employee.empId}</p>
      <p><strong>Email:</strong> {employee.email}</p>
      <p><strong>Phone:</strong> {employee.phone}</p>

      <div className="mt-6 bg-gray-100 p-4 rounded">
        <h3 className="font-semibold mb-2">Attendance History</h3>
        <div className="text-xl font-bold text-green-600">
          {attendance.attendancePercent}%
        </div>
        <p className="text-sm text-gray-600 mt-1">Based on {attendance.records.length} days</p>
      </div>
    </div>
  );
}
