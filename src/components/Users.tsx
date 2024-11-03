import React, { forwardRef } from 'react'
import { userType } from '../Types'
import Userheaderprofile from './Userheaderprofile.tsx'
import { useDispatch } from 'react-redux'
import { setAlert } from '../redux/userSlice.ts'

type Props = {
  user:userType
}

const Users = forwardRef(({user}: Props,ref:React.LegacyRef<HTMLDivElement>) =>{
  const disptach = useDispatch()
  

  return (
    <div ref={ref}>
      <div className=' bg-primary w-[97%] rounded-md hover:bg-slate-900   m-1  p-4   flex justify-start'>
        <Userheaderprofile onClick={()=>{disptach(setAlert({open:true,receiverId:user.id,recieverName:user.username}))}} className='mt-2 ' chatinfo user={user}/>
      </div>
    </div>
  )
})
export default Users