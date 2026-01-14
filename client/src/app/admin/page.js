import ProtectedRoute from "@/components/ProtectedRoute";

export default function Admin() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen p-6">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <p className="mt-2">Admin access area.</p>
      </div>
    </ProtectedRoute>
  );
}
