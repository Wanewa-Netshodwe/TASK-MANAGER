import { toast } from "react-toastify"
export const error =(msg:string)=>{
    toast.error(msg)
}
export const success =(msg:string)=>{
    toast.success(msg)
}
export const info =(msg:string)=>{
    toast.info(msg)
}