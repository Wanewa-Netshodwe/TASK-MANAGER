import React from 'react'
import SingleTaskList from '../components/SingleTaskList.tsx'

type Props = {}

export default function Dashboard({}: Props) {
  return (
    <div className='p-6 flex flex-wrap justify-center gap-10'>
      <SingleTaskList></SingleTaskList>
      <SingleTaskList></SingleTaskList>
      <SingleTaskList></SingleTaskList>
      <SingleTaskList></SingleTaskList>
      <SingleTaskList></SingleTaskList>
      <SingleTaskList></SingleTaskList>
      <SingleTaskList></SingleTaskList>
      </div>
  )
}