'use client';
import React, { useEffect, useState } from "react";
import Chat from "@/components/User/chat/chat";
import MobileSiderbar from "@/components/User/chat/mobileSidebar";
import Sidebar from "@/components/User/chat/sidebar";
import History from "@/components/User/history/history";

export default function Dashboard() {
  const [isComponentVisible, setIsComponentVisible] = useState(false);


  const toggleComponentVisibility = () => {
    setIsComponentVisible(!isComponentVisible);
  };

  return (
    <main className="overflow-hidden w-full h-screen relative flex">
      {isComponentVisible ? (
        <MobileSiderbar toggleComponentVisibility={toggleComponentVisibility} />
      ) : null}
      <div className="dark hidden flex-shrink-0 bg-gray-900 md:flex md:w-[260px] md:flex-col">
        <div className="flex h-full min-h-0 flex-col ">
          <Sidebar />
        </div>
      
      </div>
      <History className="sm:hidden md: hidden" />
      <Chat toggleComponentVisibility={toggleComponentVisibility} />
      
      

      
    </main>
  );
}
