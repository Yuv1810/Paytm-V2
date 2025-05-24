


"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SignupPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [age, setAge] = useState<number | string>("");
  const [number, setnumber] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSignup = async (e: any) => {
    e.preventDefault();

    const numberRegex = /^\d{10}$/;
    if (!numberRegex.test(number)) {
      setError("Phone number must be exactly 10 digits.");
      return;
    }

    setError(""); 

    try {
      const res = await fetch('/api/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          name,
          age,
          number,
          password,
        }),
      });
  
      if (!res.ok) {
        const error = await res.json();
        throw new Error(error.message || 'Signup failed');
      }
  
      const data = await res.json();
      console.log('Signup success:', data);
    } catch (err) {
      console.error('Signup error:', err);
    }
    // Just logging for now
    console.log("Signup with", { email, name, age, number, password });





    // After successful signup (you will replace with API call)
    router.push("/main");
  };

  return (
    <div className="flex items-center justify-center min-h-screen p-4">
      <form
        onSubmit={handleSignup}
        className="bg-white p-8 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold mb-6 text-center">Sign Up</h2>

     
        {error && (
          <div className="mb-4 text-red-600 font-semibold text-xs text-center">{error}</div>
        )}
        <div className="mb-4">
          <label htmlFor="email" className="block text-sm font-medium mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your email"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium mb-1">
            Name (optional)
          </label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your name"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="age" className="block text-sm font-medium mb-1">
            Age (optional)
          </label>
          <input
            type="number"
            id="age"
            min={1}
            value={age}
            onChange={(e) => setAge(Number(e.target.value))}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your age"
          />
        </div>

  
        <div className="mb-4">
          <label htmlFor="number" className="block text-sm font-medium mb-1">
            Phone Number
          </label>
          <input
            type="tel"
            id="number"
            required
            value={number}
            onChange={(e) => setnumber(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your phone number"
          />
        </div>

        <div className="mb-6">
          <label htmlFor="password" className="block text-sm font-medium mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter your password"
          />
        </div>

        <button
          type="submit"
          className="w-full h-12 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignupPage;
