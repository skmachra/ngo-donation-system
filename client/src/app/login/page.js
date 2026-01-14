"use client";
import { useState } from "react";
import api from "@/services/api";
import { isLoggedIn, setRole, setToken, getRole } from "@/utils/auth";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (isLoggedIn()) {
    const role = getRole();
    if (role === "admin") {
      window.location.href = "/admin";
    } else {
      window.location.href = "/dashboard";
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await api.post("/auth/login", form);
      setToken(res.data.token);
      setRole(res.data.role);

      if (res.data.role === "admin") router.push("/admin");
      else router.push("/dashboard");
    } catch {
      setError("Invalid email or password");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-8 rounded-xl shadow-md w-full max-w-sm space-y-5"
      >
        <h2 className="text-2xl font-bold text-center mb-2">Login</h2>
        <p className="text-center text-gray-500 text-sm mb-4">
          Sign in to your account
        </p>

        <div>
          <label className="block text-sm font-medium mb-1">
            Email Address
          </label>
          <input
            type="email"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={form.email}
            onChange={(e) =>
              setForm({ ...form, email: e.target.value })
            }
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">
            Password
          </label>
          <input
            type="password"
            className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={form.password}
            onChange={(e) =>
              setForm({ ...form, password: e.target.value })
            }
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded text-white font-medium transition
            ${loading ? "bg-blue-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 cursor-pointer"}
          `}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Error */}
        {error && (
          <p className="text-red-500 text-sm text-center mt-2">
            {error}
          </p>
        )}
      </form>
    </div>
  );
}
