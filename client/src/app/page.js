"use client";
import { getRole, isLoggedIn } from "@/utils/auth";
import Link from "next/link";

export default function Home() {
  if(isLoggedIn()) {
    const role = getRole();
    if(role === "admin") {
      window.location.href = "/admin";
    } else {
      window.location.href = "/dashboard";
    }
  }
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">

      {/* Navbar */}
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <h1 className="text-xl font-bold text-blue-600">
            NGO Donation System
          </h1>

          <div className="space-x-4">
            <Link href="/login" className="text-gray-700 hover:text-blue-600">
              Login
            </Link>
            <Link
              href="/register"
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Register
            </Link>
          </div>
        </div>
      </nav>

      <main className="grow">
        <section className="max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-2 gap-10 items-center">

          <div>
            <h2 className="text-4xl font-bold mb-4">
              Support NGOs with Transparency & Trust
            </h2>

            <p className="text-gray-600 mb-6">
              Register once, donate securely, and track every contribution.
              Our system ensures your data is safe and payments are verified
              ethically through Razorpay.
            </p>

            <div className="flex gap-4">
              <Link
                href="/register"
                className="bg-blue-600 text-white px-6 py-3 rounded"
              >
                Get Started
              </Link>

              <Link
                href="/login"
                className="border border-blue-600 text-blue-600 px-6 py-3 rounded"
              >
                Login
              </Link>
            </div>
          </div>

          <div className="bg-white p-8 rounded-xl shadow">
            <h3 className="text-xl font-semibold mb-4">Platform Features</h3>

            <ul className="space-y-3 text-gray-700">
              <li>✅ Independent user registration</li>
              <li>✅ Secure Razorpay payments</li>
              <li>✅ Donation status tracking</li>
              <li>✅ Admin monitoring dashboard</li>
              <li>✅ Exportable user & donation reports</li>
            </ul>
          </div>

        </section>
      </main>

      <footer className="bg-gray-900 text-white text-center py-4">
        <p className="text-sm">
          © {new Date().getFullYear()} NGO Registration & Donation Management System
        </p>
      </footer>

    </div>
  );
}
