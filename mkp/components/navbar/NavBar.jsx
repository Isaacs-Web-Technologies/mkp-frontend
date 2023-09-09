'use client'
import { useState } from "react";
import NavLinks from "../navbar/NavLinks";
import HamburgerMenu from "../navbar/hamburgerMenu";
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
    <nav className="NavBar w-full h-full relative bg-white">
      <div >
      <Image
    src="/public/svgs/mkpLogo.svg"
    width={30}
    height={30}
    alt="MyKitchenPower"
    className="absolute left-3"
  />
      </div>
      <div className="hidden md:inline lg:flex flex-row">
        <NavLinks showLinks={true} />
        <Link href="./signIn"><button className="ml-5 flex outline_btn">Login</button></Link>
        <Link href="./signUp"><button className="ml-2 flex   black_btn">Sign up</button></Link>
      </div>
      <div className="md:hidden">
      <HamburgerMenu isActive={isHamburgerActive} onClick={handleHamburgerClick} />
        <div
          className={`absolute top-16 right-4 bg-white p-4 shadow-md ${
            isHamburgerActive ? "block" : "hidden"
          }`}
        >
          <NavLinks showLinks={isHamburgerActive} />
          <ul>
            <li>
          
        <Link href="/login"><button className="LogIn absolute left-72 top-4 text-primary underline">Log in</button></Link>
      </li>
      <li>
     
        <Link href="/signUp"> <button className="SignUp text-whiteabsolute left-96 top-1/2 transform -translate-y-1/2 px-8 py-4 bg-primary rounded-lg flex items-center gap-10">Sign Up</button></Link>
      </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};






