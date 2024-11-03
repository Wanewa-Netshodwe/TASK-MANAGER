import React from 'react'

type Props = {
    children?:JSX.Element,
    className?:string,
    isRight?:boolean
}

export default function Sidebar({children,className,isRight}: Props) {
  return (
    <div className={`bg-secondary w-[95%] md:w-[300px] h-[100%]  overflow-y-auto  md:h-[570px] ${className} ${isRight ? 'rounded-r-md ' : 'rounded-l-md' }`}>
            {children}
    </div>
  )
}