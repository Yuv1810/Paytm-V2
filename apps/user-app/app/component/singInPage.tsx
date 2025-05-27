'use client'

import { signIn } from 'next-auth/react';
import { useSearchParams } from 'next/navigation'
import { useState } from 'react';

export default function SignInPage() {
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/';
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    console.log(typeof(phone)," ",password);
    e.preventDefault();

    const numberRegex = /^\d{10}$/;
    if (!numberRegex.test(phone)) {
      setError("Phone number must be exactly 10 digits.");
      return;
    }

    const res = await signIn("credentials", {
      phone_No:phone,
      password,
      callbackUrl:"/" // Redirect after login
    });

    if (res?.error) {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f1f4f9] px-4">
      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-xl border border-gray-200">
        <div className="text-center mb-6">
          <h1 className="text-3xl font-bold text-[#002970]">Welcome Back to Clone App</h1>
          <p className="text-sm text-gray-500">Login to continue to your account</p>
        </div>

        {error && (
          <div className="text-red-600 text-sm text-center mb-4">{error}</div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="string"
            placeholder="Phone No"
            value={phone}
            required
            onChange={(e) => setPhone(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            required
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            type="submit"
            className="w-full bg-[#002970] text-white py-3 rounded-md font-semibold hover:bg-[#001f5c] transition"
          >
            Sign In
          </button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <a href="/signup" className="text-blue-600 hover:underline">
            Sign up
          </a>
        </div>
      </div>
    </div>
  )
}
