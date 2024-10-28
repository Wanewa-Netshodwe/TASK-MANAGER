import { configureStore } from "@reduxjs/toolkit";
import userSlice from './userSlice.ts'
import TaskListSlicer from './TaskListSlice.ts'
export const store = configureStore({
    reducer:{
        user:userSlice,
        tasklist:TaskListSlicer
    }
})
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
