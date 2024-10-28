import { faAdd, faCaretDown, faPen, faSave, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { forwardRef, useState } from 'react'
import Tasks from './Tasks.tsx'
import { taskListType } from '../Types.ts'
import Spinner from './Spinner.tsx'
import { BE_saveTaskList } from '../backend/Queries.ts'
import { useDispatch } from 'react-redux'

type TaskListProps = {
  tasklist?:taskListType
}

const  SingleTaskList = forwardRef(({tasklist}: TaskListProps,ref:React.LegacyRef<HTMLDivElement>) => {
  const dispatch = useDispatch()
  const switchToEditMode = ()=>{

    
  }
  const[saveLoading,setsaveLoading] = useState(false)
  const handleSaveTaskListTitle =() =>{
    console.log('id is :' , tasklist?.id)
    if(tasklist?.id){
      BE_saveTaskList(dispatch,tasklist?.id,homeTitle|| '',setsaveLoading)
    }
    else{
      console.log('id is null')
    }
    

  }
  
  const[homeTitle,sethomeTitle] = useState(tasklist?.title)

  return (
    <div ref={ref} className='relative'>
        <div className="bg-[#bba9d1] w-full md:w-[280px] min-h-[150px] rounded-md overflow-hidden">
            <div className="flex flex-wrap md:gap-3 h-11 bg-purple-900 justify-start items-center">
            {tasklist?.editMode ?( <input style={{fontFamily:'Poppins'}} value={homeTitle} onChange={(e)=>{sethomeTitle(e.target.value)}} placeholder={homeTitle} className='w-[140px]  bg-transparent mx-2  px-2 text-[13px]  border-2 rounded-md px-2 border-[#bcbbbd]
                focus:outline-none text-[#c6c3c9]'>

             </input>)
            
            
            :<p style={{fontFamily:'Poppins'}}className=' w-[140px] h-8 mt-3 mx-2 px-4 text-[13px] text-[#c6c3c9]'>
                  {homeTitle}
            
            </p>
            
             }
                  
                
                <div className="flex gap-1 justify-end items-center">
                  {saveLoading ?  <Spinner/> : <FontAwesomeIcon onClick={()=>{tasklist?.editMode ? handleSaveTaskListTitle() : switchToEditMode() }} className=' w-3 text-[#c6c3c9] h-3 rounded-full p-2 hover:bg-purple-800' icon={tasklist?.editMode ? faSave : faPen}></FontAwesomeIcon>
                 }
                <FontAwesomeIcon className=' w-3 text-[#c6c3c9] h-3 rounded-full p-2 hover:bg-purple-800' icon={faTrash}></FontAwesomeIcon>
                <FontAwesomeIcon className=' w-4 text-[#c6c3c9] h-4 rounded-full p-2 hover:bg-purple-800' icon={faCaretDown}></FontAwesomeIcon>
                </div>
            </div>
            <Tasks/>
        </div>
        <FontAwesomeIcon className='absolute -bottom-[12px] -left-2 bg-purple-600 hover:bg-purple-800 text-white w-5  h-5 rounded-full p-2' icon={faAdd}></FontAwesomeIcon>

    </div>
  )
})
export default SingleTaskList