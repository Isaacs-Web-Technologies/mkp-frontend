"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect } from "react";
import toast from "react-hot-toast";
import GoogleIcon from "@/public/images/GoogleIcon.png"
import Microsoft from "@/public/images/microsoft.png"
import Apple from "@/public/images/apple.png"
import MkpSignupImg from "@/public/images/mkpSignupImg.png"
import Link from "next/link";
import { performLogin, useLoggedInUser } from "@/components/auth";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter()
  useLoggedInUser([], "/Dashboard");

  const handleSubmit = async (event) => {
    event.preventDefault();
    toast.loading("Gathering recipes...", { id: "login" });
    performLogin({ email, password }).then((msg) => {
      toast.success(msg, { id: "login" });
      const loadingToast = toast.loading("Enjoy your meal...");

      setTimeout(() => {
        toast.dismiss(loadingToast);
        router.push("/Dashboard");
      }, 2000);
    }).catch((msg) => {
      toast.error(msg, { id: "login" });
    });
  }

  return (
    <>
    <div className="flex flex-col md:flex-row min-h-screen bg-primary">
      <div className="flex flex-1  items-center justify-center m-0 px-4">
        <div className="hidden md:block">
          <Link className="no-underline" href="https://mykitchenpower.com">
          <h3 className="mt-4 text-left text-white text-xl">My Kitchen Power</h3>
          </Link>
          <Image 
            src={MkpSignupImg}
            alt="Cooked meal"
            width={480}
            height={470}
            className="rounded-full"
          />
          <h3 className="mt-4 text-left text-white text-xl">Cook Like Never Before...</h3>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center px-4 min-h-screen">
      <div className="w-full max-w-md">  
     <div className="bg-red p-10  mx-0 border border-gray-300 rounded-lg shadow-md">
     <h2 className="mb-4 text-2xl font-bold text-center">Welcome back</h2>

    
        <form onSubmit={handleSubmit}>
        <div className="space-y-4 pr-4">
        <div>
            <label htmlFor="email" className="sr-only">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Enter your email"
                required
              />
            </div>
            <div>
            <label htmlFor="password" className="sr-only">Password</label>
            {/* Password Input */}
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                id="password"
                name="password"
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="Password"
                required
              />
            </div>
        </div>


            <div className="mt-6">
              <button
                type="submit"
                className="w-full p-3 bg-tetiary text-white hover:text-black rounded-md hover:bg-white transition"
                onKeyDown={e => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    handleSubmit(e);
                    e.preventDefault();
                  }
                }}
              >
                Continue
              </button>
            </div>

        </form>
        {/*  */}
        <p className="mt-4 text-center">
          Don't have an account?
           <Link href="./signUp" 
           className="hover:underline text-blue-600">Signup
           </Link>
        </p>
        </div>
        </div>
      </div>
    </div>
     </> 
  );
};
export default SignInPage;