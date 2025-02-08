import { getBlogDetails } from '@/utils/api';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface Blog {
  id: number;
  title: string;
  image: string;
  short_content: string;
  long_content: string;
  posted_at: string;
}

interface BlogState {
  data: Blog[] | null;
  loading: boolean;
  error: string | null;
}

const initialState: BlogState = {
  data: null,
  loading: false,
  error: null,
};

export const fetchBlogInfo = createAsyncThunk<Blog[]>(
    'blog/fetchBlogInfo',
    async (_, { rejectWithValue }) => {
      try {
        const data = await getBlogDetails({});
        return data;
      } catch (error) {
        return rejectWithValue(error || 'Failed to fetch Blog info');
      }
    }
  );

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlogInfo.fulfilled, (state, action: PayloadAction<Blog[]>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchBlogInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default blogSlice.reducer;
