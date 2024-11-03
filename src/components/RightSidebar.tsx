import React from 'react'
import Sidebar from './Sidebar.tsx'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store.ts'
type Prop={
    className?:string
}
export default function RightSidebar({className}:Prop) {
    const currentSelectedChat = useSelector((state:RootState)=>state.chat.currentselectedChat)
  return (
    <div className={`hidden md:block ${className}`}>
        <Sidebar isRight>
            <div className='flex flex-col gap-3'>
            <div className='bg-gray-300 w-full text-center h-14'>
            <p style={{fontFamily:'Poppins'}} className='p-3 text-center text-gray-700 text-[25px]'>{currentSelectedChat.username.toUpperCase()}</p>
        </div>
        <div className='size-40 mx-auto relative'>
            <img className='w-full h-full ring-2  ring-white rounded-full'  src={currentSelectedChat.img} alt="userimage" />
            <span className={`absolute flex h-5 w-5 top-0 ring-2 ring-white right-6 ${currentSelectedChat.isOnline ? 'bg-green-500' : 'bg-gray-600' } rounded-full`}></span>
        </div>
        <div className='mt-2 flex justify-start gap-2 px-4'>
            <span className='text-gray-400'>Username : </span><p>{currentSelectedChat.username}</p>
        </div>
        <div className='mt-2 flex justify-start gap-2 px-4'>
            <span className='text-gray-400'>email : </span><p>{currentSelectedChat.email}</p>
        </div>
        <div className='mt-2 flex justify-start gap-2 px-4'>
            <span className='text-gray-400'>Joined in : </span><p>{currentSelectedChat.creation_Time}</p>
        </div>
        <div className='mt-2 flex justify-start gap-2 px-4'>
            <span className='text-gray-400'>Last seen : </span><p>{currentSelectedChat.last_seen}</p>
        </div>
        <div className='mt-2 flex justify-start gap-2 px-4'>
            <span className='text-gray-400'>bio : </span><p>{currentSelectedChat.bio}</p>
        </div>

            </div>
       
        </Sidebar>
    </div>
  )
}