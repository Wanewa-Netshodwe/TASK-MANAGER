import { createSlice } from "@reduxjs/toolkit";
export const  defaultUser={
    bio:"",
    last_seen:"",
    creation_Time:"",
    email:"",
    username:"",
    img:"",
    isOnline:""
}
const initialState ={
currentUser:defaultUser
}
//default user 


const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        setUser:(state,action)=>{
                //set loged in user
                state.currentUser = action.payload
        },
        setUsers:(state,action)=>{
            //set all users
        }
    }

})
export const  {setUser,setUsers} =userSlice.actions
export default userSlice.reducer