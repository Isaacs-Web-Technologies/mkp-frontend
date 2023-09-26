
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

// validating function
function validateInput(firstName,lastName, email, password, cpassword) {
 
  if (! firstName.match(/^[a-z0-9_-]+$/gi)) {
    toast.error("username must only contain letters, numbers, underscores and hyphens")
    return false
  }
  if (! lastName.match(/^[a-z0-9_-]+$/gi)) {
    toast.error("username must only contain letters, numbers, underscores and hyphens")
    return false
  }
  if (firstName.search(/[a-z]/gi) == -1) {
    toast.error("firstname must contain at least one letter")
    return (false)
  }
  if (lastName.search(/[a-z]/gi) == -1) {
    toast.error("lastname must contain at least one letter")
    return (false)
  }
  if (email.search(/@/) == -1){
    toast.error("email must be valid")
    return (false)
  }
  if (password !== cpassword) {
    toast.error("passwords don't match")
    return (false)
  }
  if (password.length < 8) {
    toast.error("password must be at least 8 characters long")
    return (false)
  }
  if (password.search(/[0-9]/) == -1) {
    toast.error("password must contain digit")
    return (false)
  }
  if (password.search(/[A-Z]/) == -1) {
    toast.error("password must contain uppercase letters")
    return (false)
  }
  if (password.search(/[a-z]/) == -1) {
    toast.error("password must contain lowercase letters")
    return (false)
  }
  if (password.search(/[!"#$%&\\'()*+,-.\/:;<=>?@\[\]^_`\{\|\}~]/) == -1) {
    toast.error("password must contain symbols")
    return (false)
  }
  return (true)
};

const SignUpPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [username, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [cpassword, setCPassword] = useState("");
  const router = useRouter()

    const handleSubmit = async (event) => {
        event.preventDefault();

        // validate input fields
        if (!validateInput(firstName,lastName, email, password, cpassword)) {
          console.error("Could not validate inputs.")
          return;
        }

      // Display a loading message while making API requests
      const promise = new Promise(async (resolve, reject) => {
        try {
          const response = await AxiosInstance.post('/auth/signup', {
            first_Name: firstName,
            last_Name: lastName,
            username,
            email,
            password,
          });
          
          if (response.data.message === "Successfully signed up") {
            resolve("Successfully signed up");

            //Redirect to login page after sign-up
            router.push("/signIn");
           } else if (response.data.message ==="email is taken") {
              reject("Error message while creating user: email is taken");
            } else {
              reject("Signup failed. Please try again.")
            }
          } catch (error) {
            console.error(error);
            reject("An error occured during signup. Please try again")
          }
      });

      //use toast.promise to display toast message
      toast.promise(promise, {
        loading: "Creating account...",
        success: (reason) => toast.success(reason),
        error: (reason) => toast.error(reason),
      });

    };

  

    return (

<>    

{/* heading */}
<section className="  lg:bg-primary bg-white  h-[58rem] ">
<div className="w-[100rem] h-[58rem] px-16 left-[574px] top-0 absolute bg-white rounded-tl-3xl rounded-bl-3x" />


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
  <h2 className=" text-center  ">Create your account</h2>
  <p className= "text-center">Enter your personal details to start
  <br /> your journey with us</p>
  </div>

{/* Form for collecting email */}
<form onSubmit={handleSubmit}>
  {/* firstname input */}
  <div className="w-full  lg:px-5 py-1 mb-5 mt-5 border-[1px] border-solid border-primary">
     <input
      type="firstName"
      value={firstName}
      onChange={(e) => setFirstName(e.target.value)}
       className="w-full   py-2 bg-transparent border-none outline-none "
       placeholder="Enter your first name"
       required
     />
   </div>
   {/* lastname input */}
   <div className="w-full  lg:px-5 py-1 mb-5 mt-5 border-[1px] border-solid border-primary">
     <input
      type="lastName"
      value={lastName}
      onChange={(e) => setLastName(e.target.value)}
       className="w-full   py-2 bg-transparent border-none outline-none "
       placeholder="Enter your last name"
       required
     />
   </div>
   {/* username input */}
   <div className="w-full  lg:px-5 py-1 mb-5 mt-5 border-[1px] border-solid border-primary">
     <input
      type="username"
      value={username}
      onChange={(e) => setUserName(e.target.value)}
       className="w-full  py-2 bg-transparent border-none outline-none "
       placeholder="Enter your username"
     />
   </div>
   {/* email input */}
   <div className="w-full  lg:px-5 py-1 mb-5 mt-5 border-[1px] border-solid border-primary">
     <input
      type="email"
      value={email}
      onChange={(e) => setEmail(e.target.value)}
       className="w-full   py-2 bg-transparent border-none outline-none "
       placeholder="Enter your email"
       required
     />
   </div>
{/* Password Input */}
<div className="w-full  lg:px-5 py-1 mb-5 mt-5 border-[1px] border-solid border-primary">
          <input
            type="password"
            value={password} 
            onChange={(e) => setPassword(e.target.value)}
            id="password"
            name="password"
            className="w-full   py-2 bg-transparent border-none outline-none"
            placeholder="*********"
            required
          />
        </div>

         {/*Confirm  Password Input */}
         <div className="w-full  lg:px-5 py-1 mb-5 mt-5 border-[1px] border-solid border-primary">
        <input
            type="password"
            value={cpassword} 
            onChange={(e) => setCPassword(e.target.value)}
            id="confirmPassword"
            name="confirmPassword"
            className="w-full   py-2 bg-transparent border-none outline-none"
            placeholder="***********"
            required
          />
          </div>
      
       <div className ="w-full h-full lg:px-[22px]  mb-5 mt-5 bg-primary  flex justify-center  ">
       <button
          type="submit"
          className="bg-transparent border-none py-[25.96px]  outline-none text-white "
        >
          Continue
        </button>
       </div>
        
      </form>
      
      {/*  */}
      <p className=" text-center">Already have an account? <Link href="./signIn" className="underline text-blue-600">Signin</Link></p>
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



     




    </>
    );
    };
    export default SignUpPage;