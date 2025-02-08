// aboutUsSlice.ts
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getAboutPageData } from "@/utils/api"; // Assuming this is your API utility.

interface AboutData {
  id: number;
  data: string[];
  page_name:string;
  image: string;
  title: string;
  paragraph: string;
}

interface AboutState {
  data: AboutData[] | null; // Change to AboutData[] to handle multiple items
  loading: boolean;
  error: string | null;
}

const initialState: AboutState = {
  data: null,
  loading: false,
  error: null,
};

// Define the async thunk to fetch about data
export const fetchAboutInfo = createAsyncThunk<
  AboutData[],
  void,
  { rejectValue: string }
>("aboutUs/fetchAboutInfo", async (_, { rejectWithValue }) => { // Change return type to AboutData[]
  try {
    const data = await getAboutPageData(); // Make sure your API call works as expected.
    return data; // Return the array of AboutData
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : "Failed to fetch About info"
    );
  }
});

const aboutUsSlice = createSlice({
  name: "aboutUs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAboutInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchAboutInfo.fulfilled,
        (state, action: PayloadAction<AboutData[]>) => {
          // Change to AboutData[]
          state.loading = false;
          state.data = action.payload;
        }
      )
      .addCase(fetchAboutInfo.rejected, (state, action) => {
        state.loading = false;
        // Ensure action.payload is of the correct type (string)
        state.error = action.payload as string;
      });
  },
});

export default aboutUsSlice.reducer;
