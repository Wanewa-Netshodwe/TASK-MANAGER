export type  userType={
    id:string
    bio?:string,
    last_seen?:string,
    creation_Time?:string,
    email:string,
    username:string,
    img:string,
    isOnline:string
}
export type taskDeadline ={
    date:Date,
    id:string
}
export type taskListType ={
    id?:string
    title:string,
    userId?:string,
    editMode?:boolean,
    completed?:boolean,
    deadline?:string
    tasks?:taskType[],
    assignedUserIds?:string[],
    failed?:boolean
}
export type taskType={
    id?:string
    title:string,
    description:string,
    taskListid?:string,
    editMode?:boolean,
    collapsed?:boolean
}
export type chatType={
    senderId:string,
    recieverId:string,
    id:string,
    recieverTosenderMsgCount?:number,
    senderTorecieverMsgCount?:number,
    updatedAt?:string,
    lastMsg?:string

}
export type messageType={
    senderId:string,
    content?:string,
    id?:string,
    createdAt?:string
}
export type setLoading=React.Dispatch<React.SetStateAction<boolean>>