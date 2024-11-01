import React from 'react'
import { userType } from '../Types'
import Userheaderprofile from './Userheaderprofile.tsx'
import { useDispatch } from 'react-redux'
import { setAlert } from '../redux/userSlice.ts'

type Props = {
  user:userType
}

export default function Users({user}: Props) {
  const disptach = useDispatch()

  return (
    <div>
      <div className=' bg-primary w-[97%] rounded-md hover:bg-slate-900   m-1  p-4   flex justify-start'>
        <Userheaderprofile onClick={()=>{disptach(setAlert(true))}} className='mt-2 ' chatinfo user={ user}/>
      </div>
    </div>
  )
}