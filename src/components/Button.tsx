import React from 'react'
import Spinner from './Spinner.tsx'

type Props = {
    name:string,
    onClick?:(e:any)=>void,
    s?:string,
    loading?:boolean
}

export default function Button({name,onClick,s,loading}: Props) {
  return (
     <button style={{fontFamily:'Poppins'}} onClick={onClick} className={`flex gap-3 justify-center items-center text-center  text-gray-200 text-[14px] w-full ${s}  p-1 rounded-lg bg-btncolor`}>{loading ? <><Spinner/>{name}</>: name }</button>
  )
}