import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import userReducer from './slices/userSlice';
import projectReducer from './slices/projectSlice';
import taskReducer from './slices/taskSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    users: userReducer,
    project: projectReducer,
    task: taskReducer
  }
});

export type AppStore = typeof store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
