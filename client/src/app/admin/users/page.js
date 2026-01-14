"use client";
import { useEffect, useState } from "react";
import api from "@/services/api";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api.get("/admin/stats").then(res => setStats(res.data));
  }, []);

  return (
    <ProtectedRoute>
      <div className="p-6 bg-gray-100 min-h-screen">
        <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

        {stats && (
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-white p-4 rounded shadow">
              <p>Total Users</p>
              <h2 className="text-xl font-bold">{stats.totalUsers}</h2>
            </div>

            <div className="bg-white p-4 rounded shadow">
              <p>Total Donations</p>
              <h2 className="text-xl font-bold">₹{stats.totalDonations}</h2>
            </div>

            <div className="bg-white p-4 rounded shadow">
              <p>Pending Payments</p>
              <h2 className="text-xl font-bold">{stats.pendingCount}</h2>
            </div>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
