"use client";
import { useState } from "react";
import api from "@/services/api";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function Donate() {
  const [amount, setAmount] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const presetAmounts = [100, 250, 500, 1000];

  const handleDonate = async () => {
    if (!amount || amount <= 0) {
      setError("Please enter a valid donation amount.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      const res = await api.post("/payments/create-order", { amount });

      const { orderId, donationId, key } = res.data;

      const options = {
        key,
        amount: amount * 100,
        currency: "INR",
        name: "NGO Donation Platform",
        description: "Support a cause",
        order_id: orderId,

        handler: async function (response) {
          await api.post("/payments/verify", {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            donationId
          });

          alert("Payment successful. Thank you for your support!");
          setAmount("");
        },

        modal: {
            ondismiss: async function () {
              try {
                await api.post("/payments/mark-failed", { donationId });
              } catch (err) {
                    console.error("Failed to update status");
              }
              alert("Payment cancelled");
            }
        },

        theme: {
          color: "#2563eb"
        }
      };

      const rzp = new window.Razorpay(options);
      rzp.open();

    } catch (err) {
      setError("Failed to initiate payment. Try again.");
    }

    setLoading(false);
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="bg-white rounded-xl shadow-lg w-full max-w-md p-8">

          <h2 className="text-2xl font-bold mb-1 text-center">Make a Donation</h2>
          <p className="text-gray-500 text-sm text-center mb-6">
            Your contribution helps support important causes.
          </p>

          <div className="mb-4">
            <p className="text-sm font-medium mb-2">Choose Amount</p>
            <div className="grid grid-cols-4 gap-2">
              {presetAmounts.map(val => (
                <button
                  key={val}
                  onClick={() => setAmount(val)}
                  className="border rounded py-2 hover:bg-blue-50 cursor-pointer"
                >
                  ₹{val}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">
              Custom Amount (INR)
            </label>
            <input
              type="number"
              className="w-full border rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>

          {error && (
            <p className="text-red-500 text-sm mb-3 text-center">
              {error}
            </p>
          )}

          <button
            onClick={handleDonate}
            disabled={loading}
            className={`w-full py-3 rounded text-white font-medium transition
              ${loading
                ? "bg-blue-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 cursor-pointer"}
            `}
          >
            {loading ? "Redirecting to payment..." : "Donate Securely"}
          </button>

          <p className="text-xs text-gray-500 text-center mt-4">
            Payments are securely processed via Razorpay.
          </p>

        </div>
      </div>
    </ProtectedRoute>
  );
}
