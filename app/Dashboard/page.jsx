'use client';
import React, { useEffect, useState } from "react";
import Chat from "@/components/User/chat/chat";
import MobileSiderbar from "@/components/User/chat/mobileSidebar";
import Sidebar from "@/components/User/chat/sidebar";
import { useLoggedInUser } from "@/components/auth";
import { useDispatch } from "react-redux";
import { getAllThreads } from "@/redux/chatSlice";

export default function Dashboard() {
  const [isComponentVisible, setIsComponentVisible] = useState(false);
  const loggedIn = useLoggedInUser();
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(`logged in: ${loggedIn}`)
    if (!loggedIn) return;
    dispatch(getAllThreads());
  }, [loggedIn])

  const toggleComponentVisibility = () => {
    setIsComponentVisible(!isComponentVisible);
  };

  return (
    <main className="overflow-hidden w-full h-screen relative flex">
      {isComponentVisible ? (
        <MobileSiderbar toggleComponentVisibility={toggleComponentVisibility} />
      ) : null}
      <div className="dark hidden flex-shrink bg-primary md:flex md:w-[260px] md:flex-col">
        <div className="flex h-full flex-shrink-0 min-h-0 flex-col ">
          <Sidebar />
        </div>
      
      </div>
      <Chat toggleComponentVisibility={toggleComponentVisibility} />
      
      

      
    </main>
  );
}
