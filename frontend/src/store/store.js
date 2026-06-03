import {configureStore} from '@reduxjs/toolkit';
import usersReducer from '../redux/slices/users/userSlices';
import postsReducer from '../redux/slices/posts/postSlices';
import categoriesReducer from '../redux/slices/category/categorySlices';
import commentReducer from '../redux/slices/comments/commentSlices';

//!Store
const store = configureStore({
    reducer:{
        users:usersReducer,
        posts:postsReducer,
        categories:categoriesReducer,
        comments:commentReducer
    }
});


export default store
