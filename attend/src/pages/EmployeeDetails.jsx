import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

export default function EmployeeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState(null);

  const fetchEmployee = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/employees/${id}`);
      setEmployee(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchEmployee();
  }, [id]);

  if (!employee) return <div className="p-6 text-center">Loading employee details...</div>;

  return (
    <div className="p-6 max-w-xl mx-auto bg-white rounded shadow">
      <button
        onClick={() => navigate(-1)}
        className="mb-4 px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
      >
        Back
      </button>
      <div className="flex flex-col items-center">
        <img
          src={employee.photo || "https://via.placeholder.com/150"}
          className="w-32 h-32 object-cover rounded-full mb-4"
          alt={employee.name}
        />
        <h2 className="text-xl font-bold">{employee.name}</h2>
        <p className="text-gray-500">{employee.empId}</p>
        <p>Email: {employee.email}</p>
        <p>Phone: {employee.phone}</p>
      </div>
    </div>
  );
}
