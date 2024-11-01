import React from 'react'

type Props = {
    children?:JSX.Element,
    className?:string,
    isRight?:boolean
}

export default function Sidebar({children,className,isRight}: Props) {
  return (
    <div className={`bg-secondary w-[80%] md:w-[300px]  overflow-hidden  h-[500px] ${className} ${isRight ? 'rounded-r-md ' : 'rounded-l-md' }`}>
            {children}
    </div>
  )
}