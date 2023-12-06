'use client';
import React, { useEffect, useRef, useState } from "react";
import { FiSend } from "react-icons/fi";
import Message from "@/components/User/chat/messages";
import { useDispatch, useSelector } from 'react-redux';
import { sendMessage, startNewThread } from '@/redux/chatSlice';
// import {MKPLogo} from "@/public/images/mkpLogo.png"


const Chat = (props) => {
  const { handleToggleSidebar } = props;
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


  const [displayWidth, setDisplayWidth] = useState(0);
  useEffect(() => {
    setDisplayWidth(window.innerWidth);

    const handleResize = () => {
      setDisplayWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleCardClick = (messageText) => {
    setmessage(messageText);
    dispatch(sendMessage({ message: messageText, thread_id: activeThreadId }));
    setmessage('');
  };

  return (
    <div className="flex max-w-full flex-1 h-100vh flex-col container mt-0 border border-black/10 rounded-md shadow-[0_0_10px_rgba(0,0,0,0.10)]">


      <div className="relative  w-full transition-width flex flex-col overflow-hidden items-stretch flex-1">
        {/* chat container */}

        <div className="react-scroll-to-bottom--css-ikyem-1n7m0yu" ref={messageListRef}>
          {messages.length > 0 ? (
            messages.map(message => (
              <Message key={message.id} message={{ role: message.sender, content: message.content }} />
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
                  <div className="card" onClick={() => handleCardClick("Give me kid-friendly snacks")}
                    style={{ display: displayWidth <= 600 ? 'none' : 'block' }} >
                    <p className="typewriter">Give me kid-friendly snacks</p>
                  </div>
                  <div className="card" onClick={() => handleCardClick("How do I cook banga soup?")}
                    style={{ display: displayWidth <= 600 ? 'none' : 'block' }}>
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


