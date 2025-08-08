import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { StudentContext } from "@/context/StudentContext";

const StudentManagement = () => {
  const navigate = useNavigate();
  const { students } = useContext(StudentContext);

  const [actionStudentId, setActionStudentId] = useState(null);
  const [page, setPage] = useState(0);
  const pageSize = 15;

  // Define role sort order
  const roleOrder = { student: 3, teacher: 2, admin: 1 };

  // Sort students by role
  const sortedStudents = [...students].sort((a, b) => {
    const roleA = roleOrder[a.role?.toLowerCase()] || 99;
    const roleB = roleOrder[b.role?.toLowerCase()] || 99;
    return roleA - roleB;
  });

  const totalPages = Math.ceil(sortedStudents.length / pageSize);
  const paginatedData = sortedStudents.slice(page * pageSize, (page + 1) * pageSize);

  return (
    <div className="p-6">
      {/* Header */}
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Students</h1>
        <div className="space-x-2">
          <button onClick={() => navigate("/student/add")} className="bg-blue-600 text-white px-4 py-2 rounded">+ Add Student</button>
          <button onClick={() => navigate("/student/reports")} className="bg-gray-800 text-white px-4 py-2 rounded">View Report</button>
          <button onClick={() => navigate("/student/promote")} className="bg-green-500 text-white px-4 py-2 rounded">Promotions</button>
        </div>
      </div>

      {/* Filters */}
      <div className="grid grid-cols-5 gap-2 mb-4">
        <input className="border p-2 rounded" placeholder="Search by Name" />
        <input className="border p-2 rounded" placeholder="Search by ID" />
        <input className="border p-2 rounded" placeholder="Search by Email" />
        <input className="border p-2 rounded" placeholder="Search by Phone" />
        <select className="border p-2 rounded">
          <option>Select Program</option>
        </select>
      </div>

      {/* Table */}
      <table className="w-full border text-sm mb-4">
        <thead className="bg-gray-100">
          <tr>
            <th className="text-left p-2 border">Role</th>
            <th className="text-left p-2 border">Name</th>
            <th className="text-left p-2 border">Identity</th>
            <th className="text-left p-2 border">Mobile</th>
            <th className="text-left p-2 border">Action</th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((s) => (
            <tr key={s.id} className="border-b">
              <td className="p-2 border">{s.role}</td>
              <td className="p-2 border">{s.name}</td>
              <td className="p-2 border">
                {s.className 
                  ? s.className 
                  : s.subject 
                    ? s.subject 
                    : s.department}
              </td>
              <td className="p-2 border">{s.contact}</td>
              <td className="p-2 border relative">
                <button
                  onClick={() => setActionStudentId(s.id)}
                  className="text-gray-600 hover:text-black"
                >
                  ⋮
                </button>
                {actionStudentId === s.id && (
                  <div className="absolute right-0 top-full bg-white shadow rounded border mt-1 z-10 w-48">
                    <ul>
                      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Print Student Profile</li>
                      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Logs</li>
                      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Block</li>
                      <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">Add/Edit Medical Info</li>
                    </ul>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <div className="flex justify-around items-center text-sm">
        <button
          disabled={page === 0}
          onClick={() => setPage(p => p - 1)}
          className="px-3 py-1 rounded border disabled:opacity-50"
        >
          ⬅ Previous
        </button>
        <span>Page {page + 1} of {totalPages}</span>
        <button
          disabled={page + 1 >= totalPages}
          onClick={() => setPage(p => p + 1)}
          className="px-3 py-1 rounded border disabled:opacity-50"
        >
          Next ➡
        </button>
      </div>
    </div>
  );
};

export default StudentManagement;
