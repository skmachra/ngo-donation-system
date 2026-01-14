"use client";
import { useState } from "react";
import api from "@/services/api";
import { setToken } from "@/utils/auth";
import { useRouter } from "next/navigation";

export default function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const router = useRouter();

const [loading, setLoading] = useState(false);
const [error, setError] = useState("");

const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setError("");

  try {
    const res = await api.post("/auth/login", form);
    setToken(res.data.token);

    if (res.data.role === "admin") router.push("/admin");
    else router.push("/dashboard");

  } catch (err) {
    setError("Invalid credentials");
  }

  setLoading(false);
};


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow w-80 space-y-4">
        <h2 className="text-xl font-bold text-center">Login</h2>

        <input placeholder="Email" className="w-full border p-2"
          onChange={(e)=>setForm({...form,email:e.target.value})} />

        <input type="password" placeholder="Password" className="w-full border p-2"
          onChange={(e)=>setForm({...form,password:e.target.value})} />

        <button disabled={loading} className="...">
{loading ? "Logging in..." : "Login"}
</button>

        {error && <p className="text-red-500 text-sm">{error}</p>}
      </form>
    </div>
  );
}
