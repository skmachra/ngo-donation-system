"use client";
import Link from "next/link";
import ProtectedRoute from "@/components/ProtectedRoute";
import LogoutButton from "@/components/LogOutButton";

export default function Admin() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-5xl mx-auto">
          <div className="flex justify-between items-center mb-4">
            <h1 className="text-3xl font-bold">Admin Panel</h1>
            <LogoutButton />
          </div>

          <p className="text-gray-600 mb-8">
            Manage users, donations, and view platform statistics.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            <Link href="/admin/dashboard">
              <div className="bg-white rounded-xl shadow hover:shadow-lg transition p-6 cursor-pointer">
                <h2 className="text-xl font-semibold mb-2">📊 Dashboard</h2>
                <p className="text-gray-600 text-sm">
                  View total users, donations and pending payments.
                </p>
              </div>
            </Link>

            <Link href="/admin/users">
              <div className="bg-white rounded-xl shadow hover:shadow-lg transition p-6 cursor-pointer">
                <h2 className="text-xl font-semibold mb-2">👥 Users</h2>
                <p className="text-gray-600 text-sm">
                  View registered users, filter records and export CSV data.
                </p>
              </div>
            </Link>

            <Link href="/admin/donations">
              <div className="bg-white rounded-xl shadow hover:shadow-lg transition p-6 cursor-pointer">
                <h2 className="text-xl font-semibold mb-2">💰 Donations</h2>
                <p className="text-gray-600 text-sm">
                  Track all donations, payment status and timestamps.
                </p>
              </div>
            </Link>

          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
