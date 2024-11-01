import { createSlice } from "@reduxjs/toolkit";

const initialState ={
    ischatTab:true
}

const chats=createSlice({
    name:'chats',
    initialState,
    reducers:{
        setChatTab:(state,action)=>{
            console.log(action.payload)
            state.ischatTab = action.payload
        }
    }

})
export const  {setChatTab}  = chats.actions
export default chats.reducer