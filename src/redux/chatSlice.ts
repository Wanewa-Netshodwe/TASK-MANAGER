import { createSlice } from "@reduxjs/toolkit";
import { chatType, messageType, userType } from "../Types";
import { defaultUser } from "./userSlice.ts";

type ChatsStatetype={
chats:chatType[],
ischatTab:boolean,
currentselectedChat:userType & {
    chatId?:string,
    recieverTosenderMsgCount?:number,
    senderTorecieverMsgCount?:number
},
currentMessages:messageType[]
}
const initialState :ChatsStatetype ={
    chats:[],
    ischatTab:true,
    currentselectedChat:defaultUser,
    currentMessages:[]
}

const chats=createSlice({
    name:'chats',
    initialState,
    reducers:{
        setChatTab:(state,action)=>{
            console.log(action.payload)
            state.ischatTab = action.payload
        },
        setChats:(state,action)=>{
            state.chats = action.payload
        },
        setCurrentSelectedChat:(state,action)=>{
            state.currentselectedChat = action.payload
        },
        setCurrentMessages:(state,action)=>{
            state.currentMessages = action.payload
        }
    }

})
export const  {setCurrentMessages,setChatTab,setChats,setCurrentSelectedChat}  = chats.actions
export default chats.reducer