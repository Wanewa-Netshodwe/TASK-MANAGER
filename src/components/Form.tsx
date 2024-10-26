import React,{useState} from 'react'
import Input from './Input.tsx'
import { faEnvelope, faLock, faMailBulk, faUser } from '@fortawesome/free-solid-svg-icons'
import Button from './Button.tsx'
type Props = {
  login?:boolean,
  s?:string
}


export default function Form({login,s}:Props) {
   
  return (
    <div className={`mx-auto w-full ${s}  bg-formbg
    p-5 md:w-[330px] md:rounded-sm
    
    `} >
      {!login && <><label style={{fontFamily:'Poppins'}}  className='text-[10px] ml-2  text-gray-200'>Enter Email</label>  <Input iconClass={faEnvelope} name='Email' type='email'></Input> </>}
      <label style={{fontFamily:'Poppins'}}  className='text-[10px] ml-2  text-gray-200'  text-gray-200>Username</label>
      <Input iconClass={faUser} name='Username'></Input>
      <label style={{fontFamily:'Poppins'}}  className='text-[10px] ml-2  text-gray-200'>Password</label>
      <Input iconClass={faLock} s='mb-5'  type='password' name='Password '></Input>
      {login ? <Button name='Login'></Button> : <Button name='Register '></Button>}

    </div>
  )
}
