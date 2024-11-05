import { faAdd, faCalendar, faCaretDown, faCaretRight, faCaretUp, faCheckCircle, faClose, faEllipsisVertical, faPen, faSave, faShare, faTrash } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React, { forwardRef, useState } from 'react'
import Tasks from './Tasks.tsx'
import { taskListType, userType } from '../Types.ts'
import Spinner from './Spinner.tsx'
import { BE_addTask, BE_AssignTask, BE_completed, BE_deleteTaskList, BE_saveTaskList, BE_setdeadLine, BE_setFailed, createdChat, getUserid } from '../backend/Queries.ts'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../redux/store.ts'
import { collapseAll, defaultTaskList, setFailed, setShowmodal, switchToTastListEditMode } from '../redux/TaskListSlice.ts'
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import  Button  from './Button.tsx'
import { useNavigate } from 'react-router-dom'
import Userheaderprofile from './Userheaderprofile.tsx'
import { setShareUsers } from '../redux/userSlice.ts'
import { convertTime } from '../utils/ConvertTime.ts'

type TaskListProps = {
  tasklist?:taskListType
}


const  SingleTaskList = forwardRef(({tasklist}: TaskListProps,ref:React.LegacyRef<HTMLDivElement>) => {
  const deadlines = useSelector((state:RootState)=>state.tasklist.tasksDeadlines)
  const dispatch = useDispatch()
  const currentDate = Date.now()
  deadlines.forEach(dl=>{
    if(dl.id === tasklist?.id){
      if(!tasklist.failed){
      const diff = dl.date.seconds*1000 -currentDate 
      const days = diff/(1000 * 60 * 60 * 24)
      if (days <0){
        BE_setFailed(dispatch,dl.id)
      }
    }

    }
  })
 
  console.log(tasklist?.deadline)
  console.log(currentDate)
  const [selectedDate, setSelectedDate] = useState(null);
  const [sharemodal, setsharemodal] = useState(false);
  const [isloading, setisloading] = useState(false);
  const goto = useNavigate()
  const handleDatesave = () => {
  
   if(selectedDate) BE_setdeadLine(dispatch,tasklist?.id,goto,selectedDate.$d,setisloading)
  };
  const handlecompleted = () => {
    BE_completed(dispatch,tasklist?.id,goto)

  };

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
    console.log(newDate.$d); 
  };

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
  const[completed,setcompleted] = useState(tasklist?.completed)
  const[hasdeadline,sethasdeadline] = useState(tasklist?.deadline)
  const[deadline,setdeadline] = useState(false)
  const[collapsedall,setcollapsedall] = useState(true)
  // const[avaUsers,setavaUsers] = useState<userType[]>([])
  const chats = useSelector((state:RootState)=>state.chat.chats)
  const users = useSelector((state:RootState)=>state.user.users)
  const avaUsers = useSelector((state:RootState)=>state.user.shareAvailableUsers)
  const [showing,setShowing] = useState(false)


  let people_in_chat:string[] = []
  const handleShareTask=()=>{
    console.log(users)
    if (chats.length < 1){
      console.log('i have no chats')
    }
    chats.forEach(c=>{
      if(createdChat(c.senderId)){
        people_in_chat.push(c.recieverId)
        console.log(`im in a chat with : ${c.recieverId}`)
      }
      else{
        if (getUserid() === c.recieverId){
            people_in_chat.push(c.senderId)
            console.log(`im in a chat with : ${c.senderId}`)
        }else{
          console.log('no chat found')
        }
      }
    })
    let usrs:userType[]=[]
    people_in_chat.forEach(p=>{
      console.log(p)
      users.forEach(user=>{
        console.log(user.id)
        if(p === user.id){
          console.log('user :', user)
          usrs.push(user)
        }
      })
    })
    console.log('users in chat :',usrs)
    dispatch(setShareUsers(usrs))
    setsharemodal(!sharemodal)
    console.log('availabel users ',avaUsers)
  }
  const[showmenu,setmenu] = useState(false)
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
  const nothing=()=>{

  }
  console.log("shared users :",tasklist?.assignedUserIds)
  const handleclickshare =(user:userType)=>{
    console.log('clicked user id : ',user.id)
    const valid = window.confirm(`are you sure u want to share task(${tasklist?.title}) with user : ${user.username}`)
   if(valid){
    if(tasklist?.id)
    BE_AssignTask(tasklist?.id,user.id,goto)
  setShowmodal()
    console.log('valid')
   }else{
    console.log('false')
   }
  }
  
  
  const[homeTitle,sethomeTitle] = useState(tasklist?.title)
 
  return (
    <div ref={ref}>
      <div className='flex flex-col md:flex-row' >
      
    <div className='relative'>
    

        {hasdeadline ? (<div className='text-start'>
          <span style={{fontFamily:'Poppins'}} className={`text-[13px]  p-2 ${completed ? 'text-green-500' : tasklist?.failed ? 'text-red-500' : 'text-gray-200' }  `}>Deadline</span>
        <p style={{fontFamily:'Poppins'}} className={`text-[11px] font-mono p-2 text-start ${completed ? 'text-green-400' : tasklist?.failed ? 'text-red-500' : 'text-gray-200' }  `}>{tasklist?.deadline}</p>

        </div>) : <div className=' h-[58px]'></div>}

          {
            sharemodal && <>
             
            
            </>
          }

          {
             tasklist?.assignedUserIds?.length!! > 1 && 
             
             <>
               <div style={{fontFamily:'Poppins'}}  className='absolute -bottom-8 left-7 text-gray-300 text-[10px]'>
        <p className='text-gray-50'>participants</p>
        <span>{JSON.parse(localStorage.getItem('user')!!).username}  </span>
        
        
       
        {
  tasklist?.assignedUserIds?.length!! > 1 && (
    tasklist?.assignedUserIds?.map(id =>
      users.map(u => (
        u.id === id && (
          <span key={u.id}>{u.username} </span>
        )
      ))
    )
  ) 
}

       </div>

             
             
             </>
          }
         
     
        
        
        
      <div className={`bg-gray-100 w-full md:w-[300px] min-h-[180px] ${deadline  ? '  md:rounded-l-md  md:rounded-r-none' : ''} rounded-md  overflow-hidden`}>
            <div className={`flex  md:gap-2  h-11 ${ completed ? 'bg-green-400' : tasklist?.failed ? 'bg-red-600' : 'bg-purple-700'} justify-start items-center`}>
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
                  {saveLoading ?  <Spinner/> : <FontAwesomeIcon onClick={()=>{completed ? nothing() : tasklist?.editMode ? handleSaveTaskListTitle() : switchToEditMode(tasklist?.id,iseditMode)}}
                   className={` w-3  text-gray-200 h-3 rounded-full p-2 ${completed ? 'hover:bg-gray-100 hover:text-green-400' : tasklist?.failed ? 'hover:bg-gray-100 hover:text-red-600' :'hover:bg-purple-800' } `} icon={tasklist?.editMode ? faSave : faPen}></FontAwesomeIcon>
                 }
                 {deleteLoading ? <Spinner/> : <FontAwesomeIcon  onClick={()=>{handleDelete()}}
                  className={` w-3  text-gray-200 h-3 rounded-full p-2 ${completed ? 'hover:bg-gray-100 hover:text-green-400' : tasklist?.failed ? 'hover:bg-gray-100 hover:text-red-600' :'hover:bg-purple-800' } `}  icon={faTrash}></FontAwesomeIcon> }
                
                {/* <FontAwesomeIcon onClick={()=>{handleCollapseAll(); setcollapsedall(!collapsedall)}} className=' w-4 on text-gray-200 h-4 rounded-full p-2 hover:bg-purple-800' icon={ collapsedall ? faCaretDown :faCaretUp  }></FontAwesomeIcon> */}
                <FontAwesomeIcon  onClick={()=>{setmenu(!showmenu)}}  className={` w-3  text-gray-200 h-3 rounded-full p-2 ${completed ? 'hover:bg-gray-100 hover:text-green-400' : tasklist?.failed ? 'hover:bg-gray-100 hover:text-red-600' :'hover:bg-purple-800' } `}  icon={faEllipsisVertical}></FontAwesomeIcon> 
                </div>
            </div>
                {tasklist?.tasks && tasklist?.tasks?.length >0 ?
                 <Tasks tasklist ={tasklist} ></Tasks>
                 : 
                <p style={{fontFamily:'Poppins'}} className='text-gray-700 p-2 text-center'>No Task yet</p>  }


    
        </div>

      
      
        
        {!completed && !tasklist?.failed && (
  <div className='flex justify-center items-center absolute -bottom-[11px] -left-3 bg-purple-600 hover:bg-purple-800 w-11 h-11 rounded-full p-2'>
    {addtaskLoading ? <Spinner /> : (
      <FontAwesomeIcon 
        onClick={() => handleAddTask()} 
        className='text-white text-[25px]' 
        
        icon={faAdd} 
      />
    )}
  </div>
)}

      {showmenu && <><div className='bg-gray-50 w-[110px] absolute top-[102px] right-0 rounded-md'>
              <ul onClick={()=>setmenu(!showmenu)} className='p-1 text-start'>
                <li onClick={()=>{completed ? nothing() : tasklist?.failed ? nothing() :  handleCollapseAll(); setcollapsedall(!collapsedall)}} className='p-2 hover:bg-purple-100 w-full text-[12px] flex items-center '><FontAwesomeIcon className='pr-3' icon={ collapsedall ? faCaretDown :faCaretUp  }/><button>Collapse</button></li>
                <li onMouseEnter={()=>{setShowing(true)}} onMouseLeave={()=>{setShowing(false)}} onClick={()=>{completed ? nothing() : tasklist?.failed ? nothing() :  handleShareTask()}}  className={` ${completed ? "text-gray-300" : tasklist?.failed ? 'text-gray-300' : 'hover:bg-purple-100'}  w-full text-[12px] flex items-center p-2 relative `}><FontAwesomeIcon className='pr-3' icon={faShare}/><button >Share Task</button>{!completed && !tasklist?.failed && showing && <FontAwesomeIcon className='pl-2' icon={faCaretRight} />} 
                {!completed && !tasklist?.failed &&  showing && <>
                  <div className='absolute top-1 -right-20 z-10 w-20 bg-gray-50   text-[11px] h-fit  '>
            {avaUsers.length >0 ?  avaUsers.map(user=>
            <> <div  style={{fontFamily:'Poppins'}}  className=' cursor-pointer   ' onClick={()=>{handleclickshare(user)}}>
              <p className=' p-2 hover:bg-purple-300 text-black'>{user.username}</p>
            </div>
            </>
                

            )
            :<><h1 className=' p-2 hover:bg-purple-300 text-black'>no users found</h1></>
            }
           
          </div>
                
                </>}
                
                
                </li>
                <li onClick={()=>{completed ? nothing() : tasklist?.failed ? nothing() :  setdeadline(!deadline)}} className={`${completed ? 'text-gray-300' :tasklist?.failed ? 'text-gray-300' : 'hover:bg-purple-100' } w-full text-[11px] flex items-center p-2`}><FontAwesomeIcon className='pr-3' icon={faCalendar}/>{ completed ? <button >Set Deadline</button>: tasklist?.failed ?
                <button >Set Deadline</button>
                : <button>Set Deadline</button> }</li>
                <li onClick={ ()=>{completed ? nothing() : tasklist?.failed ? nothing() :  handlecompleted()}} className={`${completed ? 'text-green-400': tasklist?.failed ? 'text-red-600'  :  'hover:bg-purple-100'}  w-full text-[12px] flex items-center p-2`}><FontAwesomeIcon className='pr-3' icon={tasklist?.failed ? faClose :  faCheckCircle}/>{ completed ? <button disabled>Done</button>
                : tasklist?.failed ?  <button disabled>incomplete</button>
                : <button>Completed</button> }</li>
              </ul>
          </div></> }

      </div>

      {deadline && ( <div className='relative top-[58px] bg-gray-100 min-w-[30px] rounded-md  md:rounded-l-none md:rounded-r-md h-[180px]'>
        <div className='bg-purple-700 w-full  p-[10px] rounded-tl-md rounded-tr-md  md:rounded-tl-none md:rounded-tr-md h-11'>
        <span className='text-[13px] p-2 w-full text-white'>Set Deadline</span>
        </div>
      <div className='p-2 text-end'>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer components={['DateTimePicker']}>
        <DateTimePicker  label="Date and time"
        onChange={handleDateChange}
        value={selectedDate} 
        />
      </DemoContainer>
    </LocalizationProvider>
    <Button loading={isloading} onClick={()=>{handleDatesave()}} s='mt-3 bg-purple-700 p-2 w-16'name='Save'/>
      </div>
      
    </div>) }

      </div>
     

      
      
      
      
      
        
    </div>
  )
})
export default SingleTaskList