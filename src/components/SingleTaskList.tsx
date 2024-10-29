import { faAdd, faCaretDown, faCaretUp, faPen, faSave, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { forwardRef, useState } from 'react'
import Tasks from './Tasks.tsx'
import { taskListType } from '../Types.ts'
import Spinner from './Spinner.tsx'
import { BE_addTask, BE_deleteTaskList, BE_saveTaskList } from '../backend/Queries.ts'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store.ts'
import { collapseAll, defaultTaskList, switchToTastListEditMode } from '../redux/TaskListSlice.ts'

type TaskListProps = {
  tasklist?:taskListType
}

const  SingleTaskList = forwardRef(({tasklist}: TaskListProps,ref:React.LegacyRef<HTMLDivElement>) => {
  const tasksList = useSelector((state:RootState) =>
    state.tasklist.currentTaskList
 )
 let current_taskList: taskListType = defaultTaskList;
 const foundTaskList = tasksList.find(t => t.id === tasklist?.id);
 
 if (foundTaskList) {
   current_taskList = foundTaskList;
 }
 
 const tasks = current_taskList.tasks;
 console.log(tasks)
 const handleCollapseAll=()=>{
  const obj ={
    id:tasklist?.id,
    value:collapsedall
  }
dispatch(collapseAll(obj))
 }

  const handleAddTask =()=>{
    if(tasklist?.id)
    BE_addTask(dispatch,setaddtaskLoading,tasklist?.id)

  }
  const dispatch = useDispatch()
  const d = useDispatch<AppDispatch>()
  const switchToEditMode = (id,ed)=>{
      console.log('edit mode clicked')
        const taskinfo = {
          id : id,
          value:ed = !ed
        }
          console.log(taskinfo.value)
          d(switchToTastListEditMode(taskinfo))
    
  }
  const[saveLoading,setsaveLoading] = useState(false)
  const[deleteLoading,setdeleteLoading] = useState(false)
  const[addtaskLoading,setaddtaskLoading] = useState(false)
  const[iseditMode,setEditmode] = useState(false)
  const[collapsedall,setcollapsedall] = useState(true)
  const handleSaveTaskListTitle =() =>{
    console.log('id is :' , tasklist?.id)
    if(tasklist?.id){
      BE_saveTaskList(dispatch,tasklist?.id,homeTitle|| '',setsaveLoading)
    }
    else{
      console.log('id is null')
    }
  }
  const handleDelete=()=>{
    if (tasklist)
    BE_deleteTaskList(tasklist,dispatch,setdeleteLoading)
  }
  
  
  const[homeTitle,sethomeTitle] = useState(tasklist?.title)

  return (
    <div ref={ref}>
      <div className='relative'>

      <div className="bg-gray-100 w-full md:w-[300px] min-h-[180px] rounded-md overflow-hidden">
            <div className="flex  md:gap-2  h-11  bg-purple-700 justify-start items-center">
            {tasklist?.editMode ?( <input style={{fontFamily:'Poppins'}} 
            value={homeTitle} onChange={(e)=>{sethomeTitle(e.target.value)}}
             placeholder={homeTitle} className=' bg-transparent mx-2  px-2 text-[13px]  border-2 rounded-md  border-gray-200
                focus:outline-none text-gray-200'>
             </input>)
            
            :<p style={{fontFamily:'Poppins'}}className=' flex-1 h-8 mt-3 mx-2 px-4 text-[13px] text-gray-200'>
                  {homeTitle}
            
            </p>
            
             }
                <div className="flex gap-1 justify-end items-center">
                  {saveLoading ?  <Spinner/> : <FontAwesomeIcon onClick={()=>{tasklist?.editMode ? handleSaveTaskListTitle() : switchToEditMode(tasklist?.id,iseditMode)}} className=' w-3  text-gray-200 h-3 rounded-full p-2 hover:bg-purple-800' icon={tasklist?.editMode ? faSave : faPen}></FontAwesomeIcon>
                 }
                 {deleteLoading ? <Spinner/> : <FontAwesomeIcon  onClick={()=>{handleDelete()}} className=' w-3 text-gray-200 h-3 rounded-full p-2 hover:bg-purple-800' icon={faTrash}></FontAwesomeIcon> }
                
                <FontAwesomeIcon onClick={()=>{handleCollapseAll(); setcollapsedall(!collapsedall)}} className=' w-4 on text-gray-200 h-4 rounded-full p-2 hover:bg-purple-800' icon={ collapsedall ? faCaretDown :faCaretUp  }></FontAwesomeIcon>
                </div>
            </div>
                {tasklist?.tasks && tasklist?.tasks?.length >0 ?
                 <Tasks tasklist ={tasklist} ></Tasks>
                 : 
                <p style={{fontFamily:'Poppins'}} className='text-gray-700 p-2 text-center'>No Task yet</p>  }
            
        </div>
        
      <div  className='flex justify-center items-center absolute -bottom-[11px] -left-3 bg-purple-600 hover:bg-purple-800  w-11  h-11 rounded-full p-2'>
        {addtaskLoading ? <Spinner/> : <FontAwesomeIcon onClick={()=>{handleAddTask()}} className='text-white text-[25px]' icon={faAdd}></FontAwesomeIcon>
 }
      
      </div>

      </div>
        
        
    </div>
  )
})
export default SingleTaskList