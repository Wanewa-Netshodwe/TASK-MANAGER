import { createSlice } from "@reduxjs/toolkit";
export const  defaultUser={
    id:'id',
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
                const user = action.payload
                localStorage.setItem('user',JSON.stringify(user))
                //set loged in user
                state.currentUser = user
        },
        setUsers:(state,action)=>{
            //set all users
        }
    }

})
export const  {setUser,setUsers} =userSlice.actions
export default userSlice.reducer