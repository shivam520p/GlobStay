import { getBannerDetails } from '@/utils/api';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface Banner {
  id: number;
  type: string;
  image: string;
  title: string;
  description: string;
}

interface BannerState {
  data: Banner[] | null;
  loading: boolean;
  error: string | null;
}

const initialState: BannerState = {
  data: null,
  loading: false,
  error: null,
};

export const fetchBannerInfo = createAsyncThunk<Banner[], { type?: string }>(
  'banner/fetchBannerInfo',
  async ({ type = 'home' }, { rejectWithValue }) => {
    try {
      const data = await getBannerDetails(type);
      return data;
    } catch (error) {
      return rejectWithValue(error || 'Failed to fetch Banner info');
    }
  }
);

const bannerSlice = createSlice({
  name: 'banner',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBannerInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBannerInfo.fulfilled, (state, action: PayloadAction<Banner[]>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchBannerInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default bannerSlice.reducer;
