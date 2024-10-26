import { createSlice } from "@reduxjs/toolkit";
const initialState ={

}
//default user 
export const  defaultUser={
    bio:"",
    last_seen:"",
    creation_Time:"",
    email:"",
    username:"",
    img:"",
    isOnline:""
}

const userSlice = createSlice({
    name:"user",
    initialState,
    reducers:{
        setUser:(state,action)=>{
                //set loged in user
        },
        setUsers:(state,action)=>{
            //set all users
        }
    }

})
export const  {setUser,setUsers} =userSlice.actions
export default userSlice.reducer