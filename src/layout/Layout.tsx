import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../components/Header.tsx'
type Props = {}

export default function Layout({}: Props) {
  return (
    <div className='bg-background flex flex-col w-screen h-screen'>
        <Header/>
        <Outlet/>
    </div>
    
  )
}