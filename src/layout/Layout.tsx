import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header.tsx'
import Alert from '../components/Alert.tsx'
import { useSelector } from 'react-redux'
import { RootState } from '../redux/store.ts'
type Props = {}

export default function Layout({}: Props) {
  const alert = useSelector((state:RootState)=>state.user.isAlertOpen.open)
  return (
    <div className='overflow-hidden bg-primary flex flex-col min-w-[100vw] w-full min-h-[100vh] h-full'>
        <Header/>
        <Outlet/>
        {alert && <Alert/>}
        
    </div>
    
  )
}