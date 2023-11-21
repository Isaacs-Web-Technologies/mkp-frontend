import MKP1 from "@/public/svgs/mkpLogo1";
import { AiOutlineUser} from "react-icons/ai";
import { TbCursorText } from "react-icons/tb";
import Markdown from 'react-markdown';

const Message = (props) => {
  const { message } = props;
  const { role, content: text } = message;

  const isUser = role === "user";
  return (
    <div 
      className={`group w-full text-gray-800 dark:text-gray-100 border-b border-black/10 dark:border-gray-900/50 ${
        isUser ? "" : "" 
      }`}
    >
      {/* implement dark theme in above div */}
      <div className={`text-base gap-4 md:gap-1 md:max-w-2xl lg:max-w-xl xl:max-w-3xl flex lg:px-0 w-full m-auto ${isUser ? "flex-row-reverse" : "flex-row"}`}>
        <div className="w-8 flex flex-col relative items-end">
          {/* chat avatar */}
          <div className="relative h-7 w-5 p-1 rounded-sm text-white flex items-center justify-center bg-black/75 text-opacity-100">
            {isUser ? (
              <AiOutlineUser className="h-4 w-4 text-white ml-0" />
            ) : (
             
              <MKP1 className="h-4 w-4 mr-0" />
            )}
          </div>
          {/* what do these buttons do? */}
          {/* <div className="text-xs flex items-center justify-center gap-1 absolute left-0 top-2 -ml-4 -translate-x-full group-hover:visible !invisible">
            <button
              disabled
              className="text-gray-300 dark:text-gray-400"
            ></button>
            <span className="flex-grow flex-shrink-0">1 / 1</span>
            <button
              disabled
              className="text-gray-300 dark:text-gray-400"
            ></button>
          </div> */}
        </div>
        <div className="relative flex w-[calc(100%-50px)] flex-col gap-1 md:gap-3 lg:w-[calc(100%-115px)]">
          {/* chat bubble */}
          <div className="flex flex-grow flex-col m-0 p-0">
            <div className={` rounded-lg ${isUser ? "bg-primary text-white right-0 p-2 mr-0 mt-4 mb-4 ml-8" : "bg-primary/10 text-black left-0 p-2 ml-0 mt-4 mb-4 "} min-h-20 flex flex-col items-end  whitespace-pre-wrap break-words`}>
              <div className="markdown prose w-full break-words">
                {!isUser && text === null ? (
                  <TbCursorText className="h-6 w-6 animate-pulse" />
                ) : (
                  <Markdown>{text}</Markdown>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Message;