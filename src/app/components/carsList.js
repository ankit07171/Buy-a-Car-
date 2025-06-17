'use client';
import { useRouter } from "next/navigation";
import React from "react";

function CarsList({ car }) {
  const router = useRouter();

  if (!car || car.length === 0) {
    return (
      <div className="min-h-screen flex justify-center items-center text-2xl">
        <h1 className="font-bold">No Cars Available</h1>
      </div>
    );
  }

  return (
    <div className="p-4 grid grid-cols-1 gap-6">
      {car.map((carr) => (
        <div
          key={carr._id}
          className=" flex flex-col sm:flex-row items-center sm:items-stretch border p-4 rounded-lg shadow-md bg-white"
        >
          {/* Image Section */}
         <div className="w-64 h-32 sm:w-64 sm:h-28 rounded overflow-hidden flex-shrink-0">
  <img
    src={carr.image}
    alt={carr.name}
    className="w-full h-full object-cover rounded"
  />
</div>

 
          <div className="w-full sm:w-1/3 mt-4 sm:mt-0 sm:px-4 flex flex-col justify-between">
            <div>
              <h1 className="font-bold text-xl text-black sm:text-2xl">{carr.name}</h1>
              <p className="text-gray-600 mt-1 text-sm line-clamp-4 break-words">
                {carr.description}
              </p>
            </div>
          </div>

          {/* Price & Button */}
          <div className="w-full sm:w-1/3 mt-4 sm:mt-0 flex sm:flex-col items-center justify-between sm:items-end sm:justify-center">
            <h1 className="font-bold text-lg text-gray-700 sm:text-xl">₹{carr.price}</h1>
            <button
              onClick={() => router.push("/carDetails/" + carr._id)}
              className="bg-yellow-600 text-white px-4 py-2 rounded hover:bg-yellow-700 mt-2 sm:mt-4 transition"
            >
              Show More
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CarsList;
