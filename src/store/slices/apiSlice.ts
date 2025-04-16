import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import ApiService from '../../api/apiService';

// Define types for our state
interface ApiState {
  data: any;
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: ApiState = {
  data: null,
  loading: false,
  error: null,
};

// Define request parameter types
interface GetRequestParams {
  endpoint: string;
  params?: any;
  requiresAuth?: boolean;
}

interface PostRequestParams {
  endpoint: string;
  data: any;
  requiresAuth?: boolean;
}

// Create async thunks for API calls
export const fetchData = createAsyncThunk(
  'api/fetchData',
  async ({ endpoint, params, requiresAuth = true }: GetRequestParams, { rejectWithValue }) => {
    try {
      const response = await ApiService.get<any>(endpoint, params, requiresAuth);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to fetch data');
    }
  }
);

export const postData = createAsyncThunk(
  'api/postData',
  async ({ endpoint, data, requiresAuth = true }: PostRequestParams, { rejectWithValue }) => {
    try {
      const response = await ApiService.post<any>(endpoint, data, requiresAuth);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message || 'Failed to post data');
    }
  }
);

// Create the slice
const apiSlice = createSlice({
  name: 'api',
  initialState,
  reducers: {
    clearApiState: (state) => {
      state.data = null;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Handle fetchData
    builder
      .addCase(fetchData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchData.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'An error occurred';
      });

    // Handle postData
    builder
      .addCase(postData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(postData.fulfilled, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(postData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'An error occurred';
      });
  },
});

export const { clearApiState } = apiSlice.actions;
export default apiSlice.reducer;

