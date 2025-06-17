"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

function BuyCar({ id }) {
  const router = useRouter();
  const [res, setResult] = useState(null);
  const [showSuccess, setShowSuccess] = useState(false);

  const storeCar = () => {
    if (res) {
      const existingCars = JSON.parse(localStorage.getItem("carDetails")) || [];
      const updatedCars = [...existingCars, res];
      localStorage.setItem("carDetails", JSON.stringify(updatedCars));
      if (updatedCars.length === 2) {
        alert("Aukat k bahar mat jaa!", updatedCars);
      } else if (updatedCars.length === 1) {
        alert("Congratulations, You bought a New Car");
      } else {
        const audio = new Audio("/sounds/success.mp3");
        audio.play();
      }
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/cars/${id}`);
        const data = await response.json();
        if (data.success && data.data && data.data.length > 0) {
          setResult(data.data[0]);
        }
      } catch (err) {
        console.error(err);
      }
    };

    if (id) fetchData();
  }, [id]);

  if (!res) {
    return <div className="text-center mt-10 text-xl">Loading...</div>;
  }

  const tax = Math.round(res.price * 0.1);
  const extra_charge = Math.round(res.price * 0.05);
  const total = res.price + tax + extra_charge;

  const handleConfirm = () => {
    setShowSuccess(true);
    storeCar();
    setTimeout(() => {
      setShowSuccess(false);
      router.push("/");
    }, 2000);
  };

  return ( 
      <div className="flex flex-col md:flex-row gap-8 items-start p-2 ">
        <div className="w-full md:w-1/2">
          <img
            src={res.image}
            alt={res.name}
            className="w-full h-auto rounded-lg object-cover"
          />
        </div>

        <div className="w-full md:w-1/2">
          <h1 className="sm:text-2xl text-xl font-bold mb-2">{res.name}</h1>
          
         <table className="w-full border border-gray-300 rounded-lg overflow-hidden text-sm sm:text-base">
  <tbody>
    <tr className="border-b">
      <td className="p-4 font-medium text-white">Car Price</td>
      <td className="p-4 text-right font-semibold text-white">₹{res.price}</td>
    </tr>
    <tr className="border-b">
      <td className="p-4 font-medium text-white">Tax (10%)</td>
      <td className="p-4 text-right font-semibold text-white">₹{tax}</td>
    </tr>
    <tr className="border-b">
      <td className="p-4 font-medium text-white">Extra Charges (5%)</td>
      <td className="p-4 text-right font-semibold text-white">₹{extra_charge}</td>
    </tr>
    <tr className="border-t-2">
      <td className="p-4 font-bold text-blue-700 text-lg">Total</td>
      <td className="p-4 text-right font-bold text-blue-700 text-lg">₹{total}</td>
    </tr>
  </tbody>
</table>


          <button
            onClick={handleConfirm}
            className="mt-6 bg-blue-600 text-lg sm:text-xl text-white p-2 sm:p-4 cursor-pointer rounded-lg hover:bg-blue-700 transition"
          >
            Confirm
          </button>
        </div> 
    </div>
  );
}

export default BuyCar;
