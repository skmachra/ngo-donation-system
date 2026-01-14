"use client";
import { useEffect, useState } from "react";
import api from "@/services/api";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function Donations() {
  const [donations, setDonations] = useState([]);
  const [status, setStatus] = useState("");

  const fetchDonations = () => {
    api.get(`/admin/donations?status=${status}`).then(res => setDonations(res.data));
  };

  useEffect(() => {
    fetchDonations();
  }, []);

  const total = donations
    .filter(d => d.status === "success")
    .reduce((sum, d) => sum + d.amount, 0);

  return (
    <ProtectedRoute>
      <div className="p-6">
        <h1 className="text-xl font-bold mb-4">Donations</h1>

        <div className="flex gap-2 mb-4">
          <select onChange={e => setStatus(e.target.value)} className="border p-2">
            <option value="">All</option>
            <option value="success">Success</option>
            <option value="pending">Pending</option>
            <option value="failed">Failed</option>
          </select>

          <button onClick={fetchDonations} className="bg-blue-600 text-white px-3">
            Filter
          </button>
        </div>

        <p className="mb-2 font-semibold">Total Successful Donations: ₹{total}</p>

        <table className="w-full bg-white text-sm">
          <thead>
            <tr>
              <th>User</th>
              <th>Email</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Date</th>
            </tr>
          </thead>
          <tbody>
            {donations.map(d => (
              <tr key={d._id}>
                <td>{d.userId?.name}</td>
                <td>{d.userId?.email}</td>
                <td>₹{d.amount}</td>
                <td>{d.status}</td>
                <td>{new Date(d.createdAt).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </ProtectedRoute>
  );
}
