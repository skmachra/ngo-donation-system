"use client";
import { useState } from "react";
import api from "@/services/api";
import ProtectedRoute from "@/components/ProtectedRoute";

export default function Donate() {
  const [amount, setAmount] = useState("");

  const handleDonate = async () => {
    const res = await api.post("/payments/create-order", { amount });

    const { orderId, donationId, key } = res.data;

    const options = {
      key,
      amount: amount * 100,
      currency: "INR",
      name: "NGO Donation",
      description: "Support a cause",
      order_id: orderId,

      handler: async function (response) {
        await api.post("/payments/verify", {
          razorpay_order_id: response.razorpay_order_id,
          razorpay_payment_id: response.razorpay_payment_id,
          razorpay_signature: response.razorpay_signature,
          donationId
        });

        alert("Payment successful. Thank you for your donation.");
      },

      modal: {
        ondismiss: async function () {
          alert("Payment cancelled");
        }
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="bg-white p-6 rounded shadow w-80">
          <h2 className="text-xl font-bold mb-4">Donate</h2>

          <input
            className="border p-2 w-full mb-4"
            placeholder="Amount"
            type="number"
            onChange={e => setAmount(e.target.value)}
          />

          <button
            onClick={handleDonate}
            className="bg-green-600 text-white w-full p-2 rounded"
          >
            Pay with Razorpay
          </button>
        </div>
      </div>
    </ProtectedRoute>
  );
}
