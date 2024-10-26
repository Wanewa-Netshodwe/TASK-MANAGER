import React from 'react'

type Props = {
    name:string,
    onClick?:(e:any)=>void,
    s?:string
}

export default function Button({name,onClick,s}: Props) {
  return (
    <button style={{fontFamily:'Poppins'}} onClick={onClick} className={`text-center  text-gray-200 text-[14px] w-full ${s}  p-1 rounded-lg bg-btncolor`}>{name}</button>
  )
}