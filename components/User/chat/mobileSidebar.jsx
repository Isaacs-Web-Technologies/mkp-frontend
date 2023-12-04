import { IoMdClose } from "react-icons/io";
import { RxHamburgerMenu } from "react-icons/rx";
import { BsChevronDown, BsPlusLg } from "react-icons/bs";
import { startNewThread } from '@/redux/chatSlice';
import Sidebar from "./sidebar";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';

const MobileSiderbar = () => {
  const dispatch = useDispatch();
  const activeThreadId = useSelector(state => state.chat.activeThreadId);
  const activeThread = useSelector(state => state.chat.threads.find(t => t.id === activeThreadId));
  const [isSidebarVisible, setSidebarVisible] = useState(false);

  const handleToggleSidebar = () => {
    setSidebarVisible(!isSidebarVisible);
  };

  useEffect(() => {
    if (activeThread === undefined) {
      dispatch(startNewThread());
    }
  }, []);

  useEffect(() => {
    // Set initial sidebar visibility based on screen width
    const handleResize = () => {
      setSidebarVisible(window.innerWidth > 768);
    };

    window.addEventListener("resize", handleResize);
    handleResize(); // Trigger on component mount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="inset-0 z-40 md:hidden mb-0">
      {isSidebarVisible && (
        <div className="fixed inset-0 z-40 flex">
          <Sidebar onClose={handleToggleSidebar} isMobileSidebarVisible={isSidebarVisible} />
          <button
            type="button"
            onClick={handleToggleSidebar}
            className="close-button mt-0 flex h-10 w-10
            items-center justify-center rounded-md bg-primary hover:bg-red cursor-pointer focus:outline-none
            focus:ring-2 border-none"
          >
            <IoMdClose className="h-6 w-6 text-red hover:text-black" />
          </button>
        </div>
      )}

      {!isSidebarVisible && (
        <div className="absolute z-40 flex items-center w-full">
          <div className="flex items-start justify-start ml-1">
            {window.innerWidth <= 768 && (
              <button
                type="button"
                onClick={handleToggleSidebar}
                className="hamburger-button mt-0.2 flex h-10 w-10 items-center justify-center rounded-md bg-primary hover:bg-red cursor-pointer focus:outline-none focus:ring-2 border-none"
              >
                <RxHamburgerMenu className="h-6 w-6 text-red hover:text-black" />
              </button>
            )}
          </div>
          <h1 className="text-center flex-1 text-base font-normal"></h1>
          <div className="flex items-end justify-end ml-auto mr-1">
            <button
              type="button"
              className="h-10 w-10 mt-0.2 items-end justify-end rounded-md bg-primary hover:bg-primary/10 cursor-pointer focus:outline-none
              focus:ring-2 border-none"
              onClick={() => {
                dispatch(startNewThread());
              }}
            >
              <BsPlusLg className="h-6 w-6 text-red hover:text-black" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileSiderbar;
