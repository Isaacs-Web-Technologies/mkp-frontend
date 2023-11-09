
"use client";
import React, { useState } from "react";
import AxiosInstance from "@/components/axiosInstance";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useEffect } from "react";
import toast from "react-hot-toast";
import GoogleIcon from "@/public/images/GoogleIcon.png"
import Microsoft from "@/public/images/microsoft.png"
import Apple from "@/public/images/apple.png"
import MkpSignupImg from "@/public/images/mkpSignupImg.png"
import Link from "next/link";
import { resolve } from "styled-jsx/css";
import { performSignUp, performLogin, useLoggedInUser } from "@/components/auth";




const SignUpPage = () => {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const router = useRouter()

  useLoggedInUser([], '/Dashboard');

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (password !== cpassword) {
      toast.error("passwords don't match")
      return (false)
    }
    toast.loading("Creating account...", { id: "signup" });
    performSignUp({ firstName, email, password }).then((reason) => {
      if (reason === undefined)
        return;
      toast.loading("Logging in...", { id: "signup" });
      performLogin({ email, password }).then((reason) => {
        if (reason === undefined)
          return;
        toast.success(reason, { id: "signup" });
        setTimeout(() => {
          router.push("/Dashboard");
        }, 2000);
      }).catch((reason) => {
        toast.error(reason, { id: "signup" });
      });
    }).catch((reason) => {
      toast.error(reason, { id: "signup" });
    });
  };



  return (
     <>
    <div className="flex flex-col md:flex-row min-h-screen bg bg-primary">
      <div className="flex flex-1  items-center justify-center m-0 px-4">
        <div className="hidden md:block">
        <Link href="https://mykitchenpower.com">
          <h3 className="mt-4 text-left text-white text-xl">My Kitchen Power</h3>
          </Link>
          <Image 
            src={MkpSignupImg}
            alt="Cooked meal"
            width={400}
            height={400}
            className="rounded-full"
          />
          <h3 className="mt-4 text-left text-white text-xl">Cook Like Never Before...</h3>
        </div>
      </div>
      <div className="flex-1 flex items-center justify-center px-4 min-h-screen">
      <div className="w-full max-w-md">  
     <div className="bg-white p-10  mx-0 border border-gray-300 rounded-lg shadow-md">
     <h2 className="mb-4 text-2xl font-bold text-center">Create your account</h2>
      
          <form onSubmit={handleSubmit}>
          <div className="space-y-4 pr-4">
                <div>
                <label htmlFor="firstname" className="sr-only">Email</label>
                <input
                  type="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter your name"
                  required
                />
              </div>
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
                  placeholder="*********"
                  required
                />
              </div>
             <div>
              {/*Confirm  Password Input */}
              <label htmlFor="confirm-password" className="sr-only">Confirm Password</label>
                <input
                  type="password"
                  value={cpassword}
                  onChange={(e) => setCPassword(e.target.value)}
                  id="confirmPassword"
                  name="confirmPassword"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="***********"
                  required
                />
              </div>
          </div>

            <div className="mt-6">
              <button
                type="submit"
                className="w-full p-3 bg-primary text-white rounded-md hover:bg-orange-600 transition"
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
          <p className="mt-4 text-center">
            Already have an account? 
            <Link href="./signIn" 
            className="hover:underline text-blue-600">Signin
            </Link>
          </p>
            </div>
        </div>
      </div>
    </div>
     </>
  );
}
export default SignUpPage;