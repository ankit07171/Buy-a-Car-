"use client";
import { set } from "mongoose";
import React, { useState } from "react";
import {useRouter} from "next/navigation";
import next from "next";

function Page() {
  const router =useRouter();
  const [name, setName] = useState("");
  const [experience, setExperience] = useState("");
  const [location, setLocation] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const handleData = async () => {
    setErrorMsg("");
    setLoading(true);
    try {
      const response = await fetch("/api/showroom", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, experience, location }),
      });

      const data = await response.json();
      if (data.success) {
        setErrorMsg("✅ Showroom added successfully!");
        setName("");
        setExperience("");
        setLocation("");
        setTimeout(()=>{
          setErrorMsg("");
          router.push("/");
        },2000)
      } else {
        setErrorMsg(data.error || "❌ Something went wrong.");
      }
    } catch (err) {
      console.error("Error Occurred:", err);
      setErrorMsg("❌ Server error. Try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
     <><div className=" top-5 left-0 bg-blue-600">
      <button
          className="border p-3 font-bold rounded-lg bg-white mt-2 ml-2 mb-2 text-black cursor-pointer hover:bg-gray-300"
          onClick={() => router.push("/")}> ← Go Back
        </button>
      </div>
    <div className="min-h-screen  flex justify-center items-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white  rounded-lg shadow-xl">
        <h1 className="text-center font-bold text-3xl text-blue-700 mb-6">
          Add Showroom
        </h1>

        {errorMsg && (
          <p
            className={`text-center mb-3 ${
              errorMsg.includes("✅") ? "text-green-600" : "text-red-600"
            }`}
          >
            {errorMsg}
          </p>
        )}

        <input
          type="text"
          placeholder="Enter Showroom Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border border-gray-300 p-3 mb-4 rounded w-full text-black"
        />

        <input
          type="number"
          placeholder="Enter Experience (years)"
          value={experience}
          onChange={(e) => setExperience(e.target.value)}
          className="border border-gray-300 p-3 mb-4 rounded w-full text-black"
        />

        <input
          type="text"
          placeholder="Enter Location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          className="border border-gray-300 p-3 mb-4 rounded w-full text-black"
        />

        <button
          className="w-full p-3 bg-blue-600 text-white cursor-pointer  font-semibold rounded hover:bg-blue-800 transition"
          onClick={handleData}
          disabled={loading}
        >
          {loading ? "Adding Showroom..." : "Add Showroom"}
        </button>
      </div>
    </div>
 </>  );
}

export default Page;
