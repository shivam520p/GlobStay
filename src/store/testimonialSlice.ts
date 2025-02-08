import { getTestimonialDetails } from '@/utils/api';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface Testimonial {
  id: number; 
  name: string;
  image: string; 
  rate_count: number; 
  designation: string; 
  description: string;
  title: string;
  status?: number;
  created_at?: string;
  updated_at?: string;
}

interface TestimonialState {
  data: Testimonial[] | null;
  loading: boolean;
  error: string | null;
}

const initialState: TestimonialState = {
  data: null,
  loading: false,
  error: null,
};

export const fetchTestimonialInfo = createAsyncThunk<Testimonial[]>(
    'testimonial/fetchTestimonialInfo',
    async (_, { rejectWithValue }) => {
      try {
        const data = await getTestimonialDetails();
        return data;
      } catch (error) {
        return rejectWithValue(error || 'Failed to fetch testimonial info');
      }
    }
  );

const testimonialSlice = createSlice({
  name: 'testimonial',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTestimonialInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTestimonialInfo.fulfilled, (state, action: PayloadAction<Testimonial[]>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchTestimonialInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default testimonialSlice.reducer;
