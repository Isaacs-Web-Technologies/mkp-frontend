'use client'
import { useState } from "react";
import { AiOutlineMenu,AiOutlineClose } from 'react-icons/ai';
import Link from "next/link";
import MKP from '@/public/svgs/mkpLogo'

 export const Navbar = () => {
  
  const [isHamburgerActive, setIsHamburgerActive] = useState(false);

  const handleHamburgerClick = () => {
    setIsHamburgerActive(!isHamburgerActive);
  };

  return (
<header className="bg-white left-0 text-slate-800 w-full ease-in duration-300 fixed top-0 z-10">
   <nav className="h-[60px]  md:w-auto  mx-auto flex justify-between items-center px-5 ">
      
      <div className=" cursor-pointer lg:w-20 md:w-10 sm:w-5" onClick={handleHamburgerClick}>
      <MKP />
      </div>
      
     {/* larger screen navigation */}
     <ul
    className="hidden md:flex list-none font-semibold  text-1xl lg:text-[20px]  "
  >
      <li>
        <Link  className="mr-4 lg:mr-8 text-black hover:text-[#ff007b] no-underline " href="/">Recipes </Link>
      </li>
      <li>
        <Link className="mr-4 lg:mr-8 text-black hover:text-[#ff007b] no-underline " href="/">Popular </Link>
      </li>
      <li>
        <Link className="mr-4 lg:mr-8 text-black hover:text-[#ff007b] no-underline " href="/">Cuisine </Link>
      </li>
      <li>
        <Link className="mr-4 lg:mr-8 text-black hover:text-[#ff007b] no-underline " href="/">Kitchen Tips</Link>
      </li>
      <li >
        <Link className=" text-black hover:text-[#ff007b] no-underline " href="/">About Us </Link>
      </li>
     
     </ul>

    <div  className="hidden md:flex ">
      <div className="flex">

    <Link  href="./signIn" className="md:mr-0 md:ml-0 mr-5 md:px-3 px-8 py-2 text-black hover:text-[#ff007b] font-bold">Login
    </Link>

    <Link href="./signUp">
      <button className="md:mr-1 mr-5 md:px4 px-6 py-2 text-white rounded-md bg-primary font-bold">Sign up</button>
    </Link>
    </div>
    </div> 
  
      {/* smaller screen navigation-icons */}
      <div onClick={handleHamburgerClick} className="flex md:hidden">
        
        { isHamburgerActive ? 
        (<AiOutlineClose size={30} color="black" />) 
        :
        (<AiOutlineMenu size={30} color="black" />) }
        
      </div>
      {/* smaller screen navigation */}
      <div className={isHamburgerActive ?   
      `md:hidden absolute top-[60px] right-0 bottom-0 left-0 flex justify-center items-center w-full h-screen bg-primary text-white text-center ease-in duration-300` 
      : 
      `md:hidden absolute top-[60px] right-0 left-[-100%] flex justify-center items-center w-full h-screen bg-primary  text-white text-center ease-in duration-300 text-center'                                                                           `
      
    }>
      {/* smaller screen nav links */}
      <div className="w-full">

        <ul className="font-bold  text-2xl list-none">
          <li onClick={handleHamburgerClick} className="py-4 ">
         <Link className = " text-white no-underline  hover:text-pink-500 cursor-pointer" href= "/">
         Recipes
         </Link>
          </li>
          <li onClick={handleHamburgerClick} className="py-5 ">
         <Link className = " text-white no-underline hover:text-pink-500 cursor-pointer" href= "/">
         Popular
         </Link>
          </li>
          <li onClick={handleHamburgerClick} className="py-5 ">
         <Link className = " text-white no-underline hover:text-pink-500 cursor-pointer" href= "/">
         Cuisine
         </Link>
          </li>
          <li onClick={handleHamburgerClick} className="py-5 ">
         <Link className = " text-white no-underline hover:text-pink-500 cursor-pointer" href= "/">
         Kitchen Tips
         </Link>
          </li>
          <li onClick={handleHamburgerClick} className="py-5 ">
         <Link className = " text-white no-underline hover:text-pink-500 cursor-pointer" href= "/">
         About us
         </Link>
          </li>
        </ul>

        <div className="flex flex-col justify-center items-center mt-16">
        
        <Link href="/signIn" onClick={handleHamburgerClick}>
          <button className=" px-6 py-2 text-black rounded-md  bg-outline font-bold mb-5">Login</button>
        </Link>
        <Link href="/signUp" onClick={handleHamburgerClick}>
          <button className=" px-6 py-2 text-black rounded-md  bg-outline font-bold mb-5">Sign Up</button>
        </Link>
        </div>
      </div>
      
      </div>
   </nav>
</header>
   
  );
};






