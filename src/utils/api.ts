import axios from "axios";

interface Gallary {
  id: number;
  image: string;
}

interface SeoDetails {
  id: number;
  url: string;
  meta_title: string;
  meta_description: string;
  meta_keyword: string;
  meta_robot: string;
  header_script: string;
  footer_script: string;
  created_at: string;
  updated_at: string;
  status: number;
}

interface apiResponseGallary {
  status: string;
  message: string;
  data: Gallary[];
}
interface AboutData {
  id: number;
  data: string[];
  page_name:string;
  image: string;
  title: string;
  paragraph: string;
}


interface apiResponseAbout {
  status: string;
  message: string;
  data: AboutData[];
}

interface CompanyInfo {
  id: number;
  name: string;
  logo: string;
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

interface CareerData {
  title: string;
  exp: string;
  id: number;
  data: string;
}
interface Blog {
  id: number;
  title: string;
  image: string;
  short_content: string;
  long_content: string;
  posted_at: string;
}

interface apiResponseComp {
  status: string;
  message: string;
  data: CompanyInfo;
}
interface apiResponseSeo {
  status: string;
  message: string;
  data: SeoDetails;
}
interface apiResponseBlog {
  status: string;
  message: string;
  data: Blog[];
}

interface Testimonial {
  id: number;
  name: string;
  image: string;
  rate_count: number;
  designation: string;
  title: string;
  status?: number;
  created_at?: string;
  updated_at?: string;
  description: string;
}

interface apiResponseTestimonial {
  status: string;
  message: string;
  data: Testimonial[];
}

interface Banner {
  id: number;
  type: string;
  image: string;
  title: string;
  description: string;
  status?: number;
  created_at?: string;
  updated_at?: string;
}

interface apiResponseBanner {
  status: string;
  message: string;
  data: Banner[];
}
interface Category {
  id: number;
  title: string;
  image: string | null;
  status: number;
  created_at: string;
  updated_at: string;
}
interface CategoryResponse {
  status: string;
  message: string;
  data: Category[];
}
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

interface ApiResponse {
  status: string;
  data: DataItem[];
}

interface DetailData {
  id: number;
  title: string;
  image: string | null;
  status: number;
  created_at: string;
  updated_at: string;
  property: Property[];
  amenities: Amenity[];
}

interface DetailResponse {
  status: string;
  data: DetailData[];
}

interface SignupData {
  name: string;
  email: string;
  address: string;
  mobile_no: string;
}

const url = process.env.NEXT_PUBLIC_URL;

export async function getAboutGallary(): Promise<Gallary[]> {
  try {
    const headers = {
      "Content-Type": "application/json",
    };
    const response = await axios.get<apiResponseGallary>(
      `${url}/api/fetch-gallary`,
      { headers }
    );
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("API Error Response:", error.response.data);
      throw new Error("Failed to fetch Gallary info.");
    } else {
      console.error("Unexpected Error:", error);
      throw new Error("An unexpected error occurred.");
    }
  }
}

export async function getAboutPageData(): Promise<AboutData[]> {
  try {
    const headers = {
      "Content-Type": "application/json",
    };
    const response = await axios.get<apiResponseAbout>(
      `${url}/api/fetch-pages`,
      { headers }
    );
    return response.data.data; // Return the correct type from the response
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("API Error Response:", error.response.data);
      throw new Error("Failed to fetch About info.");
    } else {
      console.error("Unexpected Error:", error);
      throw new Error("An unexpected error occurred.");
    }
  }
}

export async function getCareerData(): Promise<CareerData> {
  try {
    const headers = {
      "Content-Type": "application/json",
    };
    const response = await axios.get<{ data: CareerData }>(
      `${url}/api/fetch-job-title`,
      { headers }
    );
    return response.data.data; // Extract and return the CareerData directly
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error("API Error Response:", error.response?.data);
      throw new Error("Failed to fetch career data.");
    } else {
      console.error("Unexpected Error:", error);
      throw new Error("An unexpected error occurred.");
    }
  }
}

export async function careerEnquiry(request: string): Promise<string> {
  try {
    const headers = {
      "Content-Type": "application/json",
    };
    const response = await axios.post(
      `${url}/api/send-career-enquiry`,
      request,
      {
        headers,
      }
    );
    return response.data.status;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("API Error Response:", error.response.data);
      throw new Error("Failed to career enquiry.");
    } else {
      console.error("Unexpected Error:", error);
      throw new Error("An unexpected error occurred.");
    }
  }
}

export async function getCompanyInfo(): Promise<CompanyInfo> {
  try {
    const headers = {
      "Content-Type": "application/json",
    };
    const response = await axios.get<apiResponseComp>(
      `${url}/api/fetch-company-info`,
      { headers }
    );
    console.log(response)
    return response.data.data; // Correctly access the `data` property
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("API Error Response:", error.response.data);
      throw new Error("Failed to fetch company info.");
    } else {
      console.error("Unexpected Error:", error);
      throw new Error("An unexpected error occurred.");
    }
  }
}

export async function getSeoDetails(baseUrl: string): Promise<SeoDetails> {
  try {
    const headers = {
      "Content-Type": "application/json",
    };
    const response = await axios.get<apiResponseSeo>(
      `${url}/api/fetch-seo?url=${baseUrl}`,
      { headers }
    );
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("API Error Response:", error.response.data);
      throw new Error("Failed to fetch company info.");
    } else {
      console.error("Unexpected Error:", error);
      throw new Error("An unexpected error occurred.");
    }
  }
}

export async function getBlogDetails({ id }: { id?: number }): Promise<Blog[]> {
  try {
    const headers = {
      "Content-Type": "application/json",
    };
    const apiUrl = id
      ? `${url}/api/fetch-blog?id=${id}`
      : `${url}/api/fetch-blog`;
    const response = await axios.get<apiResponseBlog>(apiUrl, { headers });
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("API Error Response:", error.response.data);
      throw new Error("Failed to fetch blog info.");
    } else {
      console.error("Unexpected Error:", error);
      throw new Error("An unexpected error occurred.");
    }
  }
}
export async function getPropertyDetails(
  type: string,
  area_type: string | null,
  area_size: string | null,
  location: string | null,
  hotel_name: string | null
): Promise<DataItem[]> {
  try {
    const headers = {
      "Content-Type": "application/json",
    };
    const queryParams: string[] = [];
    if (type) queryParams.push(`type=${encodeURIComponent(type)}`);
    if (area_type) queryParams.push(`area_type=${encodeURIComponent(area_type)}`);
    if (area_size) queryParams.push(`area_size=${encodeURIComponent(area_size)}`);
    if (location) queryParams.push(`location=${encodeURIComponent(location)}`);
    if (hotel_name) queryParams.push(`hotel_name=${encodeURIComponent(hotel_name)}`);
    const queryString = queryParams.length > 0 ? `?${queryParams.join('&')}` : '';
    const urlWithParams = `${url}/api/fetch-property${queryString}`;
    const response = await axios.get<ApiResponse>(urlWithParams, { headers });
    console.log(response)
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("API Error Response:", error.response.data);
      throw new Error("Failed to fetch property details.");
    } else {
      console.error("Unexpected Error:", error);
      throw new Error("An unexpected error occurred.");
    }
  }
}


export async function getTestimonialDetails(): Promise<Testimonial[]> {
  try {
    const headers = {
      "Content-Type": "application/json",
    };
    const response = await axios.get<apiResponseTestimonial>(
      `${url}/api/fetch-testimonial`,
      { headers }
    );
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("API Error Response:", error.response.data);
      throw new Error("Failed to fetch testimonial info.");
    } else {
      console.error("Unexpected Error:", error);
      throw new Error("An unexpected error occurred.");
    }
  }
}

export async function getBannerDetails(type: string): Promise<Banner[]> {
  try {
    const headers = {
      "Content-Type": "application/json",
    };
    const response = await axios.get<apiResponseBanner>(
      `${url}/api/fetch-banner?type=${type}`,
      { headers }
    );
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("API Error Response:", error.response.data);
      throw new Error("Failed to fetch testimonial info.");
    } else {
      console.error("Unexpected Error:", error);
      throw new Error("An unexpected error occurred.");
    }
  }
}

export async function getCategoryDetails(): Promise<Category[]> {
  try {
    const headers = {
      "Content-Type": "application/json",
    };
    const response = await axios.get<CategoryResponse>(
      `${url}/api/fetch-category`,
      { headers }
    );
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("API Error Response:", error.response.data);
      throw new Error("Failed to fetch testimonial info.");
    } else {
      console.error("Unexpected Error:", error);
      throw new Error("An unexpected error occurred.");
    }
  }
}

export async function contactEnquiry(request: string): Promise<string> {
  try {
    const headers = {
      "Content-Type": "application/json",
    };
    const response = await axios.post(`${url}/api/send-enquiry`, request, {
      headers,
    });
    return response.data.status;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("API Error Response:", error.response.data);
      throw new Error("Failed to send enquiry.");
    } else {
      console.error("Unexpected Error:", error);
      throw new Error("An unexpected error occurred.");
    }
  }
}

export async function getDetailsData(
  id: number,
  cat: number
): Promise<DetailData[]> {
  try {
    const headers = {
      "Content-Type": "application/json",
    };
    const response = await axios.get<DetailResponse>(
      `${url}/api/fetch-single-property/${id}?cat=${cat}`,
      { headers }
    );
    return response.data.data;
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      console.error("API Error Response:", error.response.data);
      throw new Error("Failed to fetch testimonial info.");
    } else {
      console.error("Unexpected Error:", error);
      throw new Error("An unexpected error occurred.");
    }
  }
}
export const checkTokenStatus = async (token: string) => {
  try {
    const response = await axios.post(
      `${url}/api/user/token-status`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data.status;
  } catch (error) {
    console.error("Error checking token status:", error);
  }
};

export const signupUser = async (body: SignupData) => {
  try {
    const response = await axios.post(`${url}/api/user/signup`, body, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Axios-specific error handling
      console.error(
        "Error during signup:",
        error.response?.data || error.message
      );
    } else {
      // Generic error handling
      console.error("Unexpected error:", error);
    }
  }
};
