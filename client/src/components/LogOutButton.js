"use client";
import { useRouter } from "next/navigation";
import { logout } from "@/utils/auth";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    logout();          
    router.push("/"); 
  };

  return (
    <button
      onClick={handleLogout}
      className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 cursor-pointer text-sm"
    >
      Logout
    </button>
  );
}
