import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { auth, db } from "./firebase.ts"
import { catchError } from "../utils/catcherrors.ts"
import { NavigateFunction } from "react-router-dom"
import { doc,setDoc,serverTimestamp, getDoc, updateDoc, addDoc, collection, query, getDocs, where, deleteDoc, orderBy, onSnapshot, or, and } from "firebase/firestore"
import { chatType, messageType, setLoading, taskDeadline, taskListType, taskType, userType } from "../Types.ts"
import { error, success } from "../utils/toast.ts"
import { defaultUser, setAlert, setUser, setUsers, setusersloading } from "../redux/userSlice.ts"
import { AppDispatch } from "../redux/store.ts"
import { GenerateAvator } from "../utils/GenerateAvator.ts"
import { convertT, convertTime } from "../utils/ConvertTime.ts"
import { addTask, addTaskList, defaultTask, deleteTask, deleteTaskList, saveTask, saveTaskListUpdate, setcompleted, setdeadLine, setDeadlines, setFailed, setTaskList } from "../redux/TaskListSlice.ts"
import { setChats, setCurrentMessages } from "../redux/chatSlice.ts"
//Collection Names
const USERCOLLECTION ='users'
const TASKLISTCOLLECTION='tasks'
const TASKCOLLECTION = 'tasks'
const CHATSCOLLECTION = 'chats'
const MESSAGECOLLECTION = 'message'

export const getUserid=()=>{
    return JSON.parse(localStorage.getItem('user')|| '{}').id
}
export const BE_signup =(data:{
    email:string,
    password:string,
    username:string
},
isLoading:setLoading,
reset:()=>void,
goTo:NavigateFunction,
dispatch:AppDispatch
)=>{
    const {email,password,username,} =data
    isLoading(true)
        if (!(email && password && username)){
            error('Fields Can Not be Empty')
            isLoading(false)
            reset()
        }
        else{
            
            createUserWithEmailAndPassword(auth,email,password)
            .then(async({user})=>{
                const imgLink = GenerateAvator(username)
                const userinfo = await AddUserToCollection(user.uid,user.email || '',imgLink,username)
                isLoading(false)
                reset()
                
                dispatch(setUser(userinfo))
                goTo("/dashboard")
            })
            .catch(err=>{
                
                catchError(err.code)
                isLoading(false)
                reset()
            })
        }
}
export const BE_login =(data:{
    password:string,
    username:string
},
isLoading:setLoading,
reset:()=>void,
goTo:NavigateFunction,
dispatch:AppDispatch
)=>{
    const {password,username,} =data
    isLoading(true)
        if (!(username && password)){
            error('Fields Can Not be Empty')
            isLoading(false)
            reset()
        }
        else{
            
            signInWithEmailAndPassword(auth,username,password)
            .then(async({user})=>{
                await updateUserinfo({id:user.uid , isOnline:true})
                const userinfo = await getUserInfo(user.uid)
                
                dispatch(setUser(userinfo))
                isLoading(false)
                reset()
                goTo("/dashboard")
            })
            .catch(err=>{
                
                catchError(err.code)
                isLoading(false)
                reset()
            })
        }
}
export const BE_signout= async (dispatch:AppDispatch,goto:NavigateFunction,loading:setLoading)=>{
  loading(true)
  await signOut(auth)
  
    const u = JSON.parse(localStorage.getItem('user') || '')
    if(u.id){
      await updateUserinfo({id:u.id,isOffline:true}) 
      localStorage.removeItem('user')
      
       goto("/jj")
    }
    else{
      goto("/jjejj")
      localStorage.removeItem('user')
      
    }
  
    loading(false)
}
export const BE_updateProfile= async(
  dispatch:AppDispatch,
  loading:setLoading,
  goto:NavigateFunction,
  username:string,
  email:string,
  bio:string,
  pic:string,
  id:string
)=>{
  loading(true)
  const userRef = doc(db,USERCOLLECTION,id)
  await updateDoc(userRef,{
    username:username,
    email:email,
    bio:bio,
    img:pic
  })
  const user = await getUserInfo(id)
  dispatch(setUser(user))
  loading(false)
  goto('/')
}
export const BE_getAllUsers=async(
  dispatch:AppDispatch,
)=>{
  setusersloading(true)
  const q = query(collection(db,USERCOLLECTION),orderBy('isOnline','desc'))
  onSnapshot(q,(usersSnapshot)=>{
    let users:userType[] =[]
    usersSnapshot.forEach(user=>{
      const {img,bio,last_seen,username,isOnline,email,creation_Time,id} = user.data()
      users.push({
        img,
        id,
        creation_Time: creation_Time ? convertTime(creation_Time.toDate()) : '',
        email,
        isOnline,
        username,
        bio,
        last_seen: last_seen ? convertTime(last_seen.toDate()) : ''
      }
      )
    })
    const userid =getUserid()
    if(userid){
      dispatch(setUsers(users.filter(u=> (u.id !== userid))))
    }
    setusersloading(false)
   

  })


}
export const getUserInfo=async(id:string):Promise<userType>=>{
  const userRef =doc(db,USERCOLLECTION,id)
  const user = await getDoc(userRef)

  if(user.exists()){
      const {bio,last_seen,creation_Time,email,username,img,isOnline,id} =user.data()
      return{
          id,
          bio,
          last_seen : last_seen ?  convertTime(last_seen.toDate()) : ' ',
          creation_Time: creation_Time ? convertTime(creation_Time.toDate()) : '',
          email,
          username,
          img,
          isOnline
      }
  }
  else{
      error('User Not Found')
      return defaultUser
  }
}
const AddUserToCollection = async(
    id:string,
    email:string,
    img:string,
    username:string,
     
)=>{
    await setDoc(doc(db,USERCOLLECTION,id),{
            id,
            isOnline:true,
            img,
            username,
            email,
            creation_Time:serverTimestamp(),
            last_seen:serverTimestamp(),
            bio:`hi my name is ${username}`

    })
    
    return getUserInfo(id)

}

const updateUserinfo= async (
    {   id,
        username,
        img,
        isOnline,
        isOffline,
    }:{
        id?:string,
        username?:string,
        img?:string,
        isOnline?:boolean,
        isOffline?:boolean,
    }
) =>{
     if(id){
      const userRef = doc(db, USERCOLLECTION, id);
      await updateDoc(userRef, {
        ...(username && {username}),
        ...(img && {img}),
        ...(isOnline && {isOnline}),
        ...(isOffline && {isOnline:false}),
        last_seen:serverTimestamp(),
    }
);
    } 
  

}


//-----------------------TasksList-------------------------
export const BE_AssignTask =async(listid:string,assigneeId:string,goto:NavigateFunction)=>{
  const dref = doc(db,TASKCOLLECTION,listid)
  const docRef = await getDoc(dref)
  const {assignedUserIds,} = docRef.data()
  if(assignedUserIds.includes(assigneeId) ){
    error('task already shared with user')
    return
  }
  assignedUserIds.push(assigneeId)

  await updateDoc(dref,{
    assignedUserIds:assignedUserIds
  })
  goto('/')

}
export const BE_setFailed =async(dispatch,id)=>{
  const dref = doc(db,TASKCOLLECTION,id)
  await updateDoc(dref,{
    failed : true
  })
  dispatch(setFailed)
}
export const BE_addTaskList = async(
    dispatch:AppDispatch,
    setLoading:setLoading
)=>{
    setLoading(true)
  
    const docRef = await addDoc(collection(db, TASKLISTCOLLECTION), {
        title:'Task Title',
        userId: getUserid(),
        assignedUserIds:[getUserid()],
        deadline:"",
        completed:false,
        failed:false
    });

    await updateDoc(docRef,{
        id:docRef.id
    })
    const taskRef = doc(db, docRef.path);
    const docSnap = await getDoc(taskRef);
    
    if (docSnap.exists()) {
        const {title,userId} = docSnap.data()
        const tl:taskListType={
            id:docRef.id,
            title : title,
            userId :userId,
            editMode:true,
            failed:false,
            tasks:[]
        }
        dispatch(addTaskList(tl))
}

    // await getTasks()
    setLoading(false)
}
export const BE_completed = async(dispatch,id,goto)=>{
  
  const dref = doc(db,TASKCOLLECTION,id)
  await updateDoc(dref,{
    completed:true
  })
  dispatch(setcompleted(id))
  goto('/')

}
export const BE_setdeadLine = async(dispatch,id,goto,date,loading)=>{
  loading(true)
  const dref = doc(db,TASKCOLLECTION,id)
  console.log(date)
  await updateDoc(dref,{
    deadline : date
  })
  const obj ={
    id:id,
    deadline:convertT(date)
  }
  loading(false)
  dispatch(setdeadLine(obj))
  goto('/')
}

export const BE_getAllTasksList= async(
    dispatch:AppDispatch,
    loading:setLoading
)=>{
    
    const tasks = await getTaskLists(dispatch) 
    dispatch(setTaskList(tasks))
    loading(false)
    
}
export const BE_saveTaskList= async(
    dispatch:AppDispatch,
    id:string,
    title:string,
    loading:setLoading
)=>{
    loading(true)
    const docRef = doc(db, TASKLISTCOLLECTION, id);
    await updateDoc(docRef,{
        title:title
    }) 
    const tasklist = await getDoc(docRef)
    dispatch(saveTaskListUpdate(tasklist))
    loading(false)
    
            
}

export const BE_deleteTaskList = async (tasklist: taskListType, dispatch: AppDispatch, loading: setLoading) => {
    const { id, tasks } = tasklist;
    loading(true);
    
    if (tasks) {
      if (tasks.length > 0) {
        for (let i = 0; i < tasks.length; i++) {
          await BE_deleteAllTask(id);
        }
      }
    }
  
    if (id) {
      const tasklistCollectionRef = collection(db, TASKLISTCOLLECTION);
      const tasklistDocRef = doc(tasklistCollectionRef, id); 
      await deleteDoc(tasklistDocRef);
      const tasklistDoc = await getDoc(tasklistDocRef);
      
      if (!tasklistDoc.exists()) {
        dispatch(deleteTaskList(id))
        // success('TaskList Deleted');
        loading(false);
      } else {
        error('Error deleting TaskList');
      }
    }
  };
  
  export const BE_deleteAllTask = async (listid) => {
    try {
      const tasksCollectionRef = collection(db, TASKLISTCOLLECTION, listid, TASKCOLLECTION); // Reference to the tasks subcollection
      const querySnapshot = await getDocs(tasksCollectionRef);
  
      if (querySnapshot.empty) {
        console.log('No tasks to delete.');
        return;
      }
  
      const deletePromises = querySnapshot.docs.map((doc) => {
        const taskDocRef = doc.ref;
        return deleteDoc(taskDocRef);
      });
  
      await Promise.all(deletePromises);
  
      console.log('All tasks deleted successfully.');
    } catch (error) {
      console.error('Error deleting tasks:', error);
    }
  };

//---------------------Task------------------------------

export const BE_addTask = async(
    dispatch:AppDispatch,
    loading:setLoading,
    listid:string,
)=>{
    loading(true)
    const taskListDocRef = doc(db, TASKLISTCOLLECTION, listid);
    const tasksCollectionRef = collection(taskListDocRef, TASKCOLLECTION);
    const newTaskDocRef = doc(tasksCollectionRef);
    const task:taskType={
        title:defaultTask.title,
        description:defaultTask.description,
        taskListid :listid,
        editMode:true,
        collapsed:true,
        id:newTaskDocRef.id
    }
    await setDoc(newTaskDocRef, task);
    const all_Tasks =  await getTasks(listid,newTaskDocRef.id)
    dispatch(addTask(all_Tasks))
    loading(false)


}

export const BE_saveTask= async(
    dispatch:AppDispatch,
    loading:setLoading,
    taskTitle:string,
    taskDescription:string,
    listid?:string,
    taskid?:string,
)=>{
    loading(true)
    if(listid && taskid){
        const taskListDocRef = doc(db, TASKLISTCOLLECTION, listid);
        const tasksCollectionRef = collection(taskListDocRef, TASKCOLLECTION);
        const taskDocRef = doc(tasksCollectionRef, taskid);
        await updateDoc(taskDocRef,{
            title:taskTitle,
            description:taskDescription
        })
        loading(false)
        const payload ={
            listid: listid,
            taskid:taskid,
            title:taskTitle,
            description:taskDescription,
        }
        dispatch(saveTask(payload))
        
        

    }
    
    
    
}
export const BE_deleteTask =async(
    dispatch:AppDispatch,
    loading:setLoading,
    task:taskType
)=>{
    loading(true)
    if (task.taskListid && task.id){
    const taskListDocRef = doc(db, TASKLISTCOLLECTION, task.taskListid); 
    const tasksCollectionRef = collection(taskListDocRef, TASKCOLLECTION);
    const taskDocRef = doc(tasksCollectionRef, task.id);
    await deleteDoc(taskDocRef)
    const taskDoc = await getDoc(taskDocRef);
      
      if (!taskDoc.exists()) {
        dispatch(deleteTask(task))
       
        loading(false);
      } else {
        error('Error deleting TaskList');
      }


    }
    

}
const gt = async (listid) => {
    const taskListDocRef = doc(db, TASKLISTCOLLECTION, listid);
    const tasksCollectionRef = collection(taskListDocRef, TASKCOLLECTION);
  
    let tasks:taskType[] = []; 
  
    try {
      const querySnapshot = await getDocs(tasksCollectionRef);
  
      if (querySnapshot.empty) {
        return [];
      }
  
      querySnapshot.forEach((doc) => {
        const { taskListid, description, title, id } = doc.data();
        tasks.push({
          taskListid: taskListid,
          description: description,
          title: title,
          collapsed: false,
          editMode: false,
          id: id,
        });
      });
    } catch (error) {
      console.error("Error getting tasks:", error);
    }
  
    return tasks;
  };

const getTaskLists = async (dispatch:AppDispatch) => {
    let tasklists: taskListType[] = [];
    const userId = getUserid();
    const q = query(collection(db, TASKLISTCOLLECTION), where("assignedUserIds", "array-contains", userId));
    
  
    const tasklistSnapshot = await getDocs(q);
  
    if (tasklistSnapshot.empty) {
      
      return tasklists;
    }
  
    const promises = tasklistSnapshot.docs.map(async (doc) => {
      const { title, userId, id,completed ,deadline,failed,assignedUserIds} = doc.data();
      if(deadline){
          const dead_line:taskDeadline={
            date:deadline,
            id:id
          }
          dispatch(setDeadlines(dead_line))
      }
      const tasks = await gt(id); 
      tasklists.push({
        id: id,
        title: title,
        editMode: false,
        tasks: tasks,
        userId: userId,
        completed:completed,
        failed:failed,
        deadline: deadline ? convertTime(deadline.toDate()) : '',
        assignedUserIds:assignedUserIds
      });
    });
  
    
    await Promise.all(promises);
  
    return tasklists;
  };
  


const getTasks = async(listid,id)=>{
    let tasks:taskType[] = []
    
    const taskListDocRef = doc(db, TASKLISTCOLLECTION, listid); 
    const tasksCollectionRef = collection(taskListDocRef, TASKLISTCOLLECTION); 
    
    const q = query(tasksCollectionRef, where("id", "==", id));
    const tasklistSnapshot = await getDocs(q);
      if (tasklistSnapshot.empty) {
        console.log('No matching documents.');
        return;
      }
      tasklistSnapshot.forEach((doc) => {
        const {title,taskListid,description,id} = doc.data()
        tasks.push({
            id:id,
            title:title,
            editMode:true,
            description:description,
            collapsed:true,
            taskListid:taskListid
        })
        
      });
      
    
   return tasks
}
  
// ------------------------chats---------------------------------

export const BE_startChart= async(
  dispatch:AppDispatch,
  loading:setLoading,
  rId:string,
  rName:string,
)=>{
  loading(true)

  // check if doc exist
  if(getUserid()){

    const q = query(
      collection(db, CHATSCOLLECTION),
      or(
          and(
              where('senderId', '==', getUserid()),
              where('recieverId', '==', rId)
          ),
          and(
              where('senderId', '==', rId),
              where('recieverId', '==', getUserid())
          )
      )
  );
  const res = await getDocs(q)
  if (res.empty){
    const newChart = addDoc(collection(db,CHATSCOLLECTION),{
      lastMsg:'',
      senderId : getUserid(),
      recieverId : rId,
      recieverTosenderMsgCount:0,
      senderTorecieverMsgCount:0,
      updatedAt:serverTimestamp()
    })
    const res = await newChart
    await updateDoc(res,{
      id: res.id
    })
    
    loading(false)
    dispatch(setAlert({open:false}))
    
  }else{
    loading(false)
    dispatch(setAlert({open:false}))
    error(`You already have a chat with : ${rName}`)
  }
 
  
}

}
export const BE_getCharts= async(
  dispatch:AppDispatch
)=>{
  if(getUserid()){
    const q = query(collection(db,CHATSCOLLECTION), or(
      where('senderId','==',getUserid()),
      where('recieverId','==',getUserid())
    ),orderBy('updatedAt','desc'))

    onSnapshot(q,ChatsSnapshot=>{
      let chats:chatType[]=[]
      ChatsSnapshot.forEach(c=>{
        const {recieverId,senderId,updatedAt,lastMsg,id,senderTorecieverMsgCount,recieverTosenderMsgCount} = c.data()
        chats.push({
          id:id,
          recieverId:recieverId,
          senderId:senderId,
          lastMsg:lastMsg,
          recieverTosenderMsgCount:recieverTosenderMsgCount,
          senderTorecieverMsgCount:senderTorecieverMsgCount,
          updatedAt:updatedAt
        })
      })
      
      dispatch(setChats(chats))

    })


  }

}
export const createdChat=(senderId:string)=>{
  return senderId === getUserid()
}
export const BE_getMessages = async(dispatch:AppDispatch,
  chatid:string,
  loading:setLoading

)=>{
const q = query(collection(db,CHATSCOLLECTION,chatid,MESSAGECOLLECTION),orderBy('createdAt','asc'))

onSnapshot(q,messageSnaphot =>{
  let messages:messageType[] =[]
  messageSnaphot.forEach(msg=>{
    const {senderId,content,createdAt} = msg.data()
    messages.push({
      senderId:senderId,
      id : msg.id,
      content:content,
      createdAt: createdAt ? convertTime(createdAt.toDate()) : ''
    })
  })

  dispatch(setCurrentMessages(messages))
})
}
export const BE_sendMsg = async(
  chatid:string,
  message:messageType,
  loading:setLoading)=>{
loading(true)
const res = await addDoc(collection(db,CHATSCOLLECTION,chatid,MESSAGECOLLECTION,),{
  ...message,
  createdAt:serverTimestamp()
})
loading(false)

const d = await getDoc(doc(db,res.path))
if(d.exists()){
  await update_messageCount(chatid,true)
  await updateLastMsg(chatid,d.data().content)
  await updateUserinfo({})
}


}
export const update_messageCount=async(
  chatid:string,
  reset?:boolean
)=>{
    const chat = await getDoc(doc(db,CHATSCOLLECTION,chatid))

    let senderTorecieverMsgCount = chat.data()?.senderTorecieverMsgCount
    let recieverTosenderMsgCount = chat.data()?.recieverTosenderMsgCount

    if (createdChat(chat.data()?.senderId)){
        if(reset){
          recieverTosenderMsgCount = 0
        }
        else{
          senderTorecieverMsgCount++
        }
    }else{
      if(reset){
        senderTorecieverMsgCount = 0
      }
      else{
        recieverTosenderMsgCount++
      }

    }
    await updateDoc(doc(db,CHATSCOLLECTION,chatid),{
      updatedAt:serverTimestamp(),
      recieverTosenderMsgCount,
      senderTorecieverMsgCount


    })

}

export const updateLastMsg= async(chatid,message)=>{
  await update_messageCount(chatid)
await updateDoc(doc(db,CHATSCOLLECTION,chatid),{
  lastMsg:message,
  updatedAt:serverTimestamp()
})
}

