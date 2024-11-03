import React, { useEffect, useState } from 'react'
import { chatType, userType } from '../Types'
import { getUserInfo } from '../backend/Queries.ts'
import Chats from './Chats.tsx'
import { setCurrentSelectedChat } from '../redux/chatSlice.ts'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from '../redux/store.ts'

type Props = {
    userId?:string,
    chat:chatType
}

export default function ChatsProfile({userId,chat}: Props) {
    const currentSelectedChat = useSelector((state:RootState)=> state.chat.currentselectedChat)
    
    const[user,setusr] = useState<userType>()
    const[selected,setselected] = useState(false)
    const dispatcher = useDispatch()
  const handleChatclick=()=>{
        dispatcher(setCurrentSelectedChat(
          {
            ...user,
            senderTorecieverMsgCount:chat.senderTorecieverMsgCount,
            recieverTosenderMsgCount:chat.recieverTosenderMsgCount,
            chatId:chat.id
        
          }
        ))
  }
    useEffect(()=>{
        const get = async() =>{
            if(userId) {
                const usr = await getUserInfo(userId)
                setusr(usr)
            }
        }
        get()
    },[userId])
  return (
    <div className=' cursor-pointer' onClick={()=>{handleChatclick()}} ><Chats selected={userId === currentSelectedChat.id } chat={chat}   user={user} /></div>
  )
}