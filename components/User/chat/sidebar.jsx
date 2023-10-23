import AxiosInstance from "@/components/axiosInstance";
import { useEffect } from "react";
import {
  AiOutlineMessage,
  AiOutlinePlus,
  AiOutlineUser,
  AiOutlineSetting,
} from "react-icons/ai";
import { BiLinkExternal } from "react-icons/bi";
import { FiMessageSquare } from "react-icons/fi";
import { MdLogout } from "react-icons/md";
import { useSelector, useDispatch } from 'react-redux';
import { useRouter } from "next/navigation";


const handleLogout = async (router) => {
  try {
    router.push('/signIn');
    const response = await AxiosInstance.post('/auth/logout');
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

const ChatThread = ({ title, id }) => {
  const dispatch = useDispatch();
  return (
    <a className="flex py-3 px-3 items-center gap-3 relative rounded-md hover:bg-[#2A2B32] cursor-pointer break-all hover:pr-4 group" onClick={() => {
      AxiosInstance.get(`/chat/all?thread_id=${id}`).then(response => {
        const chats = response.data.chats;
        const messages = chats.map(chat => ({
          content: chat.content,
          id: chat.id,
          sender: chat.chat_type == 'RESPONSE' ? 'ai' : 'user'
        }));
        dispatch(openThread({thread_id: id, messages: messages}))
      })
    }}>
      <FiMessageSquare className="h-4 w-4" />
      <div className="flex-1 text-ellipsis max-h-5 overflow-hidden break-all relative">
        {title}
        <div className="absolute inset-y-0 right-0 w-8 z-10 bg-gradient-to-l from-gray-900 group-hover:from-[#2A2B32]"></div>
      </div>
    </a>
  )
}

const Sidebar = () => {
  const threads = useSelector(state => state.chat.threads);
  const dispatch = useDispatch();
  console.log("threads value:", threads);

  useEffect(() => {
    console.log("threads value:", threads);
    AxiosInstance.get(`/chat/threads`).then(response => {
      if (response.status !== 200) throw new Error(response.statusText);
      const threads = response.data.threads;
      const allThreads = [{id: null, messages: [], title: "New Thread"}];
      console.log("threads: ", threads);
      dispatch(setThreads(threads.map(thread => ({
          id: thread.id,
          title: thread.title,
          messages: []
      }))));
    });
  }, []);
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
        <a className="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm">
          <AiOutlineMessage className="h-4 w-4" />
          Clear conversations
        </a>
        <a className="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-gray-500/10 transition-colors duration-200 text-white cursor-pointer text-sm">
          <AiOutlineUser className="h-4 w-4" />
          My plan
        </a>
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
            handleLogout(router);
          }}>
          <MdLogout className="h-4 w-4" />
          Log out
        </a>
      </nav>
    </div>
  );
};


export default Sidebar;
