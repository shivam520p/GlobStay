import { getPropertyDetails } from "@/utils/api";
import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";

// Define your types as before
interface Facility {
  facilities_id: number;
  facility_name: string;
  facility_value: string;
  facility_image: string;
}

interface Amenity {
  amenities_id: number;
  amenities_name: string;
  amenity_value: string;
  amenities_image: string;
}
interface SubImage {
  id: number;
  property_id: number;
  image: string;
  created_at: string;
  updated_at: string;
  status: number;
  alt?: string;
}

interface Property {
  id: number;
  user_id: number;
  category_id: number;
  hotel_name: string;
  hotel_url: string;
  hotel_address: string;
  hotel_description: string;
  hotel_map_link: string;
  youtube_link: string | null;
  rating: string;
  state: string;
  price: string;
  booking_days: string;
  distance: string;
  location: string;
  is_property_verified: number;
  status: number;
  created_at: string;
  updated_at: string;
  category_name: string;
  whislist_status: number;
  facilities: Facility[];
  amenities: Amenity[];
  sub_img: SubImage[];
  city_village: string;
  district_tehsil: string;
  zipcode: string;
  area_size: string;
  markup: string;
  markup_value_b2b: string;
  markup_value_b2c: string;
  extra_info_area_size: string;
  extra_info_area_size_type: string;
  num_of_open_sides: string;
  site_specification: string;
  brochure: string;
}

interface DataItem {
  id: number;
  title: string;
  image: string | null;
  status: number;
  created_at: string;
  updated_at: string;
  property: Property[];
}

interface PropertyState {
  data: DataItem[] | null;
  loading: boolean;
  error: string | null;
}

const initialState: PropertyState = {
  data: null,
  loading: false,
  error: null,
};

// Define the type for rejected value
export const fetchPropertyInfo = createAsyncThunk<DataItem[], { type: string; area_type: string | null; area_size: string | null; location: string | null; hotel_name: string | null; }>(
  "property/fetchPropertyInfo", 
  async ({ type, area_type, area_size, location, hotel_name }, { rejectWithValue }) => {
  try {
    const data = await getPropertyDetails(type, area_type, area_size, location, hotel_name);
    return data;
  } catch (error) {
    return rejectWithValue(
      error instanceof Error ? error.message : "Failed to fetch property info"
    );
  }
});

const propertySlice = createSlice({
  name: "property",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPropertyInfo.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        fetchPropertyInfo.fulfilled,
        (state, action: PayloadAction<DataItem[]>) => {
          state.loading = false;
          state.data = action.payload;
        }
      )
      .addCase(fetchPropertyInfo.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export default propertySlice.reducer;
