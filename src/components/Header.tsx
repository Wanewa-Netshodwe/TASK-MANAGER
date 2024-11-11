import React, { useEffect, useState } from 'react'
import Input from './Input.tsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAdd, faDoorOpen, faList, faMessage, faUser } from '@fortawesome/free-solid-svg-icons'
import Button from './Button.tsx'
import CustomIcon from './CustomIcon.tsx'
import Userheaderprofile from './Userheaderprofile.tsx'
import {useDispatch, useSelector} from 'react-redux'
import { RootState } from '../redux/store.ts'
import { Link, useNavigate } from 'react-router-dom'
import MyIcon from './Icon.tsx'
import { BE_addTask, BE_addTaskList, BE_getAllUsers, BE_getCharts, BE_signout, createdChat, getUserid } from '../backend/Queries.ts'
import Spinner from './Spinner.tsx'
import { chatType } from '../Types.ts'
type Props = {}


export default function Header({}: Props) {
  useEffect(()=>{
    const get =async()=>{
          await BE_getCharts(dispatch)
          await BE_getAllUsers(dispatch)
    }
    get()
      },[])
  const handlePageChange=(page:string)=>{
    goto(`/dashboard/${page}`)
    setCurrentPage(page)
  }
  const setCurrentPage =(page:string)=>{
        localStorage.setItem('page',`${page}`)
  }
  const getCurrentPage =()=>{
    return localStorage.getItem('page')
  }
  const [newTaskloading,setnewTaskloading] = useState(false)
  const [signoutloading,setsignoutloading] = useState(false)
  const handleAddTask = ()=>{
    BE_addTaskList(dispatch,setnewTaskloading)
  }
  const dispatch = useDispatch()
  const goto = useNavigate()
  const handleSignOut = async()=>{
     BE_signout(dispatch,goto,setsignoutloading)
  }
  const [sender,setSender] =useState(false)
  
  const currentUser = useSelector((state:RootState) => state.user.currentUser)
  const chat = useSelector((state:RootState) => state.chat.chats)
  const chatselected = useSelector((state:RootState) => state.chat.currentselectedChat)
  const [currentChat,setCurrentChat] = useState<chatType>() 
 
  useEffect(()=>{
    if(!currentUser.id){
      goto('')
    }
   chat.map(c =>{
          if(c.id === chatselected.id)
          setSender(createdChat(c.id))
        setCurrentChat(c)
    })
    setSender(getUserid()===currentChat?.senderId)
    
  },[goto,currentUser,chat,chatselected])
 
  
  
  return (
    <div className=' bg-secondary flex items-center z-30  justify-between md:py-2 flex-row '>
        <div className='bg-transparent p-3 md:px-6 flex gap-3 items-center ' onClick={()=>{handlePageChange('')}}>
          <FontAwesomeIcon className='text-[30px]  text-purple-200 cursor-pointer' icon={faMessage} />
         <h2  style={{fontFamily:'Poppins'}} className=' text-gray-200 text-[20px]'>Collab</h2>
         </div>
         <div className="flex px-3 gap-3 justify-center items-center">
          {
            getCurrentPage() === 'profile' ?
             (<><CustomIcon  ping={sender ? currentChat?.recieverTosenderMsgCount ? currentChat.recieverTosenderMsgCount >0 : false : !sender ?  currentChat?.senderTorecieverMsgCount ? currentChat.senderTorecieverMsgCount >0 : false :false }  size='30' iconSize='18' onClick={()=>{handlePageChange('chat')}} iconName={faMessage}></CustomIcon>
             <CustomIcon   size='30' iconSize='18' onClick={()=>{handlePageChange('')}} iconName={faList}></CustomIcon>
          </>) :  getCurrentPage() === 'chat' ? <>
           <CustomIcon   size='30' iconSize='18' onClick={()=>{handlePageChange('')}} iconName={faList}></CustomIcon>
          </> : <>
          <Button name='add new list board' loading={newTaskloading} onClick={()=>{handleAddTask()}} s={'hidden md:flex bg-purple-600 px-3   text-white  hover:bg-opacity-50 hover:text-grey-50'}></Button> 
          <CustomIcon loading={newTaskloading}  onClick={()=>{handleAddTask()}}  className='md:hidden' size='50' iconName={faAdd}></CustomIcon>
          
          <CustomIcon  ping={sender ? currentChat?.recieverTosenderMsgCount ? currentChat.recieverTosenderMsgCount >0 : false : !sender ?  currentChat?.senderTorecieverMsgCount ? currentChat.senderTorecieverMsgCount >0 : false :false }    size='30' iconSize='18' onClick={()=>{handlePageChange('chat')}} iconName={faMessage}></CustomIcon>
          <CustomIcon   size='30' iconSize='28' onClick={()=>{handlePageChange('')}} iconName={faList}></CustomIcon>
          </>

          }
          
          
          <div className="group relative  hover:cursor-pointer">
          <Userheaderprofile profile user={currentUser}/>
          <div className='hidden group-hover:block absolute pt-5 right-[2px] md:left-0 w-fit  '>
              <ul className='bg-secondary rounded-sm shadow-sm shadow-gray-700'>
            <p style={{fontFamily:'Poppins'}} onClick={()=>{handlePageChange('profile')}} className='  px-3 flex justify-start gap-2 py-2 items-center text-white text-[15px] hover:bg-purple-600 '><FontAwesomeIcon className='text-[12px]' icon={faUser} />Profile</p>
            <p onClick={()=>{handleSignOut()}} style={{fontFamily:'Poppins'}} className='px-3 flex justify-start gap-2 py-2 items-center text-white text-[15px] hover:bg-purple-600 ' > <FontAwesomeIcon className='text-[12px]' icon={faDoorOpen} />  Log Out {signoutloading ? <Spinner/> : null} </p>
          
              </ul>
          </div>
          

          </div>
          
         </div>
    </div>
  )
}