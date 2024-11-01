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
    isAlertOpen:boolean
    users:userType[],
    currentUser:userType
}
const initialState:usersStateType ={
    isAlertOpen:false,
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
        }
    }

})
export const  {setUser,setUsers,setAlert} =userSlice.actions
export default userSlice.reducer