'use client'
import { useState } from "react";
import {NavLinks} from "../navbar/NavLinks";
import {HamburgerMenu }from "../navbar/hamburgerMenu";
import Link from "next/link";
import Image from "next/image";
import MKP from '@/public/svgs/mkpLogo'

 export const Navbar = () => {
  const [showLinks, setShowLinks] = useState(false);
  const [isHamburgerActive, setIsHamburgerActive] = useState(false);

  const handleHamburgerClick = () => {
    setIsHamburgerActive(!isHamburgerActive);
    setShowLinks(!showLinks);
  };

  return (
    <header className="bg-white">

   <nav className="flex justify-between items-center w-[92%]  mx-auto">
      <div className="w-16 cursor-pointer">
      <MKP />
      </div>
      <div  className="nav-links duration-500 md:static absolute bg-white md:min-h-fit min-h-[60vh] left-0 top-[-100%] md:w-auto  w-full flex items-center px-5">
      <NavLinks showLinks={true} />
      </div>

      <div className="flex items-center gap-6">
      <Link href="./signIn" className=" px-5 py-2 ">Login</Link>
      <Link href="./signUp"><button className="px-5 py-2  text-white rounded-md bg-primary ">Sign up</button></Link>
      </div>

  

      <div className="md:hidden">
      <HamburgerMenu isActive={isHamburgerActive} onClick={handleHamburgerClick} />
        <div
          className={`  absolute top-16 right-4  bg-white p-4 shadow-md ${
            isHamburgerActive ? "block" : "hidden"
          }`}
        >
          <NavLinks showLinks={isHamburgerActive} />
         
        </div>
      </div>
    </nav>
    </header>
   
  );
};






