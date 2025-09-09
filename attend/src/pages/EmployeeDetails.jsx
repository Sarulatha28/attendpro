import { useEffect, useState } from "react";
import axios from "axios";
import Employee from './Employee';

export default function Employeedetails() {
  const [employees, setEmployees] = useState([]);
  const [selected, setSelected] = useState(null);

  const fetchEmployees = async () => {
    const res = await axios.get("http://localhost:5000/api/employees");
    setEmployees(res.data);
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Employees</h2>
      <div className="flex overflow-x-auto gap-4 mb-6">
        {employees.map((emp) => (
          <Employee
            key={emp._id}
            employee={emp}
            onClick={() => setSelected(emp)}
          />
        ))}
      </div>

      {selected && (
        <div className="bg-gray-900 text-white p-6 rounded-lg">
          <h3 className="text-xl font-bold mb-2">{selected.name}</h3>
          <p>Email: {selected.email}</p>
          <p>Phone: {selected.phone}</p>
          <p>Employee ID: {selected.employeeId}</p>
          <p>Age: {selected.age}</p>
          <p>Gender: {selected.gender}</p>
          <p>Education: {selected.education}</p>
          <p>Experience: {selected.experience}</p>
          <p>Aadhaar: {selected.aadhaarNumber}</p>
          <p>Bank: {selected.bankAccount}</p>
          <p>IFSC: {selected.ifsc}</p>
        </div>
      )}
    </div>
  );
}
