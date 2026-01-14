"use client";
import { useEffect, useState } from "react";
import api from "@/services/api";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [email, setEmail] = useState("");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    setLoading(true);
    const query = `?email=${email}&from=${from}&to=${to}`;
    const res = await api.get(`/admin/users${query}`);
    setUsers(res.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const exportCSV = () => {
    const csv = [
      ["Name", "Email", "Role", "Registered At"],
      ...users.map(u => [
        u.name,
        u.email,
        u.role,
        new Date(u.createdAt).toLocaleString()
      ])
    ]
      .map(r => r.join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "users.csv";
    a.click();
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-6xl mx-auto">

          <h1 className="text-2xl font-bold mb-1">Registered Users</h1>
          <p className="text-gray-600 mb-6">
            View, filter, and export user registration data.
          </p>

          <div className="bg-white p-4 rounded-lg shadow mb-6">
            <h2 className="font-semibold mb-4">Filters</h2>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">

              <div>
                <label className="block text-sm font-medium mb-1">
                  Email
                </label>
                <input
                  type="text"
                  className="border p-2 rounded w-full"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Registered From
                </label>
                <input
                  type="date"
                  className="border p-2 rounded w-full"
                  value={from}
                  onChange={e => setFrom(e.target.value)}
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Registered To
                </label>
                <input
                  type="date"
                  className="border p-2 rounded w-full"
                  value={to}
                  onChange={e => setTo(e.target.value)}
                />
              </div>

              <div className="flex items-end gap-2">
                <button
                  onClick={fetchUsers}
                  className="bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Apply Filters
                </button>

                <button
                  onClick={exportCSV}
                  className="bg-green-600 text-white px-4 py-2 rounded"
                >
                  Export CSV
                </button>
              </div>

            </div>
          </div>

          <div className="bg-white rounded-lg shadow overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-200">
                <tr>
                  <th className="p-3 text-left">Name</th>
                  <th className="p-3 text-left">Email</th>
                  <th className="p-3 text-left">Role</th>
                  <th className="p-3 text-left">Registered At</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="4" className="p-4 text-center">
                      Loading...
                    </td>
                  </tr>
                ) : users.length === 0 ? (
                  <tr>
                    <td colSpan="4" className="p-4 text-center">
                      No users found
                    </td>
                  </tr>
                ) : (
                  users.map(u => (
                    <tr key={u._id} className="border-t">
                      <td className="p-3">{u.name}</td>
                      <td className="p-3">{u.email}</td>
                      <td className="p-3 capitalize">{u.role}</td>
                      <td className="p-3">
                        {new Date(u.createdAt).toLocaleString()}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>

        </div>
      </div>
    </ProtectedRoute>
  );
}
