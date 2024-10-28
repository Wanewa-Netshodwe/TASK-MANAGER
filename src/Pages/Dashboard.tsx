import React, { useEffect, useState } from 'react'
import SingleTaskList from '../components/SingleTaskList.tsx'
import SingleLoaderList from '../components/Loaders.tsx'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store.ts'
import { BE_getAllTasks } from '../backend/Queries.ts'
import FlipMove from 'react-flip-move'

type Props = {}

export default function Dashboard({}: Props) {
  const tasks = useSelector((state:RootState) =>
     state.tasklist.currentTaskList
  )

  const dispatch = useDispatch<AppDispatch>()
  const [loading ,setloading] =useState(false)
  useEffect(()=>{
    BE_getAllTasks(dispatch,setloading)
    setloading(true)
  },[dispatch])
 

  return (
    <FlipMove className='p-6 flex flex-wrap justify-center gap-10'>
      
      { loading ? <SingleLoaderList/> : tasks ?
     
      tasks.map(t => 
        
        <SingleTaskList key={t.id} tasklist={t} ></SingleTaskList>
      )
      : 
      <h1 className=' text-white '>No Task Found</h1>
      
     }
     
      
      </FlipMove>
  )
}