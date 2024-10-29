import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { auth, db } from "./firebase.ts"
import { catchError } from "../utils/catcherrors.ts"
import { NavigateFunction } from "react-router-dom"
import { doc,setDoc,serverTimestamp, getDoc, updateDoc, addDoc, collection, query, getDocs, where, deleteDoc } from "firebase/firestore"
import { setLoading, taskListType, taskType, userType } from "../Types.ts"
import { error, success } from "../utils/toast.ts"
import { defaultUser, setUser } from "../redux/userSlice.ts"
import { AppDispatch } from "../redux/store.ts"
import { GenerateAvator } from "../utils/GenerateAvator.ts"
import { convertTime } from "../utils/ConvertTime.ts"
import { addTask, addTaskList, defaultTask, deleteTask, deleteTaskList, saveTask, saveTaskListUpdate, setTaskList } from "../redux/TaskListSlice.ts"
//Collection Names
const USERCOLLECTION ='users'
const TASKLISTCOLLECTION='tasks'
const TASKCOLLECTION = 'tasks'
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
                console.log(userinfo)
                dispatch(setUser(userinfo))
                goTo("/dashboard")
            })
            .catch(err=>{
                console.log(err.code)
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
                console.log(userinfo)
                dispatch(setUser(userinfo))
                isLoading(false)
                reset()
                goTo("/dashboard")
            })
            .catch(err=>{
                console.log(err.code)
                catchError(err.code)
                isLoading(false)
                reset()
            })
        }
}
export const BE_signout= async (dispatch:AppDispatch,goto:NavigateFunction,loading:setLoading)=>{
    signOut(auth)
    loading(true)
    const u = JSON.parse(localStorage.getItem('user') || '')
    u.id ? await updateUserinfo({id:u.id,isOffline:true})  : console.log('user id is empty')
    localStorage.removeItem('user')
    dispatch(setUser(defaultUser))
    goto("/")
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
const getUserInfo=async(id:string):Promise<userType>=>{
    const userRef =doc(db,USERCOLLECTION,id)
    const user = await getDoc(userRef)

    if(user.exists()){
        const {bio,last_seen,creation_Time,email,username,img,isOnline,id} =user.data()
        return{
            id,
            bio,
            last_seen : convertTime(last_seen.toDate()),
            creation_Time: convertTime(creation_Time.toDate()),
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
const updateUserinfo= async (
    {   id,
        username,
        img,
        isOnline,
        isOffline,
    }:{
        id:string,
        username?:string,
        img?:string,
        isOnline?:boolean,
        isOffline?:boolean,
    }
) =>{
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

//-----------------------TasksList-------------------------
export const BE_addTaskList = async(
    dispatch:AppDispatch,
    setLoading:setLoading
)=>{
    setLoading(true)
  
    const docRef = await addDoc(collection(db, TASKLISTCOLLECTION), {
        title:'Task Title',
        userId: getUserid()
    });

    console.log("Document written with ID: ", docRef.id);
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
            tasks:[]
        }
        dispatch(addTaskList(tl))
}

    // await getTasks()
    setLoading(false)
}

export const BE_getAllTasksList= async(
    dispatch:AppDispatch,
    loading:setLoading
)=>{
    const tasks = await getTaskLists()
    console.log('return of get all task: ',tasks)
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

const getTaskLists = async () => {
    let tasklists: taskListType[] = [];
    const userId = getUserid();
    const q = query(collection(db, TASKLISTCOLLECTION), where("userId", "==", userId));
    console.log('Query object:', q);
  
    const tasklistSnapshot = await getDocs(q);
  
    if (tasklistSnapshot.empty) {
      console.log('No matching documents.');
      return tasklists;
    }
  
    const promises = tasklistSnapshot.docs.map(async (doc) => {
      const { title, userId, id } = doc.data();
      const tasks = await gt(id); 
      tasklists.push({
        id: id,
        title: title,
        editMode: false,
        tasks: tasks,
        userId: userId
      });
    });
  
    
    await Promise.all(promises);
  
    return tasklists;
  };
  


const getTasks = async(listid,id)=>{
    let tasks:taskType[] = []
    console.log('list id :',listid)
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
  


