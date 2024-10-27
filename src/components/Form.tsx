import React,{useState} from 'react'
import Input from './Input.tsx'
import { faEnvelope, faLock, faUser } from '@fortawesome/free-solid-svg-icons'
import Button from './Button.tsx'
import { BE_signup ,BE_login} from '../backend/Queries.ts'
import { useNavigate } from 'react-router-dom'
import {useDispatch} from 'react-redux'
import { AppDispatch } from '../redux/store.ts'
type Props = {
  login?:boolean,
  s?:string
}


export default function Form({login,s}:Props) {
   const [username,setUsername] = useState('')
   const [password,setPassword] = useState('')
   const [email,setEmail] = useState('')
   const [signupLoading,setSignupLoading] = useState(false)
   const dispatch = useDispatch<AppDispatch>()
   const goTo=useNavigate()
   const resetForm=()=>{
      setPassword('')
      setUsername('')
      setPassword('')
   }
   const handleSignup=()=>{
    const data={
      email,
      username,
      password
    }
    BE_signup(data,setSignupLoading,resetForm,goTo,dispatch)
    }
    const handleLogin=()=>{
      const data={
        username,
        password
      }
      BE_login(data,setSignupLoading,resetForm,goTo,dispatch)
      }
  return (
    <div className={`mx-auto w-full ${s}  bg-formbg
    p-5 md:w-[330px] md:rounded-sm
    
    `} >
      {!login && <><label style={{fontFamily:'Poppins'}}  className='text-[10px] ml-2  text-gray-200'>Enter Email</label>  <Input value={email} onChange={(e)=>{setEmail(e.target.value)}} iconClass={faEnvelope} name='Email' type='email'></Input> </>}
      <label style={{fontFamily:'Poppins'}}  className='text-[10px] ml-2  text-gray-200'>Username</label>
      <Input value={username} onChange={(e)=>{setUsername(e.target.value)}} iconClass={faUser} name='Username'></Input>
      <label style={{fontFamily:'Poppins'}}  className='text-[10px] ml-2  text-gray-200'>Password</label>
      <Input value={password} onChange={(e)=>{setPassword(e.target.value)}} iconClass={faLock} s='mb-5'  type='password' name='Password '></Input>
      {login ? <Button s='flex'  loading={signupLoading} onClick={()=>{handleLogin()}} name='Login'></Button> : <Button s='flex' onClick={()=>{handleSignup()}} loading={signupLoading} name='Register '></Button>}

    </div>
  )
}
