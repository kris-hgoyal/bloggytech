import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {
  resetErrorAction,
  resetSuccessAction,
} from "../globalSlice/globalSlices";

const INITIAL_STATE = {
  loading: false,
  error: null,
  success: false,
  users: [],
  user: null,
  isUpdated: false,
  isDeleted: false,
  isEmailSent: false,
  isPasswordReset: false,
  profile: {},
  userAuth: {
    error: null,
    userInfo: localStorage.getItem("userInfo")
      ? JSON.parse(localStorage.getItem("userInfo"))
      : null,
  },
};

//Login Action
export const loginAction = createAsyncThunk(
  "users/login",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    //make request
    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/v1/users/login",
        payload,
      );
      localStorage.setItem("userInfo", JSON.stringify(data));
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  },
);

//Register Action
export const registerAction = createAsyncThunk(
  "users/register",
  async (payload, { rejectWithValue, getState, dispatch }) => {
    //make request
    try {
      const { data } = await axios.post(
        "http://localhost:3000/api/v1/users/register",
        payload,
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  },
);

//Logout Action
export const logoutAction = createAsyncThunk("users/logout", async () => {
  localStorage.removeItem("userInfo");
  return data;
});

//! Get User Public Profile Action
export const userPublicProfileAction = createAsyncThunk(
  "users/user-public-profile",
  async (userId, { rejectWithValue, getState, dispatch }) => {
    //make request
    try {
      const token = getState().users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.get(
        `http://localhost:3000/api/v1/users/public-profile/${userId}`,
        config,
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  },
);

//! Block User Action
export const blockUserAction = createAsyncThunk(
  "users/block-user",
  async (userId, { rejectWithValue, getState, dispatch }) => {
    //make request
    try {
      const token = getState().users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.put(
        `http://localhost:3000/api/v1/users/block/${userId}`,
        {},
        config,
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  },
);

//! UnBlock User Action
export const unBlockUserAction = createAsyncThunk(
  "users/unblock-user",
  async (userId, { rejectWithValue, getState, dispatch }) => {
    //make request
    try {
      const token = getState().users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.put(
        `http://localhost:3000/api/v1/users/unblock/${userId}`,
        {},
        config,
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  },
);

//! Get User Private Profile Action
export const userPrivateProfileAction = createAsyncThunk(
  "users/user-private-profile",
  async (userId, { rejectWithValue, getState, dispatch }) => {
    //make request
    try {
      const token = getState().users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.get(
        `http://localhost:3000/api/v1/users/profile/`,
        config,
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  },
);

//!Follow User Action
export const followUserAction = createAsyncThunk(
  "users/follow-user",
  async (userId, { rejectWithValue, getState, dispatch }) => {
    //make request
    try {
      const token = getState().users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.put(
        `http://localhost:3000/api/v1/users/follow/${userId}`,
        {},
        config,
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  },
);

//!UnFollow User Action
export const unFollowUserAction = createAsyncThunk(
  "users/unfollow-user",
  async (userId, { rejectWithValue, getState, dispatch }) => {
    //make request
    try {
      const token = getState().users?.userAuth?.userInfo?.token;
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await axios.put(
        `http://localhost:3000/api/v1/users/unfollow/${userId}`,
        {},
        config,
      );
      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  },
);

//Update User Profile Action
export const updateProfileAction = createAsyncThunk(
  "users/update-profile",
  async (payload, { rejectWithValue, getState }) => {
    try {
      const token = getState().users?.userAuth?.userInfo?.token;

      const formData = new FormData();

      formData.append("username", payload.username);
      formData.append("bio", payload.bio);
      formData.append("location", payload.location);
      formData.append("gender", payload.gender);

      if (payload.profilePicture) {
        formData.append("profilePicture", payload.profilePicture);
      }

      if (payload.coverImage) {
        formData.append("coverImage", payload.coverImage);
      }

      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const { data } = await axios.put(
        "http://localhost:3000/api/v1/users/update-profile",
        formData,
        config,
      );

      const currentUser = getState().users?.userAuth?.userInfo;

      const updatedUserInfo = {
        ...currentUser,
        ...data.user,
      };

      const storedData = JSON.parse(localStorage.getItem("userInfo"));

      const updatedStorage = {
        ...storedData,
        ...data.user,
      };

      localStorage.setItem("userInfo", JSON.stringify(updatedStorage));

      return data;
    } catch (error) {
      return rejectWithValue(error?.response?.data);
    }
  },
);

const usersSlice = createSlice({
  name: "users",
  initialState: INITIAL_STATE,
  extraReducers: (builder) => {
    //login builders
    builder.addCase(loginAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(loginAction.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.error = null;
      state.userAuth.userInfo = action.payload;
    });
    builder.addCase(loginAction.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    });

    //register builders
    builder.addCase(registerAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(registerAction.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.error = null;
      state.user = action.payload;
    });
    builder.addCase(registerAction.rejected, (state, action) => {
      state.loading = false;
      state.success = false;
      state.error = action.payload;
    });

    //get user public profile
    builder.addCase(userPublicProfileAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(userPublicProfileAction.fulfilled, (state, action) => {
      state.user = action.payload;
      state.success = true;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(userPublicProfileAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    //block user
    builder.addCase(blockUserAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(blockUserAction.fulfilled, (state, action) => {
      state.success = true;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(blockUserAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    //unblock user
    builder.addCase(unBlockUserAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(unBlockUserAction.fulfilled, (state, action) => {
      state.success = true;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(unBlockUserAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    //get user private profile
    builder.addCase(userPrivateProfileAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(userPrivateProfileAction.fulfilled, (state, action) => {
      state.profile = action.payload;
      state.success = true;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(userPrivateProfileAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    //follow user
    builder.addCase(followUserAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(followUserAction.fulfilled, (state, action) => {
      state.success = true;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(followUserAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    }); //unfollow user
    builder.addCase(unFollowUserAction.pending, (state, action) => {
      state.loading = true;
    });
    builder.addCase(unFollowUserAction.fulfilled, (state, action) => {
      state.success = true;
      state.loading = false;
      state.error = null;
    });
    builder.addCase(unFollowUserAction.rejected, (state, action) => {
      state.error = action.payload;
      state.loading = false;
    });

    builder.addCase(updateProfileAction.pending, (state) => {
      state.loading = true;
    });

    builder.addCase(updateProfileAction.fulfilled, (state, action) => {
      state.loading = false;
      state.success = true;
      state.userAuth.userInfo = {
        ...state.userAuth.userInfo,
        ...action.payload.user,
      };
    });

    builder.addCase(updateProfileAction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
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

const usersReducer = usersSlice.reducer;
export default usersReducer;
