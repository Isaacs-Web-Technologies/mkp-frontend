
"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import toast from "react-hot-toast";
import MkpSignupImg from "@/public/images/mkpSignupImg.png"
import Link from "next/link";
import { performSignUp, performLogin, useLoggedInUser } from "@/components/auth";
import PasswordInput from "@/components/PasswordInput";




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
    <div className="flex flex-col md:flex-row min-h-screen  bg-primary">
      <div className="flex flex-1  items-center justify-center m-0 px-4">
        <div className="hidden md:block">
        <Link className="no-underline" href="https://mykitchenpower.com">
          <h3 className=" mt-4 text-left text-white text-xl">My Kitchen Power</h3>
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
     <h2 className="mb-4 text-2xl font-bold text-center">Create your account</h2>
      
          <form onSubmit={handleSubmit}>
          <div className="space-y-4 pr-4">
                <div>
                <label htmlFor="firstname" className="sr-only">Email</label>
                <input
                  type="firstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full p-2 border-none rounded-md"
                  placeholder="Firstname"
                  required
                />
              </div>
              <div>
              <label htmlFor="email" className="sr-only">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-2 border-none rounded-md"
                  placeholder="Email Address"
                  required
                />
              </div>
              <div>
              <label htmlFor="password" className="sr-only">Password</label>
              {/* Password Input */}
                <PasswordInput
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  name="password"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Password"
                  required
                />
              </div>
             <div>
              {/*Confirm  Password Input */}
              <label htmlFor="confirm-password" className="sr-only">Confirm Password</label>
                <PasswordInput
                  value={cpassword}
                  onChange={(e) => setCPassword(e.target.value)}
                  id="confirmPassword"
                  name="confirmPassword"
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Confirm Password"
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