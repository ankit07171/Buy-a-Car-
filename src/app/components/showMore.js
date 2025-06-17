"use client"
import React, { useEffect, useState } from 'react';
import {  useRouter } from 'next/navigation';

function ShowMore({id,setShowBuy,loading}) { 
  const router = useRouter();
  const [res, setResult] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`/api/cars/${id}`);
        const data = await response.json();
        if (data.success  && data.data && data.data.length > 0) {
          setResult(data.data[0]);
        }
      } catch (err) {
        console.error(err);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]);

  if (!res) {
    return <div className='text-center mt-10 text-xl'>Loading...</div>;
  }

  return (
    <div className='p-3'>
      <button
        onClick={() => router.push("/showRoom/" + res.showroom_detail_id)}
        className='mb-2 px-1.5 py-1 bg-white text-black rounded hover:bg-gray-300 text-base sm:text-lg'
      >
        ← Go Back
      </button>

      <div className='flex flex-col md:flex-row  items-start'>
        <div className='w-full md:w-1/2 text-sm md:text-base p-6'>
          <img
            src={res.image}
            alt={res.name}
            className='w-full h-auto rounded-lg object-cover'
          />
        </div>

        <div className='w-full md:w-1/2 flex flex-col justify-between h-full relative'>
          <div className='p-6'>
            <h1 className='text-3xl font-bold'>{res.name}</h1>
            <p className='text-gray-700 text-sm'>{res.description}</p>
          </div>
  <div className='mt-auto self-end'>
            <p className='text-lg sm:text-xl text-center font-semibold border-2 p-2 sm:p-4 rounded shadow mb-4'>
              ₹{res.price}
            </p>

            {loading && (
              <button
                onClick={() => setShowBuy(true)}
                className='bg-green-600 text-white p-2 sm:p-4  cursor-pointer  rounded-lg hover:bg-green-700 transition sm:text-lg text-base'
              >
                Proceed to Buy
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ShowMore;
