"use client";
import { useState } from "react";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const { login } = useAuth();
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const userId = form.userId.value.trim();
    const password = form.password.value.trim();
    const success = login(userId, password);
    if (!success) setError("Invalid credentials");
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 shadow-md rounded w-full max-w-sm"
      >
        <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
        {error && <p className="text-red-600 mb-2 text-sm">{error}</p>}
        <input
          name="userId"
          placeholder="User ID"
          className="border p-2 w-full mb-3"
          required
        />
        <input
          name="password"
          type="password"
          placeholder="Password"
          className="border p-2 w-full mb-3"
          required
        />
        <button
          type="submit"
          className="bg-amber-900 text-white w-full py-2 mt-2"
        >
          Login
        </button>
      </form>
    </div>
  );
}
