import React, { useEffect, useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFaceSmile, faMicrophone, faPaperPlane, faUsers } from '@fortawesome/free-solid-svg-icons'
import EmojiPicker from 'emoji-picker-react'
import { AudioRecorder } from 'react-audio-voice-recorder';
import { BE_getMessages, BE_sendMsg, createdChat } from '../backend/Queries.ts';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { messageType } from '../Types';
import Spinner from './Spinner.tsx'
import FlipMove from 'react-flip-move'
import { setToggle } from '../redux/userSlice.ts';
type Props = {
  className?:string
}

export default function ChatArea({className}: Props) {
  const [msg,setmsg]=useState('')
  const dispatch = useDispatch()
  const [showemoji,setshowemoji]=useState(false)
  const [sendloading,setsendloading] =useState(false)
  const [messagesloading,setmessagesloading] =useState(false)
  const currentSelectedChat = useSelector((state:RootState)=> state.chat.currentselectedChat)
  const messages = useSelector((state:RootState)=> state.chat.currentMessages)
  useEffect(()=>{
    const get = async()=>{
      if(currentSelectedChat.chatId)
        await  BE_getMessages(dispatch,currentSelectedChat.chatId,setmessagesloading)
    } 
    get()
  },[currentSelectedChat.id])
  const handlesendMessage=()=>{
    const message:messageType ={
      senderId:currentSelectedChat.id,
      content:msg,
    }
    if(msg.length !== 0){
      console.log(msg.length)
      if(currentSelectedChat.chatId)BE_sendMsg(currentSelectedChat.chatId,message,setsendloading)
    }
   
    
  }

  
  const handleEmojiClick = (e,emojiObject) => {
    setmsg(prevMsg => prevMsg + emojiObject) 
  }
  return (
    <div className={`${className}`}>
<div className={` -translate-x-2 min-h-[90vh] md:self-center md:w-[500px] md:min-h-[570px] justify-center p-2 flex flex-col overflow-hidden  gap-3`}>
      <div className='  h-[500px] overflow-y-auto '>
      <FlipMove className='flex p-2  flex-col   gap-4' >
      
      {messages.length > 0 ? (
        
    messages.map(msg =>
        createdChat(msg.senderId) ? (
            <div key={msg.id} className='flex self-end bg-secondary w-fit p-3 rounded-l-lg rounded-tr-lg '>
                <p style={{fontFamily: 'Poppins'}} className='text-white text-[13px] max-w-40'>{msg.content}</p>
            </div>
        ) : (
            <div key={msg.id} className='flex self-start bg-gray-200 w-fit p-3 rounded-tl-lg rounded-r-lg'>
                <p style={{fontFamily: 'Poppins'}} className='text-secondary text-[13px]  max-w-48'>{msg.content}</p>
            </div>
        )
    )
) 

: (
    <><h1 style={{fontFamily: 'Poppins'}}  className='p-2 text-white'>No Messages Yet</h1></>
)}



      </FlipMove>

      </div>
    
      <div className='flex flex-row  items-center gap-2 md:gap-4'>
      <div className='mt-2 border flex-1 rounded-full p-1 flex gap-5 items-center bg-gray-200'>

<FontAwesomeIcon onClick={()=>{setshowemoji(!showemoji)}} className='text-secondary text-[22px] px-2' icon ={faFaceSmile} />
<input value={msg} onChange={(e)=>{setmsg(e.target.value)}} type="text" style={{fontFamily:'Poppins'}}  placeholder='Enter Text ' className='flex-1 border outline-none border-none  text-[14px] p-2 bg-transparent ' />
<FontAwesomeIcon onClick={()=>{dispatch(setToggle())}} className=' md:hidden text-secondary  text-[22px] px-2' icon ={faUsers} />

</div>
<div className='flex justify-center items-center p-3 rounded-full bg-purple-700 '>
  {sendloading ? <Spinner/> : <FontAwesomeIcon onClick={()=>{handlesendMessage()}}  className='text-gray-100  text-[22px]' icon ={faPaperPlane} /> }

</div>

      </div>
      {showemoji && <> <div className='absolute bottom-[140px]  w-fit h-fit'>
    <EmojiPicker onEmojiClick={(e)=>{handleEmojiClick(e,e.emoji)}} skinTonesDisabled searchDisabled width={300} height={300} open={true}/>
    </div></> }
   
   
    </div>
    </div>
    
  )
}