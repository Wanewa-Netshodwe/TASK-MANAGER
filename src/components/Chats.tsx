import React, { forwardRef } from 'react'
import { chatType, userType } from '../Types'
import Userheaderprofile from './Userheaderprofile.tsx'
import { createdChat, getUserid } from '../backend/Queries.ts'
import { useDispatch } from 'react-redux'
import { setCurrentSelectedChat } from '../redux/chatSlice.ts'

type Props = {
  user?:userType,
  selected?:boolean,
  lastMsg?:boolean,
  recieverToSenderCount?:number,
  senderToReciverCount?:number,
  chat:chatType
}

const Chats=forwardRef(({user,selected,chat,}: Props,ref:React.LegacyRef<HTMLDivElement>) =>{
  
  return (
    <div ref={ref}>
      <div  className={`  ${selected ? 'bg-slate-950' : 'bg-primary' }  w-[97%] rounded-md hover:bg-slate-900   m-1  p-4 items-center  flex justify-start`}>
        <Userheaderprofile isChatPage onClick={()=>{}}  lastMsg={chat.lastMsg} className='mt-2 '  user={user}/>
          {createdChat(chat.senderId) ? 
          <>{ chat.recieverTosenderMsgCount!! > 0 ? 
          <p className=' w-7 h-7 text-center bg-red-500 text-white rounded-full' >{chat.recieverTosenderMsgCount}</p> 
           : '' }</> 
          
          : <>
          { chat.senderTorecieverMsgCount!! > 0 ? 
          <p className=' w-7 h-7 text-center bg-red-500 text-white rounded-full' >{chat.senderTorecieverMsgCount}</p> 
           : '' }
          </> }
          
      </div>
    </div>
  )
})
export default Chats