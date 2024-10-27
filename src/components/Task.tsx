import { faPen, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'

type Props = {}

export default function Task({}: Props) {
  return (
    <div className=' bg-gray-300 drop-shadow-sm hover:drop-shadow-md p-2 mb-2 rounded-md'>
        <div>
            <p style={{fontFamily:'Poppins'}} className='text-[12px] text-gray-700 mb-1'>i will do it at 9H00</p>
        </div>
        <div>
            <hr />
            <p style={{fontFamily:'Poppins'}} className='text-[11px] text-gray-600 mb-1' >some description</p>
            <div className='flex justify-end items-center '>
            <FontAwesomeIcon className=' w-3 text-slate-900 h-4 rounded-full p-2 ' icon={faPen}></FontAwesomeIcon>
            <FontAwesomeIcon className=' w-3 text-slate-900 h-4 rounded-full p-2 ' icon={faTrash}></FontAwesomeIcon>
            </div>
        </div>
    </div>
  )
}