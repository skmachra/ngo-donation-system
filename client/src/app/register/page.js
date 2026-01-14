"use client";
import { useState } from "react";
import api from "@/services/api";
import { useRouter } from "next/navigation";

export default function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post("/auth/register", form);
    router.push("/login");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow w-80 space-y-4">
        <h2 className="text-xl font-bold text-center">Register</h2>

        <input placeholder="Name" className="w-full border p-2"
          onChange={(e)=>setForm({...form,name:e.target.value})} />

        <input placeholder="Email" className="w-full border p-2"
          onChange={(e)=>setForm({...form,email:e.target.value})} />

        <input type="password" placeholder="Password" className="w-full border p-2"
          onChange={(e)=>setForm({...form,password:e.target.value})} />

        <button className="w-full bg-blue-600 text-white p-2 rounded">
          Register
        </button>
      </form>
    </div>
  );
}
