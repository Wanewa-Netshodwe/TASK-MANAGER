import { faPen, faSave, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { forwardRef, useState, } from 'react'
import { taskType } from '../Types'
import { useDispatch } from 'react-redux'
import { collapseTask, switchEditModeTask } from '../redux/TaskListSlice.ts'
import { BE_deleteTask, BE_saveTask } from '../backend/Queries.ts'
import Spinner from './Spinner.tsx'
type Props = {
  task:taskType
}

const Task =forwardRef(({task}: Props,ref: React.LegacyRef<HTMLDivElement> | undefined) => {
  const [collapsed,setcollapsed] = useState(false)
  const [saveloading,setsaveloading] = useState(false)
  const [delloading,setdelloading] = useState(false)
  const[taskTitle,setTaskTitle] =useState(task.title)
  const[taskDescription,setTaskDescription] =useState(task.description)
  const dispatch = useDispatch()
  const editmode=()=>{
    const obj={
      listid:task.taskListid,
      taskid:task.id
    }
    dispatch(switchEditModeTask(obj))

  }
  const handlesaveTask=()=>{

    BE_saveTask(dispatch,setsaveloading,taskTitle,taskDescription,task.taskListid,task.id)
  }
  const colTask =()=>{
        const payload ={
          listid:task.taskListid,
          taskid:task.id,
          value:collapsed
        }
        dispatch(collapseTask(payload))     
  }
  const handleDeletTask =()=>{
    BE_deleteTask(dispatch,setdelloading,task)
  }
  return (
    <div  ref={ref} className=' bg-slate-100 drop-shadow-sm hover:drop-shadow-md p-2 mb-2 rounded-md'>
        <div className='hover:cursor-pointer' onClick={()=>{setcollapsed(!collapsed); colTask()}}>
          {task.editMode ? <input onChange={e=>{setTaskTitle(e.target.value)}} value={taskTitle}  placeholder={task.title} style={{fontFamily:'Poppins'}} className='text-[12px] border-2 border-gray-300 px-2 rounded-sm bg-transparent placeholder:text-gray-700  min-w-[200px] text-gray-700 mb-1'/>  : <p style={{fontFamily:'Poppins'}} className='text-[12px] placeholder:text-gray-700  text-gray-700 mb-1'>{task.title}</p> }
            
        </div>
        <div>
          {task.collapsed && <>
          <hr />
            {task.editMode ?
             <textarea onChange={e=>{setTaskDescription(e.target.value)}} value={taskDescription}  placeholder={task.description}  style={{fontFamily:'Poppins'}} className='placeholder:text-gray-700 mt-2 text-[12px] w-[270px] bg-transparent
               border-2 border-gray-300 px-2 rounded-sm
             text-gray-700 mb-1'>{task.title}</textarea>  :
            
            <p style={{fontFamily:'Poppins'}} className='text-[11px] text-gray-600 mb-1 mt-2' >{task.description}</p> }
          <div className='flex justify-end items-center '>
            {saveloading ? <Spinner/> :
            <FontAwesomeIcon onClick={()=>{task.editMode ? handlesaveTask() : editmode()}} className=' w-3 text-slate-900 h-4 rounded-full p-2 ' icon={task.editMode ? faSave : faPen}></FontAwesomeIcon>
            
            }
            
            {delloading ? <Spinner/> : <FontAwesomeIcon onClick={()=>{handleDeletTask()}} className=' w-3 text-slate-900 h-4 rounded-full p-2 ' icon={faTrash}></FontAwesomeIcon>}
            </div>
          </> }
          
           
        </div>
    </div>
  )
})
export default Task