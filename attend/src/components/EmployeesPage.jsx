import axios from "axios";
import { useEffect, useState } from "react";

const EmployeesPage = () => {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/employees"); // ✅ correct URL
        setEmployees(res.data);
      } catch (err) {
        console.error("Error fetching employees:", err);
      }
    };
    fetchEmployees();
  }, []);

  return (
    <div>
      <h1>Employees</h1>
      {employees.map((emp) => (
        <p key={emp._id}>{emp.name}</p>
      ))}
    </div>
  );
};

export default EmployeesPage;
