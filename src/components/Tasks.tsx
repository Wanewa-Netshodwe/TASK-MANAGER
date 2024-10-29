import React from 'react'
import Task from './Task.tsx'
import { taskListType, taskType } from '../Types.ts'
import FlipMove from 'react-flip-move'

type Props = {
  tasklist:taskListType
}

export default function Tasks({tasklist}: Props) {
  return (
    <FlipMove className='p-2 relative'>
        {tasklist.tasks?.map( t =><Task task={t} key={t.id} ></Task>)}
        
    </FlipMove>
  )
}