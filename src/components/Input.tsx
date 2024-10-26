import React from 'react'
import MyIcon from './Icon.tsx'
import { IconProp } from '@fortawesome/fontawesome-svg-core'
type Props = {
    name:string,
    iconClass:IconProp,
    type?:string,
    value?:string,
    s?:string,
    onChange?:(e:any)=>void
}

export default function Input({name,iconClass,type,s,onChange,value}: Props) {
  return (
    <div className={`flex  items-center  m-2 ${s}`}>
       <style>
        {`
          input::placeholder {
            font-family: 'Poppins';
            
          
          }
        `}
      </style>
       <MyIcon  iconName={iconClass}/> <input style={{fontFamily:'Poppins'}} onChange={onChange} value={value}  className='rounded-tr-md rounded-br-md bg-transparent placeholder:text-[11px]
        text-[11px] p-[5px] border-l-0 text-gray-200 placeholder:text-white border-2 border-gray-600 focus:outline-none w-full  '  type={type} placeholder={`Enter ${name}`}/>
    </div>
    
  )
}