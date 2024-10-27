import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut } from "firebase/auth"
import { auth, db } from "./firebase.ts"
import { catchError } from "../utils/catcherrors.ts"
import { NavigateFunction } from "react-router-dom"
import { doc,setDoc,serverTimestamp, getDoc, updateDoc } from "firebase/firestore"
import { userType } from "../Types.ts"
import { error } from "../utils/toast.ts"
import { defaultUser, setUser } from "../redux/userSlice.ts"
import { AppDispatch } from "../redux/store.ts"
import { GenerateAvator } from "../utils/GenerateAvator.ts"
import { convertTime } from "../utils/ConvertTime.ts"
//Collection Names
const USERCOLLECTION ='users'

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
export const BE_signout= async (dispatch:AppDispatch,goto:NavigateFunction)=>{
    signOut(auth)
    const u = JSON.parse(localStorage.getItem('user') || '')
    u.id ? await updateUserinfo({id:u.id,isOffline:true})  : console.log('user id is empty')
    localStorage.removeItem('user')
    dispatch(setUser(defaultUser))
    goto("/")
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