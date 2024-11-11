import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar.tsx'
import Users from './Users.tsx'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store.ts'
import { setChatTab, setCurrentSelectedChat } from '../redux/chatSlice.ts'
import Chats from './Chats.tsx'
import { BE_getAllUsers, BE_getCharts, createdChat } from '../backend/Queries.ts'
import FlipMove from 'react-flip-move'
import ChatsProfile from './ChatsProfile.tsx'
import { defaultUser } from '../redux/userSlice.ts'

type Props = {
  className?:string
}


export default function Leftsidebar({className}: Props) {

  const dispatch= useDispatch<AppDispatch>()

    let ischat = useSelector((state:RootState) =>state.chat.ischatTab)
    let users = useSelector((state:RootState)=>state.user.users)
    let chats = useSelector((state:RootState)=>state.chat.chats)
    // let usersloading = useSelector((state:RootState)=>state.user.usersloading)
   
  return (
    <div className={`${className}`}>
        <Sidebar>
          <div>
          <div className="flex  ">
                <p onClick={()=>{dispatch(setChatTab(true))}} style={{fontFamily:'Poppins'}} className={` text-gray-200 hover:bg-gray-200 ${ischat &&  'bg-purple-700 text-gray-200 '} hover:text-gray-900  cursor-pointer flex-1 p-4 text-center `}>Chats</p>
                <p onClick={()=>{dispatch(setChatTab(false)); dispatch(setCurrentSelectedChat(defaultUser))}} style={{fontFamily:'Poppins'}}  className={` text-gray-200 hover:bg-gray-200 hover:text-gray-900 ${!ischat &&  'bg-purple-700 text-gray-100 '} cursor-pointer flex-1 p-4 text-center`} >Users</p>
            </div>
            {ischat ?  (
    <div>
{chats.length > 0 ? (
            chats.map(c => <ChatsProfile key={c.id} userId={createdChat(c.senderId) ? c.recieverId : c.senderId} chat={c} />)
        ) : (
            <h1 className='text-white p-2 text-[12px] font-mono'>no chats found Select A User to start a convo</h1>
        )}
</div>

) : (
    <FlipMove>
        {users.length > 0 ? (
            users.map(u => <Users key={u.id} user={u} />)
        ) : (
            <h1 className='text-white p-2 text-[12px] font-mono'>no users found invite ur colleagues to join the chat</h1>
        )}
    </FlipMove>
)}
          </div>
           
           
        </Sidebar>
    </div>
  )
}