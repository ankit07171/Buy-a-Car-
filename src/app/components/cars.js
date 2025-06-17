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

  const handleChange = (e) => { setCar({ ...car, [e.target.name]: e.target.value });};

  const handleSubmit = async () => {
    setMessage("");
    setLoading(true); 

    const carWithShowroom = {...car,showroom_detail_id: props.showroom_id,};

    try {
      const response = await fetch("/api/cars", {
        method: "POST",
        headers: {"Content-Type": "application/json",},
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
        setLoading(false); // End loading on failure
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Server error.");
      setLoading(false); // End loading on error
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-xl">
        <h2 className="text-2xl font-bold text-blue-600 mb-6 text-center">
          Add Car Details
        </h2>
        
        {message && <p className="text-center mb-4 text-green-600">{message}</p>}

        <input
          type="text"
          name="name"
          placeholder="Car Name"
          value={car.name}
          onChange={handleChange}
          className="w-full mb-4 p-3 border rounded text-black"
          disabled={loading}  
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          value={car.price}
          onChange={handleChange}
          className="w-full mb-4 p-3 border rounded text-black"
          disabled={loading}
        />

        <textarea
          name="description"
          placeholder="Description (engine, fuel type, tyres...)"
          value={car.description}
          onChange={handleChange}
          className="w-full mb-4 p-3 border rounded text-black"
          rows={4}
          disabled={loading}
        />

        <input
          type="text"
          name="image"
          placeholder="Image URL"
          value={car.image}
          onChange={handleChange}
          className="w-full mb-6 p-3 border rounded text-black"
          disabled={loading}
        />


        <button
          onClick={handleSubmit}
          className={`w-full ${loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700"} text-white  cursor-pointer font-bold py-3 px-4 rounded`}
          disabled={loading} >
          {loading ? "Adding Car..." : "Add Car"}
        </button>
      </div>
    </div>
  );
}

export default Cars;
