import React from 'react'
import Button from './Button.tsx'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../redux/store.ts'
import { setAlert } from '../redux/userSlice.ts'

type Props = {}

export default function Alert({}: Props) {
  const dispatch =useDispatch<AppDispatch>()
  return (
    <div className='w-[100vw] absolute h-[100vh] bg-black bg-opacity-60 z-50 '>
      <div className="flex w-full h-full justify-center relative ">
                <div className='absolute top-80  p-5 rounded-md z-50 flex-col bg-primary w-fit h-fit '>
                    <h1 style={{fontFamily:'Poppins'}} className='mb-6 text-white'>Your about to star a chat with user </h1>
                    <div className='  flex'>
                      <Button onClick={()=>{dispatch(setAlert(false))}} s='hover:bg-purple-700' name='Sure'/><Button  onClick={()=>{dispatch(setAlert(false))}} s='hover:bg-purple-700' name='Cancel'/>
                    </div>
                </div>
      </div>

    </div>
  )
}