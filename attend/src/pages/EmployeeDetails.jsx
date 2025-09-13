import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

export default function EmployeeDetails() {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/employees/${id}`).then(res => setEmployee(res.data));
  }, [id]);

  if (!employee) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-2xl shadow">
      <img src={employee.photo || "https://via.placeholder.com/150"} alt={employee.name} className="w-32 h-32 rounded-full mx-auto" />
      <h2 className="text-2xl font-bold text-center mt-3">{employee.name}</h2>
      <p className="text-center text-gray-500">ID: {employee.employeeId}</p>
      <div className="mt-4 space-y-2">
        <p><strong>Email:</strong> {employee.email}</p>
        <p><strong>Phone:</strong> {employee.phone}</p>
        <p><strong>Password:</strong> {employee.password}</p>
      </div>
    </div>
  );
}
