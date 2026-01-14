"use client";
import { useEffect, useState } from "react";
import api from "@/services/api";
import ProtectedRoute from "@/components/ProtectedRoute";
import Link from "next/link";

export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [donations, setDonations] = useState([]);

  useEffect(() => {
    api.get("/user/profile").then(res => setUser(res.data));
    api.get("/donations/user").then(res => setDonations(res.data));
  }, []);

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-100 p-6">
        <h1 className="text-2xl font-bold mb-4">User Dashboard</h1>

        {user && (
          <div className="bg-white p-4 rounded shadow mb-4">
            <h2 className="font-semibold">Registration Info</h2>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
          </div>
        )}

        <div className="bg-white p-4 rounded shadow mb-4">
          <h2 className="font-semibold mb-2">Donation History</h2>

          <table className="w-full text-sm">
            <thead>
              <tr>
                <th>Amount</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {donations.map(d => (
                <tr key={d._id}>
                  <td>₹{d.amount}</td>
                  <td>{d.status}</td>
                  <td>{new Date(d.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Link href="/donate">
          <button className="bg-blue-600 text-white px-4 py-2 rounded">
            Donate Now
          </button>
        </Link>
      </div>
    </ProtectedRoute>
  );
}
