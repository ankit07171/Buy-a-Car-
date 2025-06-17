"use client"
import React, { useEffect, useState } from 'react';
import ShowMore from "@/app/components/showMore";
import BuyCar from "@/app/components/buyCar";
import { useParams } from 'next/navigation';

function Page() {
  const { id } = useParams();
  const [showBuy, setShowBuy] = useState(false);
const[loading,setLoading]=useState(false);

useEffect(() => {
  setLoading(!loading)
}, [])

  return (
    <>
      <h1 className='font-bold text-center text-2xl bg-blue-600 text-white p-3'>
        Car Details
      </h1>

      {!showBuy ? (
        <ShowMore id={id}  setShowBuy={setShowBuy} loading={loading} /> ) : (
        <><button
        onClick={() => setShowBuy(false)}
        className="px-2 py-1.5 bg-white text-black mt-1 ml-1 rounded hover:bg-gray-300 text-sm sm:text-lg"
      >
        ← Go Back
      </button>
        <BuyCar id={id} /></>
      )}
    </>
  );
}

export default Page;
