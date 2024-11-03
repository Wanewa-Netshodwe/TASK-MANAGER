import React, { useState } from 'react'
import Button from './Button.tsx'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store.ts'
import { setAlert } from '../redux/userSlice.ts'
import { BE_startChart } from '../backend/Queries.ts'

type Props = {}

export default function Alert({}: Props) {
  const [startloading,setstartloading] = useState(false)
  const handleStartChart=()=>{
    if(receiverId && recieverName)
    BE_startChart(dispatch,setstartloading,receiverId,recieverName)
  }
  const dispatch =useDispatch<AppDispatch>()
  const {open,recieverName,receiverId} = useSelector((state:RootState)=>state.user.isAlertOpen)
  return (
    <div className='w-[100vw] absolute h-[100vh] bg-black bg-opacity-60 z-50 '>
      <div className="flex w-full h-full justify-center relative ">
                <div className='absolute top-80  p-5 rounded-md z-50 flex-col bg-primary w-fit h-fit '>
                    <h1 style={{fontFamily:'Poppins'}} className='mb-6 text-white'>{`Your about to start a chat with ${recieverName}`}  </h1>
                    <div className='  flex'>
                      <Button loading={startloading} onClick={()=>{ handleStartChart()}} s='hover:bg-purple-700' name='Sure'/><Button  onClick={()=>{dispatch(setAlert({open:false}))}} s='hover:bg-purple-700' name='Cancel'/>
                    </div>
                </div>
      </div>

    </div>
  )
}