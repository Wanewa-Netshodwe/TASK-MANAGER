import React from 'react'
import Task from './Task.tsx'

type Props = {}

export default function Tasks({}: Props) {
  return (
    <div className='p-2 '>
        <Task></Task>
    </div>
  )
}