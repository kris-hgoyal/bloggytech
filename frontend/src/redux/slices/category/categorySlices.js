import {createAsyncThunk , createSlice} from '@reduxjs/toolkit'
import axios from "axios";
import { resetErrorAction, resetSuccessAction } from '../globalSlice/globalSlices';
import API_URL from '../../../config';
const INITIAL_STATE  ={
    loading:false,
    error:null,
    success:false,
    categories:[],
    category:null,
};

//fetchCategoriesAction
export const fetchCategoriesAction = createAsyncThunk("categories/list", async(payload,{rejectWithValue,getState,dispatch})=>{
    //make request
    try{
        const {data} = await axios.get(`${API_URL}/categories`)
        return data;
    }
    catch(error){
        return rejectWithValue(error?.response?.data);
    }
});


const categoriesSlice = createSlice({
    name:"categories",
    initialState:INITIAL_STATE,
    extraReducers:(builder)=>{
        //fetchCategories
        builder.addCase(fetchCategoriesAction.pending,(state,action)=>{
            state.loading = true;
        });
        builder.addCase(fetchCategoriesAction.fulfilled,(state,action)=>{
            state.loading = false;
            state.success = true;
            state.error = null;
            state.categories = action.payload; 
        });
        builder.addCase(fetchCategoriesAction.rejected,(state,action)=>{
            state.loading = false;
            state.success = false;
            state.error = action.payload;
        });

        //reset error action
        builder.addCase(resetErrorAction, state=>{state.error = null})
        builder.addCase(resetSuccessAction, state=>{state.success = false})
    }
});

const categoriesReducer = categoriesSlice.reducer;
export default categoriesReducer;