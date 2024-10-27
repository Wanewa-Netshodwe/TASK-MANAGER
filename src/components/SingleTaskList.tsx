import { faAdd, faCaretDown, faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import Tasks from './Tasks.tsx'

type Props = {}

export default function SingleTaskList({}: Props) {
  return (
    <div className='relative'>
        <div className="bg-[#bba9d1] w-full md:w-[280px] min-h-[150px] rounded-md overflow-hidden">
            <div className="flex flex-wrap md:gap-3 h-11 bg-purple-900 justify-start items-center">
                <p style={{fontFamily:'Poppins'}}className=' w-[140px] h-8 mt-3 mx-2 px-4 text-[13px] text-[#c6c3c9]'>
                    Text Title
                </p>
                <div className="flex gap-1 justify-end items-center">
                <FontAwesomeIcon className=' w-3 text-[#c6c3c9] h-3 rounded-full p-2 hover:bg-purple-800' icon={faPen}></FontAwesomeIcon>
                <FontAwesomeIcon className=' w-3 text-[#c6c3c9] h-3 rounded-full p-2 hover:bg-purple-800' icon={faTrash}></FontAwesomeIcon>
                <FontAwesomeIcon className=' w-4 text-[#c6c3c9] h-4 rounded-full p-2 hover:bg-purple-800' icon={faCaretDown}></FontAwesomeIcon>
                </div>
            </div>
            <Tasks/>
        </div>
        <FontAwesomeIcon className='absolute -bottom-[12px] -left-2 bg-purple-600 hover:bg-purple-800 text-white w-5  h-5 rounded-full p-2' icon={faAdd}></FontAwesomeIcon>

    </div>
  )
} 