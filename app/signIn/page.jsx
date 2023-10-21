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
import Cookies from "js-cookie";


const SignInPage = () => {
    const [email, setEmail] = useState("");
    const [password,setPassword] = useState("");
    const router = useRouter()

    const handleSubmit = async (event) => {
        event.preventDefault();

        //validate inputs
        if (! email || !password ){
          toast.error("could not validate input")
          return;
        }

        let promiseResolve, promiseReject;
        let promise = new Promise(function (resolve, reject) {
          promiseResolve = resolve;
          promiseReject = reject;
        });
        toast.promise(promise, {
          loading: "Logging in...",
          success: (reason) => reason,
          error: (reason) => reason
        })
        
        

        try {
             // Handle user login
             const response = await AxiosInstance.post('/auth/login', {
              login: email,
              password,
            });
          // handle response
          promiseResolve("successfully logged in")
          console.log(response.data);

       
      
          if (response.status === 200) {
            // Update the access token with the new one
            const access_token = response.data.auth_info.atoken; //initialize other auth info in future
            Cookies.set("token", access_token, { expires: 7 }); // Update the access token in the cookie
          }
      
          // Redirect to the dashboard or another protected page
          setTimeout(() => router.push("/Dashboard"), 2000);
        } catch (error) {
          console.error(error);
      
          let errorMessage = "An error occurred during sign-in.";
          if (error.response && error.response.data && error.response.data.message) {
            errorMessage = error.response.data.message;
          }
      
          promiseReject(errorMessage);
        }
      };


    return (
<section className="  lg:bg-primary bg-white  h-[51rem] ">
<div className="w-[100rem] h-[51rem] px-16 left-[574px] top-0 absolute bg-white rounded-tl-3xl rounded-bl-3x" />
   
   {/* food image */}
<div className="hidden md:block mt-0 mb-0">
<p className="my-0 relative left-[21.13rem] top-[2rem] font-medium font-galada text-white ">My
          <br />Kitchen
          <br />Power</p>
<div className="relative my-0 w-[16.38rem] h-[17.06rem] top-[7.06rem] left-[5.13rem] rounded-[50%] bg-gray [filter:blur(100px)]  " />
      <div className="absolute my-0 top-[10.06rem] left-[7.61rem] ">
        <Image
          className="w-full h-auto md:w-full md:h-full object-cover"
          alt=""
          src={MkpSignupImg}
          width={550}
          height={550}
        />
         <h3 className="relative text-[1rem] mt-10 text-center font-medium  text-white">Cook Like Never Before...</h3>
      </div>
</div>

 {/* email input div */}
 <div className="max-w-md mx-auto text-center  lg:top-0 lg:absolute lg:left-[800px] justify-content-center d-flex ">
 <div className=" top-[6.44rem] justify-content-center  text-left text-black">

    <h2 className=" text-center  ">Welcome Back</h2>
    <p className= "text-center">To keep connected with us please
    <br />login with your personal info </p> 
    </div>

    
   {/* Form for collecting email */}
   <form onSubmit={handleSubmit}>
   <div className="w-full h-full lg:px-5 py-2 mb-5 mt-5 border-[1px] border-solid border-primary">
          <input
           type="email"
           value={email}
           onChange={(e) => setEmail(e.target.value)}
           className="w-full h-full  py-4 bg-transparent border-none outline-none "
           placeholder="Enter your email"
            required
          />
        </div>
       
         {/* Password Input */}
         <div className="w-full h-full lg:px-5 py-2 mb-5 mt-5 border-[1px] border-solid border-primary">
          <input
            type="password"
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            name="password"
            className="w-full h-full  py-4 bg-transparent border-none outline-none"
            placeholder="XXXXXXXXXX"
            required
          />
        </div>
        
       
        <div className ="w-full h-full lg:px-[22px]  mb-5 mt-5 bg-primary  flex justify-center  ">
       <button
          type="submit"
          className="bg-transparent border-none py-[25.96px]  outline-none text-white "
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
    <p className="text-center">Don't have an account? <Link href="./signUp" className="underline text-blue-600">Signup</Link></p>
    <div className="justify-content-center  inline-block">
    <div className=" box-border w-[15.63rem] h-[0.06rem]  border-solid border-black" />
    <div className=" box-border w-[15.63rem] h-[0.06rem]  border-solid border-black" />
    <h3 className="  ">OR</h3>
    </div>

     {/*  */}
   <div className="grid  place-items-center ">

    <div className="flex items-center"> 
     <Image className=" w-[1.88rem] h-[1.88rem] overflow-hidden" 
    alt="" src={Apple}
    width={30}           
    height={30} />
    <h3 className="">Continue with Apple</h3>
    </div>

    <div className="flex items-center">
    <Image className=" w-[1.88rem] h-[1.88rem] overflow-hidden" 
    alt=""
    src={Microsoft}
    width={30}
    height={30} />
    <h3 className="">Continue with Microsoft Account</h3>
    </div>
  
    <div className="flex items-center">
    <Image className=" w-[1.88rem] h-[1.88rem] overflow-hidden" 
    alt="" 
    src= {GoogleIcon}
    width={30}
    height={30} />
    <h3 className="">Continue with Google</h3>
    </div>
   </div>
</div>
    </section>
    );
    };
    export default SignInPage;