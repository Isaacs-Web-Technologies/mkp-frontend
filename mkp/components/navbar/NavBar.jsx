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
<header className="bg-white  text-slate-800 w-full ease-in duration-300 fixed top-0 z-10">
   <nav className="h-[60px]  md:w-auto  max-w-[1366px] mx-auto flex justify-between items-center px-5 ">
      
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
      `md:hidden absolute right-0 bottom-0 left-0 flex justify-center items-center w-full h-screen bg-primary` 
      : 
      ``
      
    }>

      </div>
   </nav>
</header>
   
  );
};






