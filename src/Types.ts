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
export type taskListType ={
    id?:string
    title:string,
    userId?:string,
    editMode?:boolean,
    tasks?:[]
}
export type taskType={
    id?:string
    title:string,
    description:string,
    taskListid?:string,
    editMode?:boolean,
    collapsed?:boolean
}