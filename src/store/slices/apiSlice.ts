import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import ApiService from '../../api/apiService';
import { API_ENDPOINTS } from '../../constants/ApiEndPoints';

// Define types for our state
interface ApiState {
  singleData: any;
  doubleData: any;
  report:any,
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: ApiState = {
  singleData: null,
  doubleData: null,
  report:null,
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
      return { endpoint, data: response.data };
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
      return { endpoint, data: response.report ? response.report : response.data };
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
      state.singleData = null;
      state.doubleData = null;
      state.report = null;
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
      .addCase(fetchData.fulfilled, (state, action: PayloadAction<{endpoint: string, data: any}>) => {
        state.loading = false;
        if (action.payload.endpoint === API_ENDPOINTS.GET_SINGLE_DATA) {
          state.singleData = action.payload.data;
        } else if (action.payload.endpoint === API_ENDPOINTS.GET_DOUBLE_DATA) {
          state.doubleData = action.payload.data;
        }
         else if (action.payload.endpoint === API_ENDPOINTS.MONTH_REPORT) {
          state.report = action.payload.data;
        }
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
      .addCase(postData.fulfilled, (state, action: PayloadAction<{endpoint: string, data: any}>) => {
        state.loading = false;
        if (action.payload.endpoint === API_ENDPOINTS.GET_SINGLE_DATA) {
          state.singleData = action.payload.data;
        } else if (action.payload.endpoint === API_ENDPOINTS.GET_DOUBLE_DATA) {
          state.doubleData = action.payload.data;
        }
        else if (action.payload.endpoint === API_ENDPOINTS.MONTH_REPORT) {
          state.report = action.payload.data;
        }
      })
      .addCase(postData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'An error occurred';
      });
  },
});

export const { clearApiState } = apiSlice.actions;
export default apiSlice.reducer;


