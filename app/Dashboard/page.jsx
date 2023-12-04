'use client';
import React, { useEffect, useState } from "react";
import Chat from "@/components/User/chat/chat";
import MobileSiderbar from "@/components/User/chat/mobileSidebar";
import Sidebar from "@/components/User/chat/sidebar";
import { useLoggedInUser } from "@/components/auth";
import { useDispatch } from "react-redux";
import { getAllThreads } from "@/redux/chatSlice";

export default function Dashboard() {
  const loggedIn = useLoggedInUser();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!loggedIn) return;
    dispatch(getAllThreads());
  }, [loggedIn])



  return (
    <main className="overflow-hidden w-full h-screen relative flex">
      <MobileSiderbar />
      <Sidebar  />
      <Chat  />
    </main>
  );
}

