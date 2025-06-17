"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Menu, X } from "lucide-react"; 

function Header() {
  const router = useRouter();
  const [login, setLogin] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [isOpen, setIsOpen] = useState(false);  

  useEffect(() => {
    const storedUser = localStorage.getItem("userDetails");
    if (storedUser) {
      setLogin(true);
      setUserDetails(JSON.parse(storedUser));
    } else {
      setLogin(false);
      setUserDetails(null);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("userDetails");
    localStorage.removeItem("carDetails");
    setLogin(false);
    setUserDetails(null);
    setIsOpen(false); // close menu on logout
  };

  const handleAddShowroom = () => {
    if (login) {
      router.push("/showRoom");
    } else {
      alert("Please Login First");
    }
    setIsOpen(false); };

  return (
    <div className="bg-blue-600 text-white px-4 py-2">
      <div className="flex items-center justify-between"> 

        <div className="flex items-center gap-2">
          <img
            className="w-14 h-14 rounded-full"
            src="https://images.scalebranding.com/ay-logo-ya-logo-9c1e37b5-74f1-446f-b0f7-566f0bdbd29c.jpg"
            alt="Logo"
          />
          <span className="text-xl font-bold">Car Showroom</span>
        </div>

        
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
 
        <ul className="hidden md:flex items-center gap-6 text-lg font-semibold">
          <li>
            <Link href="/" className="hover:underline">
              Home
            </Link>
          </li>
          <li onClick={handleAddShowroom} className="hover:underline cursor-pointer">
            Add ShowRoom
          </li>
          {login ? (
            <>
              <li className="font-medium">Welcome, {userDetails?.name}</li>
              <li>
                <button onClick={handleLogout} className="hover:underline">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link href="/user-auth" className="hover:underline">
                Login/SignIn
              </Link>
            </li>
          )}
        </ul>
      </div>
 
      {isOpen && (
  <ul className="md:hidden fixed top-0 right-0 h-screen w-1/2 bg-blue-600 text-white p-6 flex flex-col gap-8 z-50 shadow-lg transition-all duration-300">
    <li className="self-end">
      <button onClick={() => setIsOpen(false)}>
        <X size={28} />
      </button>
    </li>
    <li className="text-center cursor-pointer">
      <Link href="/" onClick={() => setIsOpen(false)}>
        Home
      </Link>
    </li >
    <li className="text-center cursor-pointer">
      <a href="#showroom-section" onClick={() => setIsOpen(false)} className="hover:underline">
    Showroom
  </a>      
    </li >
    <li 
    className="text-center cursor-pointer"
    onClick={handleAddShowroom}>
      Add ShowRoom
    </li>
    {login ? (
      <>
        <li className="font-medium text-center cursor-pointer">Welcome, {userDetails?.name}</li>
        <li className="text-center bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded">
          <button onClick={handleLogout}>Logout</button>
        </li>
      </>
    ) : (
      <li className="text-center cursor-pointer">
        <Link href="/user-auth" onClick={() => setIsOpen(false)}>
          Login/SignIn
        </Link>
      </li>
    )}
  </ul>
)}

    </div>
  );
}

export default Header;
