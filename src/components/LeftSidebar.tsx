import React, { useEffect, useState } from 'react'
import Sidebar from './Sidebar.tsx'
import Users from './Users.tsx'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store.ts'
import { setChatTab } from '../redux/chatSlice.ts'
import Chats from './Chats.tsx'
import { BE_getAllUsers } from '../backend/Queries.ts'

type Props = {}


export default function Leftsidebar({}: Props) {
  useEffect(()=>{
const get =async()=>{
      BE_getAllUsers(dispatch,setusersloading)
}
get()
  },[])
  const dispatch= useDispatch<AppDispatch>()
  const [usersloading,setusersloading]=useState(true)
    let ischat = useSelector((state:RootState) =>state.chat.ischatTab)
    let users = useSelector((state:RootState)=>state.user.users)
    console.log(ischat)
  return (
    <div>
        <Sidebar>
          <div>
          <div className="flex  ">
                <p onClick={()=>{dispatch(setChatTab(true))}} style={{fontFamily:'Poppins'}} className={` text-gray-200 hover:bg-gray-200 ${ischat &&  'bg-purple-700 text-gray-200 '} hover:text-gray-900  cursor-pointer flex-1 p-4 text-center `}>Chats</p>
                <p onClick={()=>{dispatch(setChatTab(false))}} style={{fontFamily:'Poppins'}}  className={` text-gray-200 hover:bg-gray-200 hover:text-gray-900 ${!ischat &&  'bg-purple-700 text-gray-100 '} cursor-pointer flex-1 p-4 text-center`} >Users</p>
            </div>
            {ischat ? <Chats /> : 
            users.length >0 ? users.map(u=> <Users key={u.id} user={u}/> ) :
           <h1>no users found</h1>
           }
          </div>
           
           
        </Sidebar>
    </div>
  )
}