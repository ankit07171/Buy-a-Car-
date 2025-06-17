'use client';
import { useState } from "react";
import Header from "../components/header";
import Footer from "../components/footer";
import Login from "../components/login";
import Signup from "../components/signup";

const UserAuth = (props) => {
    const [login, setLogin] = useState(true);

    return (
        <div className="min-h-screen flex flex-col bg-gradient-to-br from-blue-100 to-blue-300">
            <Header />
            <div className="flex-grow flex flex-col items-center justify-center px-2 pt-2">
                <div className="w-full sm:max-w-sm md:max-w-md lg:max-w-lg rounded-xl">
                    {login ? <Login redirect={props.searchParams} /> : <Signup redirect={props.searchParams} />}
                </div>
                <button 
                    className="mt-2 text-blue-600 font-medium hover:underline focus:outline-none"
                    onClick={() => setLogin(!login)}
                >
                    {login ? 'Create an account? Signup' : 'Already have an account? Login'}
                </button>
            </div>
            <Footer />
        </div>
    );
};

export default UserAuth;
