"use client";
import React, { useState, useRef } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState("");
  const [msg, setMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const passwordRef = useRef(null);

  const handleLogin = async () => {
    setErr("");
    setMsg("");
    setLoading(true);

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (data.success) {
        localStorage.setItem("userDetails", JSON.stringify(data.user));
        setMsg("Login Successful!");
        setTimeout(() => {
          router.push("/");
        }, 1500);
      } else {
        setErr(data.error || "Invalid credentials");
      }
    } catch (error) {
      console.error("Login error:", error);
      setErr("Server error. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center px-10 py-2">
      <div className="w-full sm:max-w-sm md:max-w-md lg:max-w-lg p-6 sm:p-8 bg-white rounded-xl shadow-2xl">
        <h1 className="text-center font-bold sm:text-3xl text-xl text-blue-700 mb-6">
          Login
        </h1>

        {err && <p className="text-red-600 font-medium mb-4">{err}</p>}
        {msg && <p className="text-green-600 font-medium mb-4">{msg}</p>}

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") passwordRef.current.focus();
          }}
          className="border border-gray-300 p-2 sm:p-3 sm:mb-4 mb-3 rounded w-full text-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          ref={passwordRef}
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleLogin();
          }}
          className="border border-gray-300 p-2 sm:p-3 sm:mb-4 mb-3 rounded w-full text-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <button
          onClick={(e)=>{
            e.preventDefault();
            handleLogin();}}
          disabled={loading}
          className={`w-full sm:p-3 p-2 text-white font-semibold rounded transition ${
            loading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-blue-700 hover:bg-blue-800 hover:scale-105"
          }`}
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </div>
    </div>
  );
}
