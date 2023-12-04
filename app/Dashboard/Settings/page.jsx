'use client';
import { deleteAllThreads } from '@/redux/chatSlice';
import {AiOutlineMessage } from "react-icons/ai";
import { useDispatch} from 'react-redux';
import { Sidebar } from 'lucide-react';


const Settings = () => {
    const dispatch = useDispatch();

  return (
    <div>
        <Sidebar />
        <h1>
          Settings  
        </h1>
        <a className="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-red/10 transition-colors duration-200
        text-black cursor-pointer text-sm" 
       onClick={() => {
          dispatch(deleteAllThreads())
        }}>
          <AiOutlineMessage className="h-4 w-4" />
          Delete all recipes
        </a>
    </div>
  )
}

export default Settings