import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header.tsx'
type Props = {}

export default function Layout({}: Props) {
  return (
    <div className='bg-background flex flex-col min-w-[100vw] w-full min-h-[100vh] h-full'>
        <Header/>
        <Outlet/>
    </div>
    
  )
}