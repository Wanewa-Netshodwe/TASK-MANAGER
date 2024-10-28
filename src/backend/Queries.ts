import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { auth, db } from "./firebase.ts"
import { catchError } from "../utils/catcherrors.ts"
import { NavigateFunction } from "react-router-dom"
import { doc,setDoc,serverTimestamp, getDoc, updateDoc, addDoc, collection, query, getDocs, where } from "firebase/firestore"
import { taskListType, userType } from "../Types.ts"
import { error } from "../utils/toast.ts"
import { defaultUser, setUser } from "../redux/userSlice.ts"
import { AppDispatch } from "../redux/store.ts"
import { GenerateAvator } from "../utils/GenerateAvator.ts"
import { convertTime } from "../utils/ConvertTime.ts"
import { addTaskList, saveTaskListUpdate, setTaskList } from "../redux/TaskListSlice.ts"
//Collection Names
const USERCOLLECTION ='users'
const TASKLISTCOLLECTION='tasks'
export const getUserid=()=>{
    return JSON.parse(localStorage.getItem('user')|| '{}').id
}
export const BE_signup =(data:{
    email:string,
    password:string,
    username:string
},
isLoading:React.Dispatch<React.SetStateAction<boolean>>,
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
isLoading:React.Dispatch<React.SetStateAction<boolean>>,
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
export const BE_signout= async (dispatch:AppDispatch,goto:NavigateFunction,loading:React.Dispatch<React.SetStateAction<boolean>>)=>{
    signOut(auth)
    loading(true)
    const u = JSON.parse(localStorage.getItem('user') || '')
    u.id ? await updateUserinfo({id:u.id,isOffline:true})  : console.log('user id is empty')
    localStorage.removeItem('user')
    dispatch(setUser(defaultUser))
    goto("/")
    loading(false)
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

//-----------------------Tasks-------------------------
export const BE_addTask = async(
    dispatch:AppDispatch,
    setLoading:React.Dispatch<React.SetStateAction<boolean>>
)=>{
    setLoading(true)
    const tasklist:taskListType={
        title:'Task Title',
        userId: getUserid()
    }
    // Add a new document with a generated id.
    const docRef = await addDoc(collection(db, TASKLISTCOLLECTION), {
        title:'Task Title',
        userId: getUserid()
    });

    console.log("Document written with ID: ", docRef.id);
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

export const BE_getAllTasks= async(
    dispatch:AppDispatch,
    loading:React.Dispatch<React.SetStateAction<boolean>>
)=>{
    const tasks = await getTasks()
    dispatch(setTaskList(tasks))
    loading(false)
}
export const BE_saveTaskList= async(
    dispatch:AppDispatch,
    id:string,
    title:string,
    loading:React.Dispatch<React.SetStateAction<boolean>>
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

const getTasks = async () => {
      let tasklists:taskListType[] = []
      const id = getUserid();
      const q = query(collection(db, TASKLISTCOLLECTION), where("userId", "==", id));
      console.log('Query object:', q);
      const tasklistSnapshot = await getDocs(q);
      if (tasklistSnapshot.empty) {
        console.log('No matching documents.');
        return;
      }
      tasklistSnapshot.forEach((doc) => {
        const {title,userId} = doc.data()
        tasklists.push({
            title:title,
            editMode:false,
            tasks:[],
            userId:userId
        })
        
      });
    
   return tasklists
  };
  


