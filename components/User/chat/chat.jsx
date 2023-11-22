'use client';
import React, { useEffect, useRef, useState } from "react";
import { FiSend } from "react-icons/fi";
import { BsChevronDown, BsPlusLg } from "react-icons/bs";
import { RxHamburgerMenu } from "react-icons/rx";
import Message from "@/components/User/chat/messages";
import { useDispatch, useSelector } from 'react-redux';
import { sendMessage, startNewThread } from '@/redux/chatSlice';
import { ChatThread } from "./sidebar";



const Chat = (props) => {
  const {toggleComponentVisibility } = props;
  const [message, setmessage] = useState('');
  const dispatch = useDispatch();
  const [errorMessage, setErrorMessage] = useState("");
  const activeThreadId = useSelector(state => state.chat.activeThreadId);
  const activeThread = useSelector(state => state.chat.threads.find(t => t.id === activeThreadId));
  const messages = activeThread ? activeThread.messages : [];
  const messageListRef = useRef(null);

  useEffect(() => {
    messageListRef.current.scrollTop = messageListRef.current.scrollHeight;
  }, [messages]);
  
 
  useEffect(() => {
    if (activeThread === undefined) {
      dispatch(startNewThread());
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      dispatch(sendMessage({ message, thread_id: activeThreadId }));
      setmessage('');
    }
   
  };
    
  return (
    <div className="flex max-w-full flex-1 h-100dvh flex-col container  border border-black/10 dark:border-gray-900/50 dark:text-white dark:bg-gray-700 rounded-md shadow-[0_0_10px_rgba(0,0,0,0.10)] dark:shadow-[0_0_15px_rgba(0,0,0,0.10)] ">
      {/* hamburger menu for smaller screens and new chat */}
      <div className="sticky top-0 z-10 flex items-center border-b  pl-1 pt-1 text-gray-200 sm:pl-3 md:hidden">
        <button
          type="button"
          className="-ml-0.5 -mt-0.5 inline-flex h-10 w-10 items-center justify-center rounded-md bg-primary hover:bg-primary/10 cursor-pointer  focus:outline-none focus:ring-2 border-none"
          onClick={toggleComponentVisibility}
        >
          <span className="sr-only">Open sidebar</span>
          <RxHamburgerMenu className="h-6 w-6 text-red hover:text-black" />
        </button>
        <h1 className="flex-1 text-center text-base font-normal"></h1> {/* add chat thread title here later */}
        <button 
        type="button"
        className="mr-0.5 h-10 w-10 items-center justify-center rounded-md bg-primary hover:bg-primary/10 cursor-pointer focus:outline-none focus:ring-2 border-none"
        onClick={() => {
          dispatch(startNewThread())
        }}
        >
          <BsPlusLg className="h-6 w-6 text-red hover:text-black" />
        </button>
      </div>

      <div className="relative  w-full transition-width flex flex-col overflow-hidden items-stretch flex-1">
      {/* chat container */}
        
        <div className="react-scroll-to-bottom--css-ikyem-1n7m0yu" ref={messageListRef}>
        {messages.length > 0 ? (
            messages.map(message => (
                <Message key={message.id} message={{role: message.sender, content: message.content}} />
            ))
        ) : (
            <div className="py-10 relative w-full flex flex-col h-[5%]"> 
                <h1 className="text-2xl sm:text-4xl font-semibold text-center text-gray-200 dark:text-gray-600 flex gap-2 items-center justify-center h-[25%]">
                    My Kitchen Power
                </h1>
            </div>
        )}
        {/* <div className="flex flex-col items-center text-sm">
      </div> */}
    </div>
       {/* input area */}
       <div className=" bottom-0  w-full border-t md:border-t-0 dark:border-white/20 md:border-transparent md:dark:border-transparent md:bg-vert-light-gradient bg-white dark:bg-gray-800 md:!bg-transparent dark:md:bg-vert-dark-gradient pt-2">
          <form onSubmit={handleSubmit} className="stretch mx-2 flex flex-row gap-3 last:mb-2 md:mx-4 md:last:mb-6 lg:mx-auto lg:max-w-2xl xl:max-w-3xl">
            <div className="relative flex flex-col h-full flex-1 items-stretch md:flex-col">
              {errorMessage ? (
                <div className="mb-2 md:mb-0">
                  <div className="h-full flex ml-1 md:w-full md:m-auto md:mb-2 gap-0 md:gap-2 justify-center">
                    <span className="text-red-500 text-sm">{errorMessage}</span>
                  </div>
                </div>
              ) : null}
              <div className="flex flex-col w-full py-2 flex-grow md:py-3 md:pl-4 relative border border-black/10 bg-gray dark:border-gray-900/50 dark:text-white dark:bg-gray-700 rounded-md shadow-[0_0_10px_rgba(0,0,0,0.10)] dark:shadow-[0_0_15px_rgba(0,0,0,0.10)]">
                <textarea
                  value={message}
                  tabIndex={0}
                  data-id="root"
                  style={{
                    height: "28px",
                    maxHeight: "200px",
                    overflowY: "hidden",
                  }}
                  placeholder="Send a message..."
                  className="m-0 w-full resize-none text-white border-0 bg-transparent p-0 pr-7 focus:ring-0 focus-visible:ring-0 dark:bg-transparent pl-2 md:pl-0"
                  onChange={e => setmessage(e.target.value)}
                  onKeyDown={e => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      handleSubmit(e);
                      e.preventDefault();
                    }
                  }}>                   
                  </textarea>

                <button
                  onClick={handleSubmit}
                  className="absolute p-1 rounded-md bottom-1.5 md:bottom-2.5 bg-transparent disabled:bg-gray-500 right-1 md:right-2 disabled:opacity-40"
                >
                  <FiSend className="h-4 w-4 mr-1 text-white " />
                </button>
              </div>
            </div>
          </form>
          {/* footer */}
          <div className="px-3 pt-2 pb-3 text-center text-xs text-black/50 md:px-4 md:pt-3 md:pb-6">
            <span>
              My Kitchen Power Is Solely For Recipes.
            </span>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Chat;
