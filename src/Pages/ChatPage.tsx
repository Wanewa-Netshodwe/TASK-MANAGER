import React from 'react'
import Leftsidebar from '../components/LeftSidebar.tsx'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store.ts'
import ChatArea from '../components/ChatArea.tsx'
import RightSidebar from '../components/RightSidebar.tsx'

type Props = {}

export default function ChatPage({}: Props) {

  const currentSelectedChat = useSelector((state:RootState)=>state.chat.currentselectedChat)
  const toggleusers = useSelector((state:RootState)=>state.user.toggleUsers)
  return (
    <div className='mt-3 flex ' >
     <Leftsidebar className={`${toggleusers ? '' : '-translate-x-full'}  z-10 md:translate-x-0`}/>
     {currentSelectedChat.id ? 
     <>
     <ChatArea className={`-translate-x-[260px] md:translate-x-0 flex-1 p-2 `}/>
     <RightSidebar className='' />
     </>
     
     : <h1 style={{fontFamily: 'Poppins'}}  className='p-3 text-white'>No Chat Selected</h1>}

      </div>
  )
}