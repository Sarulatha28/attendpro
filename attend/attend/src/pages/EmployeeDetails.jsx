export default function EmployeeDetails({ employee, onClose }) {
  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50 p-4">
      <div className="bg-white p-6 rounded w-full max-w-2xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-semibold">Employee Details</h2>
          <button onClick={onClose} className="text-gray-600">Close</button>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <img src={employee.photoUrl || "/default-avatar.png"} alt="profile" className="w-48 h-48 object-cover rounded" />
          <div>
            <div><strong>Name:</strong> {employee.name}</div>
            <div><strong>Employee ID:</strong> {employee.employeeId}</div>
            <div><strong>Email:</strong> {employee.email}</div>
            <div><strong>Age:</strong> {employee.age}</div>
            <div><strong>Education:</strong> {employee.education}</div>
            <div><strong>Experience:</strong> {employee.experience}</div>
            <div><strong>Company ID:</strong> {employee.companyId}</div>
          </div>
        </div>
      </div>
    </div>
  );
}
