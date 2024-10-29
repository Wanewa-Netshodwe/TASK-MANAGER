import { IconProp } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

type Props = {
    size?:string,
    iconName:IconProp,
    className?:string,
    onClick?:()=>void,
    loading?:boolean,
    onHover?:boolean,
    ping?:boolean,
    iconSize?:string,
}

export default function CustomIcon({size,iconName,className,onClick,loading,onHover,iconSize='20',ping}: Props) {
  return (
    <div className='relative inline-block'>
        
    <div aria-disabled={loading} onClick={onClick} className={`${className} flex relative items-center justify-center rounded-full size-12 bg-purple-600
     hover:bg-opacity-50 ${loading ? 'cursor-wait':'cursor-pointer'}
    
    `}>
        <FontAwesomeIcon  className={`text-gray-200 text-[23px]`} icon={iconName}/>
    </div>
    {ping && <>
        <span className="absolute flex h-3 w-3">
  <span className="animate-ping absolute -top-12 left-9 inline-flex h-4 w-4 rounded-full bg-red-500"></span>
  <span className=" absolute -top-12 left-9 inline-flex h-4 w-4 rounded-full bg-red-500"></span>
</span>
    </>}
   
    </div>
  )
}