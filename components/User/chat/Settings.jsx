// 'use client';
// import { deleteAllThreads } from '@/redux/chatSlice';
// import {AiOutlineMessage } from "react-icons/ai";
// import { useDispatch} from 'react-redux';
// import  Sidebar  from "@/components/User/chat/sidebar" ;
// import MobileSiderbar from '@/components/User/chat/mobileSidebar';


// const Settings = () => {
//     const dispatch = useDispatch();

//   return (
//     <div className='justify-items-center'>
//         <Sidebar />
//         <MobileSiderbar />
//         <h1 className='justify-center text-center'>
//           Settings  
//         </h1>
//         <div className='container left-[55vh] '>
//         <a className="flex py-3 px-3 items-center gap-3 rounded-md hover:bg-red/10 transition-colors duration-200
//         text-black cursor-pointer text-sm" 
//        onClick={() => {
//           dispatch(deleteAllThreads())
//         }}>
//           <AiOutlineMessage className="h-4 w-4" />
//           Delete all recipes
//         </a>
//         </div>
       
//     </div>
//   )
// }

// export default Settings