"use client";
import { useState, useEffect } from "react";
import Header from "./components/header";
import { useRouter } from "next/navigation";
import dotenv from "dotenv"
import Footer from "./components/footer"; 
dotenv.config();

export default function Home() {
  const [user, setUser] = useState(false);
  useEffect(() => {
    const userInfo = localStorage.getItem("userDetails");
    if (userInfo) {
      setUser(true);
    } else {
      setUser(false);
      setErr("Please Login First");
    }
  }, []);

  const [err, setErr] = useState("");
  const router = useRouter();
  const [result, setResult] = useState([]);
  const carImages = [
    "https://cdn.pixabay.com/photo/2015/01/19/13/51/car-604019_1280.jpg",
    "https://cdn.pixabay.com/photo/2012/05/29/00/43/car-49278_1280.jpg",
    "https://www.autoshippers.co.uk/blog/wp-content/uploads/bugatti-centodieci.jpg",
    "https://carwow-uk-wp-3.imgix.net/18015-MC20BluInfinito-scaled-e1707920217641.jpg",
    "https://cdn-fckad.nitrocdn.com/QQqEhdxzQCfGsIbVrVWwmnFZeiIEPRRw/assets/images/optimized/rev-bccf2e1/windshield-expert.s3.ap-south-1.amazonaws.com/wp-content/uploads/2024/06/14084059/Best-5-Tata-Cars.jpg",
    "https://img.autocarindia.com/News/20190308075052_Rolls-Royce-Phantom.jpg?w=700&c=0",
  ];

  const Showroom_details = async () => {
    try {
      const response = await fetch("http://localhost:1145/api/showroom");
      const data = await response.json();
      setResult(data.result);
    } catch (err) {
      console.log("Error Occur", err);
    }
  };
  const [currentIndex, setCurrentIndex] = useState(0);

  //   Showroom_details();
  //   const interval = setInterval(() => {
  //     setCurrentIndex((prevIndex) => (prevIndex + 1) % carImages.length);
  //   }, 5000);

  //   return () => clearInterval(interval);
  // }, []);
  useEffect(() => {
    Showroom_details();

    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % carImages.length);
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <><div className="fixed top-0 overflow-hidden w-full z-10">
      <Header />
</div>
      <div
  className="relative w-full overflow-hidden mt-[4.5rem] h-[380px] sm:h-[400px] md:h-[500px]"
>

        {carImages.map((url, index) => (
          <div
            key={index}
            style={{
              backgroundImage: `url(${url})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              position: "absolute",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              opacity: index === currentIndex ? 0.4 : 0,
              transition: "opacity 1s ease-in-out",
              zIndex: index === currentIndex ? 1 : 0,
            }}
          />
        ))}
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.4)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 2,
          }}
        >
          <h1 className="text-white sm:text-5xl text-3xl font-bold sm:mt-2 p-1">CARS SHOWCASE</h1>
        </div>
      </div>

      <div id="showroom-section" className="bg-gray-900 py-5 px-5 scroll-mt-1">
        <h1 className="text-center text-2xl sm:text-3xl  font-bold text-white mb-6">
          SHOWROOM
        </h1>
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 gap-6 mx-auto cursor-pointer">
          {result.map((showroom, index) => (
            <div
              onClick={() => {
                if (user) {
                  router.push(`/showRoom/${showroom._id}`);
                } else {
                  alert("Please Login First");
                }
              }}
              key={index}
              className="bg-white rounded-lg shadow-lg sm:p-4 p-2 hover:scale-105 transition-transform duration-300"
            >
              <h2 className="text-sm sm:text-xl font-semibold mb-1 text-gray-800">
                {showroom.name}
              </h2>
              <p className="text-gray-600 text-sm sm:text-xl">Experience: {showroom.experience}</p>
              <p className="text-gray-600 text-sm sm:text-xl">Location: {showroom.location}</p>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
