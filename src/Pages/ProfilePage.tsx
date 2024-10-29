import React, { useState } from 'react'
import { userType } from '../Types'
import genStr from '../utils/GenerateString.ts'
import { error } from '../utils/toast.ts'
import { useNavigate } from 'react-router-dom'
import Spinner from '../components/Spinner.tsx'
import { BE_updateProfile, getUserid } from '../backend/Queries.ts'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store.ts'
const u = JSON.parse(localStorage.getItem('user') || '{}')


export default function ProfilePage() {
  const user = useSelector((state:RootState) =>state.user.currentUser)
  const dispatch = useDispatch<AppDispatch>()
  const goto = useNavigate()
  const[pic,setpic] = useState(user.img)
  const[username,setusername] = useState(user.username)
  const[email,setemail] = useState(user.email)
  const[bio,setbio] = useState(user.bio)
  const[loading,setloading] = useState(false)
  const saveinfo=()=>{
    if(username.length<1 || email.length<1){
      error('fill all fields')
    }else{
      BE_updateProfile(dispatch,setloading,goto,username,email,bio,pic,getUserid())
    }
  }
  const changePicture=()=>{
    setpic(genStr())

  }
  return (
    <div className='text-center overflow-hidden'>

      <div className='bg-transparent w-[390px] mx-auto justify-center items-center p-8  flex flex-col gap-2 overflow-hidden rounded-md'>
          <img onClick={()=>{changePicture()}} className='size-48 rounded-full'  src={pic} alt="userimage" />
          <p  style={{fontFamily:'Poppins'}} className='mt-2 text-gray-300'>Click on the image to change Profile pic </p>
          <input placeholder={u.username} style={{fontFamily:'Poppins'}} onChange={e=>{setusername(e.target.value)}} value={username} className='mt-3 bg-transparent border-2 w-[280px] placeholder:text-white border-gray-300 p-2  text-gray-200 rounded-md focus:outline-none' type="text" />

          <input placeholder={u.email}  style={{fontFamily:'Poppins'}} onChange={e=>{setemail(e.target.value)}} value={email} className='mt-3 bg-transparent border-2 w-[280px] placeholder:text-white border-gray-300 p-2 text-gray-200  rounded-md focus:outline-none' type="text" />


          <p  style={{fontFamily:'Poppins'}} className=' text-gray-300'>Bio </p>
          
          <textarea value={bio} onChange={e=>{setbio(e.target.value)}} style={{fontFamily:'Poppins'}} className=" mt-2 bg-transparent border-2 border-gray-300 w-[280px] p-2 text-white rounded-md focus:outline-none" >

          </textarea>
          <div className='mt-3 flex gap-12'>
            
            <button onClick={()=>{saveinfo()}} style={{fontFamily:'Poppins'}} className='p-2 px-7 rounded-md text-center  bg-purple-600 text-gray-100 ' >{loading ? <><div className='flex gap-2 justify-center items-center'>Save <Spinner/></div> </>: <>Save</>} </button> 
            <button style={{fontFamily:'Poppins'}}  onClick={()=>{goto('/')}} className='p-2 px-7 rounded-md text-center  bg-slate-100 text-gray-800'>Cancel</button>
          </div>


      </div>

    </div>
  )
}