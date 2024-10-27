import React from 'react'
import { userType } from '../Types'

type Props = {
    user?: userType,
    onClick?:()=>void
}

export default function Userheaderprofile({user,onClick}: Props) {
  return (
    <div className="flex justify-center items-center">

    <div className='h-[30px] w-[30px] lg:w-[40px] cursor-pointer relative' onClick={onClick}>
        <img src={user?.img} className='w-[30px] h-[30px] ld:w-[40px] rounded-2xl ring-2 ring-purple-300  ' alt="avator img" />
        <span className='absolute flex h-2 w-2 top-0 ring-2 ring-white left-6 bg-green-500 rounded-full'></span>
    </div>
    <div className='hidden md:block w-[170px]'>
        <div style={{fontFamily:'Poppins'}} className='text-gray-200 text-[9px]'>{user?.username}</div>
        <div style={{fontFamily:'Poppins'}} className='text-gray-200 text-[9px]'>{`joined in ${user?.creation_Time}`}</div>
    </div>
    </div>
    
  )
}