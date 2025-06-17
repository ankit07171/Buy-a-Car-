"use client";
import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Cars from '@/app/components/cars';
import CarsList from '@/app/components/carsList';
import Footer from '@/app/components/footer';

export default function Page() {
  const [res, setResult] = useState(null);     
  const [cars, setCars] = useState([]);         
  const [loading, setLoading] = useState(true);  
  const { id } = useParams();
  const router = useRouter();
  const [showAddCarForm, setShowAddCarForm] = useState(false);

  useEffect(() => {
    if (!id) return;

    const fetchData = async () => {
      try {
        const response = await fetch(`/api/showroom/${id}`);
        const data = await response.json();
        setResult(data.result[0]);
        setCars(data.data || []);
        setLoading(false);
      } catch (err) {
        console.error("Fetch error:", err);
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  return (
    <>
     <div className="bg-blue-700 px-3 py-2 sm:px-4 sm:py-3 shadow-md fixed w-full top-0 z-50">
  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1 sm:gap-2">
    <h1 className="text-lg sm:text-2xl font-bold text-white leading-tight">
      {loading ? "Loading..." : `Welcome to ${res?.name}`}
    </h1>

    {res && (
      <div className="text-white text-xs sm:text-base leading-snug sm:leading-tight">
        <p><strong>Experience:</strong> {res.experience} yrs</p>
        <p><strong>Location:</strong> {res.location}</p>
      </div>
    )}
  </div>
</div>


      {/* Content wrapper with top margin */}
      <div className="pt-20 px-3">

     <div className="flex flex-wrap justify-between items-center gap-y-2 ">
  <button
    className="px-3 py-2 text-xs sm:text-sm font-semibold rounded-md bg-white text-black border hover:bg-gray-300 transition w-fit"
    onClick={() => router.push("/")}
  >
    ← Go Back
  </button>

  <button
    className="px-2 py-1.5 text-xs sm:text-sm font-semibold rounded-md bg-red-500 text-white border hover:bg-red-600 transition"
    onClick={() => setShowAddCarForm((prev) => !prev)}
  >
    {showAddCarForm ? 'Cancel' : 'Add Cars'}
  </button>
</div>



        {/* Main Content */}
        <div className="min-h-screen w-full">
          {loading ? null : (
            showAddCarForm ? <Cars showroom_id={id} /> : <CarsList car={cars} />
          )}
        </div>
      </div>

      <Footer className="sm:text-lg" />
    </>
  );
}
