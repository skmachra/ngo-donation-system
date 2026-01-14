"use client";
import { useEffect, useState } from "react";
import api from "@/services/api";
import ProtectedRoute from "@/components/ProtectedRoute";
import Link from "next/link";
import LogoutButton from "@/components/LogOutButton";
export default function Dashboard() {
  const [user, setUser] = useState(null);
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      api.get("/user/profile"),
      api.get("/donations/user")
    ]).then(([userRes, donationRes]) => {
      setUser(userRes.data);
      setDonations(donationRes.data);
    }).finally(() => setLoading(false));
  }, []);

  const totalDonated = donations
    .filter(d => d.status === "success")
    .reduce((sum, d) => sum + d.amount, 0);

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-100 p-6">
        <div className="max-w-6xl mx-auto">

          <div className="flex justify-between items-center mb-6">
            <div>
              <h1 className="text-3xl font-bold">User Dashboard</h1>
              <p className="text-gray-600 text-sm">
                Manage your profile and track donations
              </p>
            </div>
            <LogoutButton />
          </div>

          {loading && (
            <div className="bg-white p-6 rounded shadow text-center">
              Loading dashboard...
            </div>
          )}

          {!loading && user && (
            <>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">

                <div className="bg-white p-5 rounded-xl shadow">
                  <h2 className="font-semibold mb-3">Profile</h2>
                  <p><span className="text-gray-500">Name:</span> {user.name}</p>
                  <p><span className="text-gray-500">Email:</span> {user.email}</p>
                </div>

                <div className="bg-white p-5 rounded-xl shadow">
                  <p className="text-sm text-gray-500 mb-1">Total Donated</p>
                  <p className="text-3xl font-bold text-green-600">
                    ₹{totalDonated}
                  </p>
                </div>

                <div className="bg-white p-5 rounded-xl shadow">
                  <p className="text-sm text-gray-500 mb-1">Total Donations</p>
                  <p className="text-3xl font-bold text-blue-600">
                    {donations.length}
                  </p>
                </div>
              </div>

              <div className="bg-white p-5 rounded-xl shadow mb-6">
                <h2 className="font-semibold mb-4">Donation History</h2>

                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="bg-gray-200">
                      <tr>
                        <th className="p-3 text-left">Amount</th>
                        <th className="p-3 text-left">Status</th>
                        <th className="p-3 text-left">Date</th>
                      </tr>
                    </thead>
                    <tbody>
                      {donations.length === 0 ? (
                        <tr>
                          <td colSpan="3" className="p-4 text-center">
                            No donations yet
                          </td>
                        </tr>
                      ) : (
                        donations.map(d => (
                          <tr key={d._id} className="border-t">
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
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              <Link href="/donate">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded cursor-pointer">
                  Donate Now
                </button>
              </Link>
            </>
          )}

        </div>
      </div>
    </ProtectedRoute>
  );
}
