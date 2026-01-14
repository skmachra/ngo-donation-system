"use client";
import { useEffect, useState } from "react";
import api from "@/services/api";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/admin/stats")
      .then(res => setStats(res.data))
      .finally(() => setLoading(false));
  }, []);

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-6xl mx-auto">

          <h1 className="text-3xl font-bold mb-1">Admin Dashboard</h1>
          <p className="text-gray-600 mb-6">
            Overview of registrations and donations.
          </p>

          {loading && (
            <div className="bg-white p-6 rounded shadow text-center">
              Loading statistics...
            </div>
          )}

          {stats && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

              <div className="bg-white p-6 rounded-xl shadow">
                <p className="text-sm text-gray-500 mb-1">Total Registrations</p>
                <h2 className="text-3xl font-bold text-blue-600">
                  {stats.totalUsers}
                </h2>
              </div>

              <div className="bg-white p-6 rounded-xl shadow">
                <p className="text-sm text-gray-500 mb-1">Total Donations Received</p>
                <h2 className="text-3xl font-bold text-green-600">
                  ₹{stats.totalDonations}
                </h2>
              </div>

              <div className="bg-white p-6 rounded-xl shadow">
                <p className="text-sm text-gray-500 mb-1">Pending Payments</p>
                <h2 className="text-3xl font-bold text-yellow-600">
                  {stats.pendingCount}
                </h2>
              </div>

            </div>
          )}

        </div>
      </div>
    </ProtectedRoute>
  );
}
