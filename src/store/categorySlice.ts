import { getCategoryDetails } from '@/utils/api';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface Category {
  id: number;
  title: string;
  image: string | null;
  status: number;
  created_at: string;
  updated_at: string;
}

interface CategoryState {
  data: Category[] | null;
  loading: boolean;
  error: string | null;
}

const initialState: CategoryState = {
  data: null,
  loading: false,
  error: null,
};

export const fetchCategoryInfo = createAsyncThunk<Category[]>(
    'category/fetchCategoryInfo',
    async (_, { rejectWithValue }) => {
      try {
        const data = await getCategoryDetails();
        return data;
      } catch (error) {
        return rejectWithValue(error || 'Failed to fetch category info');
      }
    }
  );

const categorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCategoryInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategoryInfo.fulfilled, (state, action: PayloadAction<Category[]>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchCategoryInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default categorySlice.reducer;
