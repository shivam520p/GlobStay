import { getCareerData } from "@/utils/api";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

interface CareerData {
  title: string;
  exp: string;
  id: number;
  data: string;
}

interface CareerState {
  data: CareerData[] | null;
  loading: boolean;
  error: string | null;
}

const initialState: CareerState = {
  data: null,
  loading: false,
  error: null,
};

export const fetchCareerInfo = createAsyncThunk<
  CareerData[],
  void,
  { rejectValue: string }
>("api/fetch-job-title", async (_, { rejectWithValue }) => {
  try {
    const data = await getCareerData();
    return Array.isArray(data) ? data : [data]; 
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : "Failed to fetch Blog info"
    );
  }
});
const careerSlice = createSlice({
  name: "career",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCareerInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchCareerInfo.fulfilled,
        (state, action: PayloadAction<CareerData[]>) => {
          state.loading = false;
          state.data = action.payload;
        }
      )
      .addCase(fetchCareerInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default careerSlice.reducer;
