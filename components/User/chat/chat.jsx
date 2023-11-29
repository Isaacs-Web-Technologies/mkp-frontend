'use client';
import React, { useEffect, useRef, useState } from "react";
import { FiSend } from "react-icons/fi";
import { BsChevronDown, BsPlusLg } from "react-icons/bs";
import { RxHamburgerMenu } from "react-icons/rx";
import Message from "@/components/User/chat/messages";
import { useDispatch, useSelector } from 'react-redux';
import { sendMessage, startNewThread } from '@/redux/chatSlice';
import { ChatThread } from "./sidebar";
// import {MKPLogo} from "@/public/images/mkpLogo.png"


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
    
  const handleCardClick =(messageText)=> {
    setmessage(messageText);
    dispatch(sendMessage({message: messageText,thread_id: activeThreadId }));
    setmessage('');
  };

  return (
    <div className="flex max-w-full flex-1 h-100vh flex-col container  border border-black/10 rounded-md shadow-[0_0_10px_rgba(0,0,0,0.10)]">
      {/* hamburger menu for smaller screens and new chat */}
      <div className="sticky top-0 z-10 flex items-center border-b  pl-1 pt-1 text-white-200 sm:pl-3 md:hidden">
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
         
          <div>
            <div className="px-3  justify-center pt-2 pb-3 text-center text-xs md:px-4 md:pt-3 md:pb-6">  
          {/* <div className="flex justify-center">
                    <img
                        src="/public/images/mkpLogo.png"
                        alt="MKP Logo" 
                       className="w-10 h-10 floatingImage"
                    />
                </div> */}
              <span>
                  <h1>My Kitchen Power</h1>
              </span>
              <span>
                  <p>Your kitchen assistant at your service</p>
              </span>
              <div className="cardContainer">
              <div className="card" onClick={() => handleCardClick("How to make pizza?")}>
                  <p className="typewriter">How to make pizza?</p>
              </div>
              <div className="card" onClick={() => handleCardClick("What to cook eba?")}>
                  <p className="typewriter">What to cook eba?</p>
              </div>
              <div className="card" onClick={()=> handleCardClick("Give me kid-friendly snacks")} >
                  <p className="typewriter">Give me kid-friendly snacks</p>
              </div>
              <div className="card" onClick={()=> handleCardClick("How do I cook banga soup?")}>
                  <p className="typewriter">How do I cook banga soup?</p>
              </div>
          </div>
           </div>
           </div>
          
     
        )}
    </div>
       {/* input area */}
       <div className=" bottom-0  w-full border-t md:border-t-0  md:border-transparent  md:bg-vert-light-gradient bg-white md:!bg-transparent pt-2">
          <form onSubmit={handleSubmit} className="stretch mx-2 flex flex-row gap-3 last:mb-2 md:mx-4 md:last:mb-6 lg:mx-auto lg:max-w-2xl xl:max-w-3xl">
            <div className="relative flex flex-col h-full flex-1 items-stretch md:flex-col">
              {errorMessage ? (
                <div className="mb-2 md:mb-0">
                  <div className="h-full flex ml-1 md:w-full md:m-auto md:mb-2 gap-0 md:gap-2 justify-center">
                    <span className="text-red-500 text-sm">{errorMessage}</span>
                  </div>
                </div>
              ) : null}
              <div className="flex flex-col w-full py-2 flex-grow md:py-3 md:pl-4 relative border border-white bg-primary  text-white  rounded-lg shadow-[0_0_10px_rgba(0,0,0,0.10)]">
                <textarea
                  value={message}
                  tabIndex={0}
                  data-id="root"
                  placeholder="hello what do you want to cook today?"
                  className="ChatTextArea"
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
                  className="sendButton"
                >
                  <FiSend className="h-4 w-4" />
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


