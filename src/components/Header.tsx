import React from 'react'
import Input from './Input.tsx'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMessage } from '@fortawesome/free-solid-svg-icons'
import Button from './Button.tsx'
type Props = {}

export default function Header({}: Props) {
  return (
    <div className='bg-formbg flex items-center py-2 justify-between md:py-2 flex-col md:flex-row'>
        <div className='bg-transparent p-3 md:p-2 flex gap-2 items-center ' >
          <FontAwesomeIcon className='text-[25px]  text-purple-200 cursor-pointer' icon={faMessage} />
         <h2  style={{fontFamily:'Poppins'}} className=' text-gray-200'>Collab</h2>
         </div>
         <div className="flex px-3">
         <Button name='add New List Board' s={'bg-transparent border-2 border-grey-50 hover:bg-gray-50 hover:text-gray-900'}></Button>
         
         </div>
    </div>
  )
}