'use client'
import { useEffect, useState } from "react";
import {
  AiOutlinePlus,
  AiOutlineSetting,
  AiOutlineCheckCircle,
  AiOutlineArrowLeft,
  AiOutlineArrowRight
} from "react-icons/ai";
import {
  deleteThread,
  startNewThread,
  editThreadTitle,
  getMessages
} from '@/redux/chatSlice';
import { RiDeleteBin6Line } from "react-icons/ri";
import { GiCancel } from "react-icons/gi";
import { BiLinkExternal } from "react-icons/bi";
import { FiMessageSquare, FiEdit2 } from "react-icons/fi";
import { MdLogout } from "react-icons/md";
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from "next/navigation";
import { performLogout } from "@/components/auth";
import Link from "next/link";



const ChatThread = ({ title, id, onClose }) => {
  const dispatch = useDispatch();
  const isActive = useSelector(state => state.chat.activeThreadId === id);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const style = {};
  if (isActive) {
    style.backgroundColor = "rgba(243,235,231,0.1)";
  }

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedTitle(title);
  }

  const handleDeleteClick = () => {
    dispatch(deleteThread({ thread_id: id }));
  }

  const handleSaveClick = () => {
    if (editedTitle !== title) {
      setIsEditing(false);
      dispatch(editThreadTitle({ thread_id: id, title: editedTitle }));
    }
  };

  const handleClick = () => {
    dispatch(getMessages({ thread_id: id }));

    if (onClose) {
      onClose();
    }
  };

  return (
    <a className="flex py-3 px-3 items-center gap-3 relative rounded-md
     hover:bg-red/10  cursor-pointer break-all hover:pr-4 group"
      style={style}
      onClick={handleClick}>
      <FiMessageSquare className="h-4 w-4" />
      {isEditing ? (
        <input
          type="text"
          value={editedTitle}
          onChange={(e) => setEditedTitle(e.target.value)}
          style={{ maxWidth: "65%" }}
          className="rounded-lg border-none"
        />
      ) : (
        <div style={{ maxWidth: "65%" }} className="flex-1 text-ellipsis max-h-5 
        overflow-hidden break-all relative">
          {title}
        </div>
      )}
      <div className="absolute inset-y-3 right-0 w-8 z-10 pr-1">
        {isActive && (isEditing ? (
          <>
            <AiOutlineCheckCircle onClick={handleSaveClick} />
            <GiCancel onClick={handleCancelClick} />
          </>
        ) : (
          <>
            <FiEdit2 onClick={handleEditClick} />
            <RiDeleteBin6Line onClick={handleDeleteClick} />
          </>
        ))}
      </div>
    </a>
  )
}

const Sidebar = ({ onClose, isMobileSidebarVisible }) => {
  const [isSidebarClosed, setSidebarClosed] = useState(false);
  const [windowWidth, setWindowWidth] = useState(0);
  const threads = useSelector(state => state.chat.threads);
  const router = useRouter();
  const dispatch = useDispatch();
  const [displayWidth, setDisplayWidth] = useState(0);

  const toggleSidebar = () => {
    setSidebarClosed(!isSidebarClosed);
  };

  const handleOverlayClick = () => {
    if (onClose) {
      onClose();
    }
  };

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

  const handleItemClick = (action) => {
    action();
    if (onClose) {
      onClose();
    }
  };

  // const [showSettings, setShowSettings] = useState(false);

  // const handleSettingsClick = () => {
  //   setShowSettings(!showSettings);
  // };

  return (
    <nav className={`sidebar overflow-hidden min-h-0 h-full flex-col space-y-1 p-0 flex-shrink h-100vh items-start bg-primary border-white/20 
    ${!isSidebarClosed ? 'w-14' : 'w-60'} 
    ${isMobileSidebarVisible ? 'block' : 'hidden'} md:flex-col`}
    >
      {windowWidth > 768 && (
        <div className="toggle-button" onClick={toggleSidebar}>
          {isSidebarClosed ? <AiOutlineArrowRight /> : <AiOutlineArrowLeft />}
        </div>
      )}

      {!isSidebarClosed && (
        <div className="sidebar-overlay" onClick={handleOverlayClick}></div>
      )}
      <a className="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-red/10 transition-colors duration-200 text-white cursor-pointer text-sm mb-1 flex-shrink-0 border border-white/20"
        onClick={() => handleItemClick(() => dispatch(startNewThread()))}>
        <AiOutlinePlus className="h-4 w-4" />
        New chat
      </a>

      <div className="recipeHx flex-col flex-1  border-b border-white/20">
        <div className="flex flex-col gap-2 pb-2  text-white  text-sm">
          {[...threads].filter(t => t.id !== null).sort((a, b) => b.id - a.id).map(thread => (
            <ChatThread
              key={thread.id}
              title={thread.title}
              id={thread.id}
              onClose={onClose}
            />
          ))}
        </div>
      </div>
      <div className="fixed top-[70%] mt-5 "
        style={{ width: '14rem', transition: 'width 0.3s' }}>
        <hr className="h-px mb-4 bg-red/10 border-0" />

        <Link href="/Settings"
          className="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-red/10 transition-colors duration-200 text-white cursor-pointer text-sm">
          <AiOutlineSetting className="h-4 w-4" />
          Settings
        </Link>
        <a
          href="https://forms.gle/SpRoNBwSgCddYQXB9"
          target="_blank"
          className="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-red/10 transition-colors duration-200
           text-white cursor-pointer text-sm"
        >
          <BiLinkExternal className="h-4 w-4" />
          Feedback
        </a>
        <a className="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-red/10 transition-colors duration-200 text-white cursor-pointer text-sm"
          href="/" onClick={(e) => {
            e.preventDefault();
            performLogout().then(() => {
              router.push('/signIn');
            });
          }}>
          <MdLogout className="h-4 w-4" />
          Log out
        </a>
      </div>
    </nav>
  );
};


export default Sidebar;
export { ChatThread };
