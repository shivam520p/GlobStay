import { getCompanyInfo } from '@/utils/api';
import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

interface CompanyInfo {
  id: number;
  name: string;
  logo?: string;
  favicon: string;
  address: string;
  email: string;
  mobile: string;
  facebook: string;
  twitter: string;
  instagram: string;
  youtube_link: string;
  linkedin: string;
  map_link: string;
  footer_script: string;
  header_script: string;
  created_at: string;
  updated_at: string;
  status: number;
  brochure: string;
}

interface CompanyState {
  data: CompanyInfo | null;
  loading: boolean;
  error: string | null;
}

const initialState: CompanyState = {
  data: null,
  loading: false,
  error: null,
};

export const fetchCompanyInfo = createAsyncThunk<CompanyInfo>(
    'company/fetchCompanyInfo',
    async (_, { rejectWithValue }) => {
      try {
        const data = await getCompanyInfo();
        return data;
      } catch (error) {
        return rejectWithValue(error || 'Failed to fetch company info');
      }
    }
  );

const companySlice = createSlice({
  name: 'company',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCompanyInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCompanyInfo.fulfilled, (state, action: PayloadAction<CompanyInfo>) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchCompanyInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default companySlice.reducer;
