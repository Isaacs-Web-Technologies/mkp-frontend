'use client'
import { useEffect } from "react";

export const Footer = () => {
  useEffect(() => {
    const script = document.createElement('script')
    script.src = "https://s.pageclip.co/v1/pageclip.js" 
    script.async = true
    document.head.appendChild(script)
  
   })
  return (
    <footer className="mt-12 bg-gray py-16 text-left text-white font-poppins">
      <div className=" container mx-auto flex flex-wrap justify-between">
        <div className="w-full md:w-1/4"> 
          <ul className="text-sm list-none">
          <h3 className="text-lg font-semibold mb-3">Recipes</h3>
            <li>Quick and Easy</li>
            <li>In the Kitchen</li>
            <li>Holiday and Seasons</li>
          </ul>
          </div>
          <div className="w-full md:w-1/4">
          
          <ul className="text-sm list-none">
          <h3 className="text-lg font-semibold mb-3">Resources</h3>
            <li>About Us</li>
            <li>Terms of Service</li>
            <li>How it works</li>
            <li>Privacy Policy</li>
            <li>Contact Us</li>
          </ul>
        </div>
        <div className="w-full md:w-1/4">
          <ul className="text-sm list-none">
            <h3 className="text-lg font-semibold mb-3">Other</h3>
            <li>Careers</li>
            <li>Webinars & events</li>
            <li>Our partners</li>
            <li>Cookies policy</li>
          </ul>
        </div>
        <div className="w-full md:w-1/4">
          <h3 className="text-lg font-semibold mb-3">Ready to have fun in the kitchen?</h3>
          <p>Sign Up for weekly Newletter</p>
          <form className="flex items-center text-white mt-4 w-full" action="https://send.pageclip.co/cKYu7vrVW902wDLXW3XiPih1r0xgQjYG" class="pageclip-form" method="post">
            <input
              type="email" 
              name="email"
              placeholder="Enter your email"
              className="bg-gray border-2 border-pink-300 p-4  w-full"
            />
             <button className="pageclip-form__submit bg-pink-200 text-brown w-full px-0.5 pt-4 border-none ml-2 pb-4 font-bold">Sign Up</button>
           </form>

        </div>
      </div>
      <div className="text-center text-xs mt-8">
        © 2023 Mykitchenpower All Rights Reserved. | Terms of Service
      </div>
    </footer>
  );
};