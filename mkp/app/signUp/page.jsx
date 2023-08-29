
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

function validateInput( email) {
    if (email.search(/@/) == -1){
      toast.error("email must be valid")
      return (false)
    }
    
    return (true)
  };

const SignUpPage = () => {
    const [email, setEmail] = useState("");
    const router = useRouter()

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!validateInput( email)) {
          console.error("could not validate input")
          return
        }
        let promiseResolve, promiseReject;
        let promise = new Promise(function (resolve, reject) {
          promiseResolve = resolve;
          promiseReject = reject;
        });
        toast.promise(promise, {
          loading: "creating account...",
          success: (reason) => reason,
          error: (reason) => reason
        })
        try {
          const response = await AxiosInstance.post('/auth/signup', {
            email
          });
          promiseResolve("successfully created account")
          console.log(response.data);
          // Redirect to the dashboard or another protected page
          setTimeout(() => router.push("/login"), 2000)
        } catch (error) {
          console.error(error);
      
          let errorMessage = "An error occurred during sign-up.";
          if (error.response && error.response.data && error.response.data.message) {
            errorMessage = error.response.data.message;
          }
      
          promiseReject(errorMessage);
        }
      };


      useEffect(() => {
        if (localStorage.getItem('token')){
          router.push("/")
        }
      })


    return (
    <div className="relative  bg-primary  h-[64rem] overflow-hidden text-center text-[1.5rem] text-sec-color font-poppins"> 
    <div className="absolute top-[0rem] left-[35.88rem] rounded-tl-3xl rounded-tr-none rounded-br-none rounded-bl-3xl bg-sec-color w-[54.13rem] h-[64rem]" />
    <div className="absolute top-[6.44rem] left-[44.31rem] w-[37.25rem] h-[51.13rem] text-left text-black">

    <h2 className=" text-center justify-content-center ">Create your account</h2>
    <div className="text-center justify-content-center d-flex ">
    <p className= "m-0">Please note that phone verification is required for </p>
    <p className="m-0">signup. Your number will only be used to verify</p>
    <p className="m-0">your identity for security purposes.</p>
    </div>

    
   {/* Form for collecting email */}
   <form onSubmit={handleSubmit}>
        <div className="h-full px-3 py-2 mb-5 mt-5 border-[1px] border-solid border-primary">
          <input
           type="email"
           value={email}
           onChange={(e) => setEmail(e.target.value)}
            className="w-full h-full px-3 py-4 bg-transparent border-none outline-none"
            placeholder="Enter your email"
            required
          />
        </div>

         {/* Password Input */}
         <div className="h-full px-3 py-2 mb-5 mt-5 border-[1px] border-solid border-primary">
          <input
            type="password"
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            name="password"
            className="form-input mt-1 block w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
            placeholder="XXXXXXXXXX"
            required
          />
        </div>

         {/*Confirm  Password Input */}
         <div className="h-full px-3 py-2 mb-5 mt-5 border-[1px] border-solid border-primary">
        <input
            type="password"
            value={cpassword} 
            onChange={(e) => setCPassword(e.target.value)}
            id="confirmPassword"
            name="confirmPassword"
            className="form-input mt-1 block w-full border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-blue-500"
            placeholder="XXXXXXXXXX"
            required
          />
          </div>
       
        <button
          type="submit"
          className=" top-[23.75rem] left-0 w-full bg-primary overflow-hidden flex justify-center py-[29.96px] text-sec-color"
        >
          Continue
        </button>
      </form>

    <p className="top-[31.63rem] text-center">Already have an account? <Link href="./signIn" className="underline text-blue-600">Login</Link></p>
    <div className="absolute top-[35.75rem] left-[0.25rem] w-[36.75rem] h-[2.25rem]">
    <div className="absolute top-[1.09rem] left-[-0.03rem] box-border w-[15.63rem] h-[0.06rem] border-t-[1px] border-solid border-black" />
    <div className="absolute top-[1.09rem] left-[21.16rem] box-border w-[15.63rem] h-[0.06rem] border-t-[1px] border-solid border-black" />
    <div className="absolute top-[0rem] left-[17.31rem]">OR</div>
    </div>

    <div className="absolute top-[41.31rem] left-[6.44rem]">Continue with Google</div>
    <div className="absolute top-[45.06rem] left-[6.44rem]">Continue with Microsoft Account</div>
    <div className="absolute top-[48.88rem] left-[6.44rem]">Continue with Apple</div>

    <Image className="absolute top-[49.06rem] left-[3.5rem] w-[1.88rem] h-[1.88rem] overflow-hidden" 
    alt="" src={Apple}
    width={30}           
    height={30} />
    <Image className="absolute top-[45.25rem] left-[3.25rem] w-[1.88rem] h-[1.88rem] overflow-hidden" 
    alt=""
    src={Microsoft}
    width={30}
    height={30} />
    <Image className="absolute top-[41.5rem] left-[3.25rem] w-[1.88rem] h-[1.88rem] overflow-hidden" 
    alt="" 
    src= {GoogleIcon}
    width={30}
    height={30} />
</div>







<div className="absolute top-[51px] left-[289px] md:top-14 md:left-20 md:inline-block w-48 flex flex-col p-2.5 items-center justify-center font-galada">
        <div className="relative">
          <p className="m-0">My</p>
          <p className="m-0">Kitchen</p>
          <p className="m-0">Power</p>
        </div>
      </div>

      <div className="absolute top-[17.06rem] left-[5.13rem] rounded-[50%] bg-gray [filter:blur(100px)] w-[36.38rem] h-[36.06rem] md:w-[36.38rem] md:h-[36.06rem]" />
      <div className="absolute top-[17.06rem] left-[4.31rem] w-full md:w-[39.19rem] md:h-[35.63rem]">
        <Image
          className="w-full h-auto md:w-full md:h-full object-cover"
          alt=""
          src={MkpSignupImg}
          width={550}
          height={550}
        />
      </div>
    <div className="absolute top-[55.44rem] left-[11.25rem] text-[1rem] font-medium inline-block w-[19.38rem]">Cook Like Never Before...</div>
    </div>
    );
    };
    export default SignUpPage;