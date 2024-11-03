import { createSlice } from "@reduxjs/toolkit";
import { userType } from "../Types";
export const  defaultUser={
    id:'',
    bio:"",
    last_seen:"",
    creation_Time:"",
    email:"",
    username:"",
    img:"",
    isOnline:""
}
export type usersStateType ={
    toggleUsers:boolean,
    isAlertOpen:{
        open:boolean,
        receiverId?:string,
        recieverName?:string
    }
    users:userType[],
    currentUser:userType
}
const initialState:usersStateType ={
    toggleUsers:true,
    isAlertOpen:{
        open:false,
    },
    users:[],
currentUser:defaultUser
}
 


const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        setUser:(state,action)=>{
                const user = action.payload
                localStorage.setItem('user',JSON.stringify(user))
                //set loged in user
                state.currentUser = user
        },
        setUsers:(state,action)=>{
            state.users = action.payload
        },
        setAlert:(state,action)=>{
            state.isAlertOpen=action.payload
        },
        setToggle:(state)=>{
            state.toggleUsers = !state.toggleUsers
        }
    }

})
export const  {setUser,setUsers,setAlert,setToggle} =userSlice.actions
export default userSlice.reducer