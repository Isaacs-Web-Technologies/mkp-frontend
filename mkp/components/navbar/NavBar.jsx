'use client'
import { useState } from "react";
import {NavLinks} from "../navbar/NavLinks";
import {HamburgerMenu }from "../navbar/hamburgerMenu";
import Link from "next/link";
import Image from "next/image";

 export const Navbar = () => {
  const [showLinks, setShowLinks] = useState(false);
  const [isHamburgerActive, setIsHamburgerActive] = useState(false);

  const handleHamburgerClick = () => {
    setIsHamburgerActive(!isHamburgerActive);
    setShowLinks(!showLinks);
  };

  return (
    <nav className="NavBar w-full h-full  bg-white">
      <div className="hidden md:inline lg:flex flex-row">
      <Image
    src="/public/svgs/mkpLogo.svg"
    width={30}
    height={30}
    alt="MyKitchenPower"
    className=" "
  />

        <NavLinks showLinks={true} />
      </div>

      <div className="md:hidden">
      <HamburgerMenu isActive={isHamburgerActive} onClick={handleHamburgerClick} />
        <div
          className={`  absolute top-16 right-4  bg-white p-4 shadow-md ${
            isHamburgerActive ? "block" : "hidden"
          }`}
        >
          <NavLinks showLinks={isHamburgerActive} />
          {/* <ul>
            <li>
          
        <Link href="/login"><button className="LogIn  left-72 top-4 text-primary underline">Log in</button></Link>
      </li>
      <li>
     
        <Link href="/signUp"> <button className="SignUp text-white absolute left-96 top-1/2 transform -translate-y-1/2 px-8 py-4 bg-primary rounded-lg flex items-center gap-10">Sign Up</button></Link>
      </li>
          </ul> */}
        </div>
      </div>
    </nav>
  );
};






