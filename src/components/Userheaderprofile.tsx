import React from 'react'
import { userType } from '../Types'

type Props = {
    user?: userType,
    onClick?:()=>void,
    chatinfo?:boolean,
    className?:string
}

export default function Userheaderprofile({user,onClick,chatinfo,className}: Props) {
  return (
    <div className={`flex gap-3 justify-center ${className} items-center`}>

    <div className='h-[30px] w-[30px] lg:w-[30px] cursor-pointer relative' onClick={onClick}>
        <img src={user?.img} className='w-full h-full ld:w-full rounded-2xl ring-2 ring-purple-300  ' alt="avator img" />
        <span className={`absolute flex h-2 w-2 top-0 ring-2 ring-white left-6 ${user?.isOnline ? 'bg-green-500' : 'bg-gray-600' } rounded-full`}></span>
    </div>
    <div className='hidden md:block w-[170px]'>
        <div style={{fontFamily:'Poppins'}} className='text-gray-200 text-[10px]'>{user?.username}</div>
        <div style={{fontFamily:'Poppins'}} className='text-gray-200 text-[10px]'>{chatinfo ?`last seen : ${user?.last_seen}`  : `joined in ${user?.creation_Time}`  }</div>
    </div>
    </div>
    
  )
}