import React,{useEffect, useState} from 'react'
import Form from '../components/Form.tsx'
import MyIcon from '../components/Icon.tsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMessage } from '@fortawesome/free-solid-svg-icons'
import { setUser } from '../redux/userSlice.ts'
import { useDispatch } from 'react-redux'
import { AppDispatch } from '../redux/store.ts'
import { userType } from '../Types.ts'
import { useNavigate } from 'react-router-dom'
type Props = {}

export default function LoginPage() {
  const dispatch = useDispatch<AppDispatch>()
  const goto = useNavigate()
  const [signup,setSignup] =useState(true)
  const currentUser =JSON.parse(localStorage.getItem('user') || '{}')
  useEffect(()=>{
    if(currentUser.id){
       dispatch(setUser(currentUser))
       goto('/dashboard')
    }
  },[])
  return (
    <div className=' bg-background w-[100vw] h-[100vh]'>
         <div className='p-[45px] pb-10 flex justify-center gap-2 items-center' >
          <FontAwesomeIcon className='text-[35px]  text-purple-200' icon={faMessage} />
         <h2  style={{fontFamily:'Poppins'}} className=' text-gray-200'>Collab</h2>
         </div>
         {signup ? <p style={{fontFamily:'Poppins'}} className='text-center text-gray-200 text-[15px] '>Sign in</p> : <p style={{fontFamily:'Poppins'}} className='text-center text-gray-200 text-[15px] '>Register</p>}
         {signup ? <p style={{fontFamily:'Poppins'}} className='text-center p-1 pb-6 text-gray-500 text-[11px]'>Sign in to continue to Collab</p> : <p style={{fontFamily:'Poppins'}} className='text-center p-1 pb-6 text-gray-500 text-[11px]'>get your Collab account now</p>}
         
         
        {signup ? <Form login s='h-[240px]'></Form> : <Form s='h-[300px]'></Form>}
        
        {signup ? <p style={{fontFamily:'Poppins'}} className='text-center pt-6 pb-6 text-gray-200 text-[11px]'>Don't have an account ? <span onClick={()=>{setSignup(false)}} className='text-purple-400 cursor-pointer'>Signup now</span></p>: <p style={{fontFamily:'Poppins'}} className='text-center pt-6 pb-6 text-gray-200 text-[11px]'>Already have an account ? <span onClick={()=>{setSignup(true)}} className='text-purple-400 cursor-pointer'>Signin</span></p>}
         
        
        
    </div>
  )
}