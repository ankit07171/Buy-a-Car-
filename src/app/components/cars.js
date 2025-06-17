"use client";
import React, { useState } from "react";

function Cars(props) {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [car, setCar] = useState({
    name: "",
    price: "",
    description: "",
    image: "",
  });

  const handleChange = (e) => {
    setCar({ ...car, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setMessage("");
    setLoading(true);

    const carWithShowroom = {
      ...car,
      showroom_detail_id: props.showroom_id,
    };

    try {
      const response = await fetch("/api/cars", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(carWithShowroom),
      });

      const data = await response.json();

      if (data.success) {
        setMessage("✅ Car added successfully!");
        setTimeout(() => {
          setMessage("");
          setCar({ name: "", price: "", description: "", image: "" });
          setLoading(false);
        }, 2000);
      } else {
        setMessage("❌ Failed to add car.");
        setLoading(false);
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Server error.");
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center px-10 py-2">
      <div className="w-full max-w-md px-8 py-2 sm:py-4 bg-white rounded-lg shadow-lg">
        <h1 className="text-center font-bold text-xl sm:text-3xl text-blue-700 mb-4">
          Add Car Details
        </h1>

        {message && (
          <p
            className={`mb-4 text-center ${
              message.includes("✅")
                ? "text-green-600"
                : "text-red-500"
            }`}
          >
            {message}
          </p>
        )}

        <input
          type="text"
          name="name"
          placeholder="Enter Car Name"
          value={car.name}
          onChange={handleChange}
          className="border border-gray-300 p-2 sm:p-3 sm:mb-4 mb-2 rounded w-full text-black text-sm"
          disabled={loading}
        />

        <input
          type="number"
          name="price"
          placeholder="Enter Price"
          value={car.price}
          onChange={handleChange}
          className="border border-gray-300 p-2 sm:p-3 sm:mb-4 mb-2 rounded w-full text-black text-sm"
          disabled={loading}
        />

        <textarea
          name="description"
          placeholder="Description (e.g. engine, fuel type...)"
          value={car.description}
          onChange={handleChange}
          className="border border-gray-300 p-2 sm:p-3 sm:mb-4 mb-2 rounded w-full text-black text-sm"
          rows={4}
          disabled={loading}
        />

        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={car.image}
          onChange={handleChange}
          className="border border-gray-300 p-2 sm:p-3 sm:mb-4 mb-2 rounded w-full text-black text-sm"
          disabled={loading}
        />

        <button
          onClick={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
          className="w-full p-2 sm:p-3 sm:mb-4 mb-2 bg-blue-600 cursor-pointer text-white font-semibold rounded hover:bg-blue-800 transition"
          disabled={loading}
        >
          {loading ? "Adding Car..." : "Add Car"}
        </button>
      </div>
    </div>
  );
}

export default Cars;
