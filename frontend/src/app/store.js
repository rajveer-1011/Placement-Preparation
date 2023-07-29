import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice'
import postReducer from '../features/posts/postSlice'
import userReducer from '../features/users/userSlice'
import courseReducer from '../features/courses/courseSlice'
import roadmapReducer from '../features/roadmaps/roadmapSlice'
import forumReducer from '../features/forum/forumSlice'
import paperReducer from '../features/papers/paperSlice'





export const store = configureStore({
  reducer: {
    auth:authReducer,
    posts:postReducer,
    users:userReducer,
    courses:courseReducer,
    roadmaps:roadmapReducer,
    forum:forumReducer,
    papers:paperReducer,

  },
});
