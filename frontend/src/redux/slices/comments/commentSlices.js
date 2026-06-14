import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

import {
  resetErrorAction,
  resetSuccessAction,
} from "../globalSlice/globalSlices";
import API_URL from "../../../config";

//initialstate
const INITIAL_STATE = {
  loading: false,
  error: null,
  comments: [],
  comment: null,
  success: false,
};

// ! Create Comment
export const createCommentAction = createAsyncThunk(
  "comment/create",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    try {
      const token = getState().users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.post(
        `${API_URL}/comments/${payload?.postId}`,
        {
          message: payload?.message,
        },
        config,
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  },
);

//! comment slices
const commentSlice = createSlice({
  name: "comments",
  initialState: INITIAL_STATE,
  extraReducers: (builder) => {
    //create comment
    builder.addCase(createCommentAction.pending, (state, action) => {
      state.loading = true;
    });

    builder.addCase(createCommentAction.fulfilled, (state, action) => {
      state.comment = action.payload;
      state.loading = false;
      state.error = null;
      state.success = true
    });
    builder.addCase(createCommentAction.rejected, (state, action) => {
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

//! generate reducer
const commentReducer = commentSlice.reducer;

export default commentReducer;
