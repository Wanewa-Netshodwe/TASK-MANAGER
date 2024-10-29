import { createSlice } from "@reduxjs/toolkit";
import { taskListType, taskType } from "../Types";

export const defaultTask: taskType = {
    id:'',
    title: 'Something to do at 17H00',
    description: 'i have to do something at 5'
};

export const defaultTaskList: taskListType = {
    id:'i',
    title: 'Task Title',
};

type currentTaskListSliceType = {
    currentTaskList: taskListType[]
};

const initialState: currentTaskListSliceType = {
    currentTaskList: [],
};

const TaskListSlice = createSlice({
    name: "tasklist",
    initialState,
    reducers: {
        setTaskList: (state, action) => {
            if (!state.currentTaskList) {
                state.currentTaskList = [];
            }
            state.currentTaskList = action.payload;
        },
        addTaskList: (state, action) => {
            if (!state.currentTaskList) {
                state.currentTaskList = [];
            }
            state.currentTaskList.unshift(action.payload);
        },
        saveTaskListUpdate:(state,action)=>{
            const {id,title} = action.payload
            state.currentTaskList = state.currentTaskList.map(t=>{
                if(t.id === id){
                    t.title = title
                    t.editMode=false
                    
                }
                return t
            })
        },
        switchToTastListEditMode:(state,action)=>{
            const {id,value} = action.payload
            state.currentTaskList = state.currentTaskList.map(tl=>{
                if (tl.id === id){
                    tl.editMode = value 
                }
                return tl
            })
            
        },
        deleteTaskList:(state,action)=>{
            const id = action.payload
            state.currentTaskList = state.currentTaskList.filter(tl => (tl.id !== id))

        },
        addTask: (state, action) => {
            const tasks = action.payload;
        
            tasks.forEach(task => {
                state.currentTaskList = state.currentTaskList.map(tl => {
                    if (tl.id === task.taskListid) { // Fixing the reference to taskListId in each task
                        if (tl.tasks) {
                            tl.tasks.push(task);
                        } else {
                            tl.tasks = [task];
                        }
                    }
                    return tl;
                });
            });
        },
        collapseTask:(state,action)=>{
            const {listid,value,taskid} = action.payload
            state.currentTaskList = state.currentTaskList.map(tl=>{
                if(tl.id === listid){
                    tl.tasks?.forEach(t=>{
                        if(t.id === taskid){
                            t.collapsed = value
                        }
                    })
                }
                return tl
            })

        },
        saveTask:(state,action)=>{
            const {listid,taskid,title,description} = action.payload
            state.currentTaskList = state.currentTaskList.map(tl=>{
                if(tl.id === listid){
                    tl.tasks?.forEach(t=>{
                        if(t.id === taskid){
                            t.collapsed = false
                            t.description = description
                            t.title = title
                            t.editMode =false
                        }
                    })
                }
                return tl
            })

        },
        switchEditModeTask:(state,action)=>{
            const {listid,taskid} = action.payload
            state.currentTaskList = state.currentTaskList.map(tl=>{
                if(tl.id === listid){
                    tl.tasks?.forEach(t=>{
                        if(t.id === taskid){
                            t.editMode =true
                        }
                    })
                }
                return tl
            })
        },
        collapseAll:(state,action)=>{
            const {id,value} = action.payload
            state.currentTaskList = state.currentTaskList.map(tl=>{
                if(tl.id === id){
                    tl.tasks?.forEach(t=>{
                       t.collapsed=value
                    })
                }
                return tl
            })
        },
        deleteTask:(state,action)=>{
            const {taskListid,id} = action.payload
            state.currentTaskList.map(tl =>{
                if(taskListid === tl.id){
                    tl.tasks = tl.tasks?.filter(t=> (t.id !== id))
                }
                return tl
            })
        }
        
        
    }
});

export const {deleteTask,switchEditModeTask,collapseAll,saveTask,collapseTask, setTaskList, addTaskList ,saveTaskListUpdate,switchToTastListEditMode,deleteTaskList,addTask} = TaskListSlice.actions;
export default TaskListSlice.reducer;
