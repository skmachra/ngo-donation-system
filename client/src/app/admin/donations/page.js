"use client";
import { useEffect, useState } from "react";
import api from "@/services/api";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function Donations() {
  const [donations, setDonations] = useState([]);
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const fetchDonations = async () => {
    setLoading(true);
    const res = await api.get(`/admin/donations?status=${status}`);
    setDonations(res.data);
    setLoading(false);
  };

  useEffect(() => {
    fetchDonations();
  }, []);

  const totalSuccess = donations
    .filter(d => d.status === "success")
    .reduce((sum, d) => sum + d.amount, 0);

  const totalPending = donations.filter(d => d.status === "pending").length;
  const totalFailed = donations.filter(d => d.status === "failed").length;

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-7xl mx-auto">

          <h1 className="text-2xl font-bold mb-1">Donations</h1>
          <p className="text-gray-600 mb-6">
            View all donation records, payment status, and timestamps.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white p-4 rounded shadow">
              <p className="text-sm text-gray-500">Total Records</p>
              <p className="text-xl font-bold">{donations.length}</p>
            </div>

            <div className="bg-white p-4 rounded shadow">
              <p className="text-sm text-gray-500">Successful Amount</p>
              <p className="text-xl font-bold text-green-600">₹{totalSuccess}</p>
            </div>

            <div className="bg-white p-4 rounded shadow">
              <p className="text-sm text-gray-500">Pending Payments</p>
              <p className="text-xl font-bold text-yellow-600">{totalPending}</p>
            </div>

            <div className="bg-white p-4 rounded shadow">
              <p className="text-sm text-gray-500">Failed Payments</p>
              <p className="text-xl font-bold text-red-600">{totalFailed}</p>
            </div>
          </div>

          <div className="bg-white p-4 rounded shadow mb-6">
            <h2 className="font-semibold mb-3">Filter Donations</h2>

            <div className="flex flex-wrap gap-3 items-end">
              <div>
                <label className="block text-sm font-medium mb-1">Status</label>
                <select
                  value={status}
                  onChange={e => setStatus(e.target.value)}
                  className="border p-2 rounded"
                >
                  <option value="">All</option>
                  <option value="success">Success</option>
                  <option value="pending">Pending</option>
                  <option value="failed">Failed</option>
                </select>
              </div>

              <button
                onClick={fetchDonations}
                className="bg-blue-600 text-white px-4 py-2 rounded"
              >
                Apply Filter
              </button>
            </div>
          </div>

          <div className="bg-white rounded shadow overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-200">
                <tr>
                  <th className="p-3 text-left">User</th>
                  <th className="p-3 text-left">Email</th>
                  <th className="p-3 text-left">Amount</th>
                  <th className="p-3 text-left">Status</th>
                  <th className="p-3 text-left">Created At</th>
                  <th className="p-3 text-left">Last Updated</th>
                </tr>
              </thead>

              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="6" className="p-4 text-center">
                      Loading...
                    </td>
                  </tr>
                ) : donations.length === 0 ? (
                  <tr>
                    <td colSpan="6" className="p-4 text-center">
                      No donation records found
                    </td>
                  </tr>
                ) : (
                  donations.map(d => (
                    <tr key={d._id} className="border-t">
                      <td className="p-3">{d.userId?.name}</td>
                      <td className="p-3">{d.userId?.email}</td>
                      <td className="p-3">₹{d.amount}</td>
                      <td className="p-3 capitalize">
                        <span
                          className={
                            d.status === "success"
                              ? "text-green-600"
                              : d.status === "pending"
                              ? "text-yellow-600"
                              : "text-red-600"
                          }
                        >
                          {d.status}
                        </span>
                      </td>
                      <td className="p-3">
                        {new Date(d.createdAt).toLocaleString()}
                      </td>
                      <td className="p-3">
                        {new Date(d.updatedAt).toLocaleString()}
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
