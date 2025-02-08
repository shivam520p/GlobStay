import { getAboutGallary } from '@/utils/api';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface Gallary {
    id: number;
    image: string;
  }
  
interface GallaryState {
  data: Gallary[] | null;
  loading: boolean;
  error: string | null;
}

const initialState: GallaryState = {
  data: null,
  loading: false,
  error: null,
};

export const fetchGallaryInfo = createAsyncThunk<Gallary[]>(
    'gallary/fetchGallaryInfo',
    async (_, { rejectWithValue }) => {
      try {
        const data = await getAboutGallary();
        return data;
      } catch (error) {
        return rejectWithValue(error || 'Failed to fetch Gallary info');
      }
    }
  );

const gallarySlice = createSlice({
  name: 'gallary',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchGallaryInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchGallaryInfo.fulfilled, (state, action: PayloadAction<Gallary[]>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchGallaryInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default gallarySlice.reducer;
