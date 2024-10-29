import { createSlice } from "@reduxjs/toolkit";
import { taskListType, taskType } from "../Types";

export const defaultTask: taskType = {
    id:'',
    title: 'dummy title',
    description: 'some text'
};

export const defaultTaskList: taskListType = {
    id:'i',
    title: 'Task Title'
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

        }
    }
});

export const { setTaskList, addTaskList ,saveTaskListUpdate,switchToTastListEditMode,deleteTaskList} = TaskListSlice.actions;
export default TaskListSlice.reducer;
