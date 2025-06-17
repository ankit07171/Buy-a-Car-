"use client";
import Login from "./login.js";
import React, { useState } from "react";
import { useRouter } from "next/navigation"; 

function Signup() {
  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [c_password, setCPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [fieldError, setFieldError] = useState("");
    const router = useRouter();

  const handleSignup = async () => {
    setErrorMessage("");
    setFieldError("");
    setPasswordError("");

    if (!name || !age || !email || !password || !c_password) {
      setFieldError("All fields are required.");
      return;
    }

    const isValidEmail = (email) => {
      return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    if (!isValidEmail(email)) {
      setFieldError("Enter a valid email address.");
      return;
    }

    if (password !== c_password) {
      setPasswordError("Passwords do not match.");
      return;
    }
    setLoading(true);

    try {


      const response = await fetch("/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, age, email, password }),
      });

      const data = await response.json();
      console.log("API Response:", data);

      if (data.success) {
        setErrorMessage("SignIn is Successful !");
        localStorage.setItem("userDetails", JSON.stringify(data.result)); 
        setTimeout(() => {router.push("/")
        }, 2000);
        
      } else {
        setErrorMessage(result.message || "Signup failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during signup:", error);
      setErrorMessage("An error occurred during signup. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center px-10 py-2">
      <div className="w-full max-w-md px-8  py-2 sm:py-4 bg-white rounded-lg shadow-lg">
        <h1 className="text-center font-bold text-xl sm:text-3xl text-blue-700 mb-4">
          Sign In
        </h1>

        {fieldError && <p className="text-red-500 mb-2">{fieldError}</p>}
        {passwordError && <p className="text-red-500 mb-2">{passwordError}</p>}
        {errorMessage && <p className="text-green-600 mb-2">{errorMessage}</p>}

        <input
          type="text"
          placeholder="Enter Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-gray-300 p-2 sm:p-3 sm:mb-4 mb-2 rounded w-full text-black text-sm"
        />

        <input
          type="number"
          placeholder="Enter Age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          className="border border-gray-300 p-2 sm:p-3 sm:mb-4 mb-3  rounded w-full text-black text-sm"
        />

        <input
          type="email"
          placeholder="Enter Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border border-gray-300 p-2 sm:p-3 sm:mb-4 mb-3  rounded w-full text-black text-sm"
        />

        <input
          type="password"
          placeholder="Create Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border border-gray-300 p-2 sm:p-3 sm:mb-4 mb-3 rounded w-full text-black text-sm"
        />

        <input
          type="password"
          placeholder="Confirm Password"
          value={c_password}
          onChange={(e) => setCPassword(e.target.value)}
          className="border border-gray-300 p-2 sm:p-3 sm:mb-4 mb-3 rounded w-full text-black text-sm"
        />

        <button
          className="w-full p-2 sm:p-3 sm:mb-4 mb-2  bg-blue-600  cursor-pointer text-white font-semibold rounded hover:bg-blue-800 transition"
          onClick={(e)=>{
            e.preventDefault();
            handleSignup();}}
        >
          {" "}
          {loading ? "Signing Up..." : "Sign Up"}
        </button>
         
      </div>
    </div>
  );
}

export default Signup;
