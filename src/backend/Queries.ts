import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth"
import { auth, db } from "./firebase.ts"
import { catchError } from "../utils/catcherrors.ts"
import { NavigateFunction } from "react-router-dom"
import { doc,setDoc,serverTimestamp, getDoc } from "firebase/firestore"
import { userType } from "../Types.ts"
import { error } from "../utils/toast.ts"
import { defaultUser } from "../redux/userSlice.ts"
//Collection Names
const USERCOLLECTION ='users'

export const BE_signup =(data:{
    email:string,
    password:string,
    username:string
},
isLoading:React.Dispatch<React.SetStateAction<boolean>>,
reset:()=>void,
goTo:NavigateFunction
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
            .then(({user})=>{
                const userinfo = AddUserToCollection(user.uid,user.email || '','img_link',username)
                isLoading(false)
                reset()
                console.log(userinfo)
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
goTo:NavigateFunction

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
            .then(userCred=>{
                console.log(userCred)
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
const AddUserToCollection = async(
    id:string,
    email:string,
    img:string,
    username:string,
     
)=>{
    await setDoc(doc(db,USERCOLLECTION,id),{
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
        const {bio,last_seen,creation_Time,email,username,img,isOnline} =user.data()
        return{
            bio,
            last_seen,
            creation_Time,
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