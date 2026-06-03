import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  resetErrorAction,
  resetSuccessAction,
  resetPostAction,
} from "../globalSlice/globalSlices";

const INITIAL_STATE = {
  loading: false,
  error: null,
  success: false,
  posts: [],
  post: null,
};

//fetch public posts Action
export const fetchPublicPostsAction = createAsyncThunk(
  "posts/public-fetch-post",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    //make request
    try {
      const { data } = await axios.get(
        "http://localhost:3000/api/v1/posts/public",
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  },
);

//fetch private posts Action
export const fetchPrivatePostsAction = createAsyncThunk(
  "posts/private-post",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    //make request
    try {
      const token = getState().users?.userAuth.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.get(
        "http://localhost:3000/api/v1/posts",
        config,
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  },
);

//fetch single post Action
export const getPostAction = createAsyncThunk(
  "posts/get-post",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    //make request
    try {
      const { data } = await axios.get(
        `http://localhost:3000/api/v1/posts/${payload}`,
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  },
);

//addPostAction
export const addPostAction = createAsyncThunk(
  "posts/create",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    //make request
    try {
      //convert payload to form data
      const formData = new FormData();
      formData.append("title", payload?.title);
      formData.append("content", payload?.content);
      formData.append("categoryId", payload?.category);
      formData.append("file", payload?.image);

      const token = getState().users?.userAuth.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.post(
        "http://localhost:3000/api/v1/posts",
        formData,
        config,
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  },
);

//deletePostAction
export const deletePostAction = createAsyncThunk(
  "posts/delete-post",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    //make request
    try {
      const token = getState().users?.userAuth.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.delete(
        `http://localhost:3000/api/v1/posts/${payload}`,
        config,
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  },
);


// updatePostAction
export const updatePostAction = createAsyncThunk(
  "post/update",
  async (payload, { rejectWithValue, getState }) => {
    try {
      const token = getState().users?.userAuth?.userInfo?.token;

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.put(
        `http://localhost:3000/api/v1/posts/update/${payload.postId}`,
        {
          title: payload.title,
          categoryId: payload.category,
        },
        config
      );

      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  }
);

//like post
export const likePostAction = createAsyncThunk(
  "posts/like",
  async (postId, { rejectWithValue, getState, dispatch }) => {
    //make request
    try {
      const token = getState().users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.put(
        `http://localhost:3000/api/v1/posts/like/${postId}`,
        {},
        config,
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  },
);

//dislike post
export const dislikePostAction = createAsyncThunk(
  "posts/dislike",
  async (postId, { rejectWithValue, getState, dispatch }) => {
    //make request
    try {
      const token = getState().users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.put(
        `http://localhost:3000/api/v1/posts/dislike/${postId}`,
        {},
        config,
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  },
);

//!clapping a  post
export const clapPostAction = createAsyncThunk(
  "posts/clap",
  async (postId, { rejectWithValue, getState, dispatch }) => {
    //make request
    try {
      const token = getState().users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.put(
        `http://localhost:3000/api/v1/posts/clap/${postId}`,
        {},
        config,
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  },
);

//!post view count
export const postViewCountAction = createAsyncThunk(
  "posts/post-view",
  async (postId, { rejectWithValue, getState, dispatch }) => {
    //make request
    try {
      const token = getState().users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.put(
        `http://localhost:3000/api/v1/posts/${postId}/post-view-count`,
        {},
        config,
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  },
);

const postsSlice = createSlice({
  name: "posts",
  initialState: INITIAL_STATE,
  extraReducers: (builder) => {
    //fetchPublicPostsAction
    builder.addCase(fetchPublicPostsAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchPublicPostsAction.fulfilled, (state, action) => {
      state.loading = false;
      // state.success = true;
      state.error = null;
      state.posts = action.payload;
    });
    builder.addCase(fetchPublicPostsAction.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    });

    //fetchPrivatePostsAction
    builder.addCase(fetchPrivatePostsAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(fetchPrivatePostsAction.fulfilled, (state, action) => {
      state.loading = false;
      // state.success = true;
      state.error = null;
      state.posts = action.payload;
    });
    builder.addCase(fetchPrivatePostsAction.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    });

    //deletePostAction
    builder.addCase(deletePostAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(deletePostAction.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.error = null;
    });
    builder.addCase(deletePostAction.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    });

    //updatePostAction
    builder.addCase(updatePostAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(updatePostAction.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.error = null;
    });
    builder.addCase(updatePostAction.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
    });

    builder.addCase(getPostAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(getPostAction.fulfilled, (state, action) => {
      state.loading = false;
      // state.success = true;
      state.error = null;
      state.post = action.payload;
    });
    builder.addCase(getPostAction.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      // state.error = action.payload;
    });

    //addPost builders
    builder.addCase(addPostAction.pending, (state, action) => {
      console.log("addpost pending");
      state.loading = true;
    });
    builder.addCase(addPostAction.fulfilled, (state, action) => {
      console.log("addpost fullfiled");
      state.loading = false;
      state.success = true;
      state.error = null;
      state.post = action.payload;
    });
    builder.addCase(addPostAction.rejected, (state, action) => {
      console.log("addpost rejected");
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    });

    //like post
    builder.addCase(likePostAction.pending, (state, action) => {
      // state.loading = true;
    });
    builder.addCase(likePostAction.fulfilled, (state, action) => {
      state.post = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(likePostAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    // dislike post
    builder.addCase(dislikePostAction.pending, (state, action) => {
      // state.loading = true;
    });
    builder.addCase(dislikePostAction.fulfilled, (state, action) => {
      state.post = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(dislikePostAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    //! clap post
    builder.addCase(clapPostAction.pending, (state, action) => {
      // state.loading = true;
    });
    builder.addCase(clapPostAction.fulfilled, (state, action) => {
      state.post = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(clapPostAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    //! postViewCountAction
    builder.addCase(postViewCountAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(postViewCountAction.fulfilled, (state, action) => {
      state.post = action.payload;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(postViewCountAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    //reset error action
    builder.addCase(resetErrorAction, (state) => {
      state.error = null;
    });
    builder.addCase(resetSuccessAction, (state) => {
      state.success = false;
    });
  },
});

const postsReducer = postsSlice.reducer;
export default postsReducer;
