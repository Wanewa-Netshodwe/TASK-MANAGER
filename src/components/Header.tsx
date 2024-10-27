import React from 'react'
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
import { BE_signout } from '../backend/Queries.ts'
type Props = {}


export default function Header({}: Props) {
  const dispatch = useDispatch()
  const goto = useNavigate()
  const handleSignOut =()=>{
    BE_signout(dispatch,goto)
  }
  const currentUser = useSelector((state:RootState) => state.user.currentUser)
  return (
    <div className='bg-formbg flex items-center py-2 justify-between md:py-2 flex-row '>
        <div className='bg-transparent p-3 md:p-2 flex gap-2 items-center ' >
          <FontAwesomeIcon className='text-[25px]  text-purple-200 cursor-pointer' icon={faMessage} />
         <h2  style={{fontFamily:'Poppins'}} className=' text-gray-200'>Collab</h2>
         </div>
         <div className="flex px-3 gap-3 justify-center items-center">
         <Button name='add new list board' s={'bg-purple-600 px-3  text-white  hover:bg-opacity-50 hover:text-grey-50'}></Button>
          <CustomIcon  className='md:hidden' size='30' iconName={faAdd}></CustomIcon>
          <CustomIcon ping  size='30' iconSize='18' iconName={faMessage}></CustomIcon>
          <CustomIcon   size='30' iconSize='18' iconName={faList}></CustomIcon>
          <div className="group relative  hover:cursor-pointer">
          <Userheaderprofile user={currentUser}/>
          <div className='hidden group-hover:block absolute pt-5 w-[150px] '>
              <ul className='bg-purple-500 rounded-sm shadow-sm shadow-gray-700'>
            <p style={{fontFamily:'Poppins'}} className='  px-3 flex justify-start gap-2 py-2 items-center text-white text-[15px] hover:bg-purple-600 ' to="/profile"><FontAwesomeIcon className='text-[12px]' icon={faUser} />Profile</p>
            <p onClick={()=>{handleSignOut()}} style={{fontFamily:'Poppins'}} className='px-3 flex justify-start gap-2 py-2 items-center text-white text-[15px] hover:bg-purple-600 ' to="/profile"><FontAwesomeIcon className='text-[12px]' icon={faDoorOpen} />Log out</p>
          
              </ul>
          </div>
          

          </div>
          
         </div>
    </div>
  )
}