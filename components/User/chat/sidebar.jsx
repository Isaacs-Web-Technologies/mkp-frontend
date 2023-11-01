import AxiosInstance from "@/components/axiosInstance";
import { useEffect, useState } from "react";
import {
  AiOutlineMessage,
  AiOutlinePlus,
  AiOutlineSetting,
  AiOutlineCheckCircle,
} from "react-icons/ai";
import { RiDeleteBin6Line } from "react-icons/ri";
import { GiCancel } from "react-icons/gi";
import { BiLinkExternal } from "react-icons/bi";
import { FiMessageSquare, FiEdit2 } from "react-icons/fi";
import { MdLogout } from "react-icons/md";
import { useSelector, useDispatch } from 'react-redux';
import { deleteThread, startNewThread, editThreadTitle, getMessages, deleteAllThreads } from '@/redux/chatSlice';
import { useRouter } from "next/navigation";
import { performLogout } from "@/components/auth";

const ChatThread = ({ title, id }) => {
  const dispatch = useDispatch();
  const isActive = useSelector(state => state.chat.activeThreadId === id);
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(title);
  const style = {};
  if (isActive) {
    style.backgroundColor = "#faebd7e8";
  }

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
    setEditedTitle(title);
  }

  const handleDeleteClick = () => {
    dispatch(deleteThread({thread_id: id}));
  }

  const handleSaveClick = () => {
    if (editedTitle !== title) {
      setIsEditing(false);
      dispatch(editThreadTitle({thread_id: id, title: editedTitle}));
    }
  };

  return (
    <a className="flex py-3 px-3 items-center gap-3 relative rounded-md hover:bg-[#2A2B32] cursor-pointer break-all hover:pr-4 group" style={style} onClick={() => {
      dispatch(getMessages({thread_id: id}));
    }}>
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
        <div style={{maxWidth: "65%"}} className="flex-1 text-ellipsis max-h-5 overflow-hidden break-all relative">
          {title}
        </div>
      )}
      <div className="absolute inset-y-3 right-0 w-8 z-10 pr-1">
        {isActive && (isEditing ? (
          <>
          <AiOutlineCheckCircle onClick={handleSaveClick}/>
          <GiCancel onClick={handleCancelClick}/>
          </>
        ) : (
          <>
          <FiEdit2 onClick={handleEditClick}/>
          <RiDeleteBin6Line onClick={handleDeleteClick}/>
          </>
        ))}
      </div>
      {/* <div className="flex-1 text-ellipsis max-h-5 overflow-hidden break-all relative">
        {title}
        <div className="absolute inset-y-0 right-0 w-8 z-10 bg-gradient-to-l from-gray-900 group-hover:from-[#2A2B32]"></div>
      </div> */}
    </a>
  )
}

const Sidebar = () => {
  const threads = useSelector(state => state.chat.threads);
  const router = useRouter();
  const dispatch = useDispatch();

  return (
    <div className="scrollbar-trigger flex h-full w-full flex-1 items-start bg-primary border-white/20">
      <nav className="flex h-full flex-1 flex-col space-y-1 p-2">
        <a className="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-pink-500/10 transition-colors duration-200 text-white cursor-pointer text-sm mb-1 flex-shrink-0 border border-white/20"
          onClick={() => {
            dispatch(startNewThread());
          }}>
          <AiOutlinePlus className="h-4 w-4" />
          New chat
        </a>
        <div className="flex-col flex-1 overflow-y-auto border-b border-white/20">
          <div className="flex flex-col gap-2 pb-2 text-gray-100 text-sm">
            {threads.filter(t => t.id !== null).map(thread => (
              <ChatThread key={thread.id} title={thread.title} id={thread.id} />
            ))}
          </div>
        </div>
        <a className="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm" onClick={() => {
          dispatch(deleteAllThreads())
        }}>
          <AiOutlineMessage className="h-4 w-4" />
          Clear conversations
        </a>
        {/* <a className="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm">
          <AiOutlineUser className="h-4 w-4" />
          My plan
        </a> */}
        <a className="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm">
          <AiOutlineSetting className="h-4 w-4" />
          Settings
        </a>
        <a
          href="https://help.openai.com/en/collections/3742473-chatgpt"
          target="_blank"
          className="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm"
        >
          <BiLinkExternal className="h-4 w-4" />
          Get help
        </a>
        <a className="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm"
          href="/" onClick={(e) => {
            e.preventDefault();
            performLogout().then(() => {
              router.push('/signIn');
            });
          }}>
          <MdLogout className="h-4 w-4" />
          Log out
        </a>
      </nav>
    </div>
  );
};


export default Sidebar;
