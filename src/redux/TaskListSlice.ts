import { createSlice } from "@reduxjs/toolkit";
import { taskListType, taskType } from "../Types";

export const defaultTask: taskType = {
    title: 'dummy title',
    description: 'some text'
};

export const defaultTaskList: taskListType = {
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
            console.log("Reducer setTaskList called with:", action.payload);
            if (!state.currentTaskList) {
                state.currentTaskList = [];
            }
            state.currentTaskList = action.payload;
        },
        addTaskList: (state, action) => {
            console.log("Reducer addTaskList called with:", action.payload);
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
        switchToEditMode:(state)=>{
            
        }
    }
});

export const { setTaskList, addTaskList ,saveTaskListUpdate } = TaskListSlice.actions;
export default TaskListSlice.reducer;
