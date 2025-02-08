import "swiper/css";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import ImageGallery from "@/components/ImageGallery/ImageGallery";
import StarFilledIco from "@/assets/images/Icons/StarFilledIco";
import "react-datepicker/dist/react-datepicker.css";
import UserIco from "@/assets/images/faz.jpg";
import StarblankIco from "@/assets/images/Icons/StarblankIco";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/bundle";
import { Autoplay } from "swiper/modules";
import { useParams, useSearchParams } from "next/navigation";
import { contactEnquiry, getDetailsData } from "@/utils/api";
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
  whislist_status: string | number | null;
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
interface FormData {
  name: string;
  email: string;
  phoneNumber: string;
  message: string;
  budget: string;
  location: string;
  plan_date: string;
}

const testimonial = {
  id: 1,
  name: "Sumit Singh",
  rate_count: 4.5,
};

const DetailPage: React.FC = () => {
  const param = useParams();
  const { id } = param || { id: null };
  const cat = useSearchParams().get("cat");
  const [detailData, setDetailData] = useState<DetailData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (id) {
      setIsLoading(true);
      const fetchDetails = async () => {
        try {
          const response = await getDetailsData(Number(id), Number(cat));
          console.log(response);
          if (Array.isArray(response)) {
            setDetailData(response);
          } else {
            console.error("Error: Response is not an array");
          }
        } catch (error) {
          console.error("Error fetching details:", error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchDetails();
    }
  }, [id, cat]);

  // const [startDate, setStartDate] = useState<Date | null>(null);
  // const [endDate, setEndDate] = useState<Date | null>(null);

  // const onChange = (dates: [Date | null, Date | null]) => {
  //     const [start, end] = dates;
  //     setStartDate(start || new Date());
  //     setEndDate(end);
  // };

  const intialField = {
    name: "",
    email: "",
    phoneNumber: "",
    message: "",
    budget: "",
    location: "",
    plan_date: "",
  };

  const [formData, setFormData] = useState<FormData>(intialField);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      !formData.name ||
      !formData.email ||
      !formData.phoneNumber ||
      !formData.location ||
      !formData.budget ||
      !formData.plan_date ||
      !formData.message
    ) {
      alert("Please fill in all required fields.");
      return;
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (!emailRegex.test(formData.email)) {
      alert("Please enter a valid email address.");
      return;
    }

    if (!/^\d{10}$/.test(formData.phoneNumber)) {
      alert("Please enter a valid phone number.");
      return;
    }

    setLoading(true);

    try {
      const { name, email, phoneNumber, message, budget, location, plan_date } =
        formData;
      const reqBody = {
        name,
        email,
        mobile_no: phoneNumber,
        message,
        property_id: Number(id),
        budget,
        location,
        plan_date,
      };

      const response = await contactEnquiry(JSON.stringify(reqBody));
      if (response === "OK") {
        setFormData(intialField);
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
      alert(error || "Failed to submit the form.");
      setLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  console.log(detailData[0]?.property[0]?.hotel_map_link);

  return (
    <>
      <div className="px-4 pt-11">
        {isLoading ? (
          Array.from({ length: 1 }).map((_, index) => (
            <div
              key={index}
              className="animate-pulse bg-gray-200 h-[355px] rounded-xl"
            ></div>
          ))
        ) : (
          <ImageGallery
            images={
              detailData[0].property[0].sub_img.map((img) => ({
                ...img,
                alt: img.alt ?? img.image,
              })) as SubImage[]
            }
          />
        )}
        <div className="grid lg:grid-cols-3 lg:gap-9 md:grid-cols-2 md:gap-6 grid-cols-1 my-4 max-md:space-y-6">
          <div className="col-span-2 max-md:p-0 max-md: space-y-4">
            <div className="bg-white rounded-xl p-6 border border-black/10">
              <iframe
                width="100%"
                height="355px"
                src={`https://www.youtube.com/embed/${
                  detailData[0]?.property[0]?.youtube_link ?? ""
                }`}
                frameBorder="0"
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="rounded-xl"
              ></iframe>
            </div>
            <div className="border border-black/10 rounded-xl p-6 space-y-6">
              {isLoading ? (
                <div className="animate-pulse space-y-4">
                  <div className="h-6 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-gray-200 rounded w-1/2"></div>
                  <div className="h-4 bg-gray-200 rounded w-full"></div>
                </div>
              ) : (
                <>
                  <div className="flex max-md:flex-col max-md:items-start items-center gap-2">
                    <div className="flex gap-1 items-center">
                      <h3 className="text-2xl font-bold">
                        {detailData[0].property[0].hotel_name}
                      </h3>
                      <span className="text-lg flex items-center gap-2 font-semibold">
                        <StarFilledIco width="24px" height="24px" />
                        {detailData[0].property[0].rating}
                      </span>
                    </div>
                    <span className="max-md:text-lg text-sm">
                      {detailData[0].property[0].hotel_address}
                    </span>

                    <a
                      href={`${process.env.NEXT_PUBLIC_API_URL}${detailData[0]?.property[0]?.brochure}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-semibold cursor-pointer text-primary"
                      download
                    >
                      View Brochure
                    </a>
                  </div>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: detailData[0].property[0]?.hotel_description,
                    }}
                  />
                </>
              )}
            </div>
            <div className="border border-black/10 rounded-xl p-6 space-y-6">
              <h3 className="text-2xl font-bold">Facilities</h3>
              <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-6">
                {isLoading
                  ? Array.from({ length: 8 }).map((_, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-1 animate-pulse"
                      >
                        <div className="w-6 h-6 bg-gray-200 rounded"></div>
                        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                      </div>
                    ))
                  : detailData[0].property[0].facilities.map(
                      (facility: Facility) => (
                        <div
                          key={facility.facilities_id}
                          className="flex items-center gap-1"
                        >
                          <Image
                            src={`${process.env.NEXT_PUBLIC_API_URL}${facility.facility_image}`}
                            alt="wifi"
                            width={24}
                            height={24}
                          />
                          <span className="text-base font-medium">
                            {facility.facility_value}{" "}{facility.facility_name}
                          </span>
                        </div>
                      )
                    )}
              </div>
            </div>
            <div className="border border-black/10 rounded-xl p-6 space-y-6">
              <h3 className="text-2xl font-bold">Amenities</h3>
              <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-6">
                {isLoading
                  ? Array.from({ length: 8 }).map((_, index) => (
                      <div
                        key={index}
                        className="flex items-center gap-1 animate-pulse"
                      >
                        <div className="w-6 h-6 bg-gray-200 rounded"></div>
                        <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                      </div>
                    ))
                  : detailData[0].property[0].amenities.map(
                      (amenity: Amenity) => (
                        <div
                          key={amenity.amenities_id}
                          className="flex items-center gap-1"
                        >
                          <Image
                            src={`${process.env.NEXT_PUBLIC_API_URL}${amenity.amenities_image}`}
                            alt="wifi"
                            width={24}
                            height={24}
                          />
                          <span className="text-base font-medium">
                            {amenity.amenities_name}
                          </span>
                        </div>
                      )
                    )}
              </div>
            </div>
            <div className="border border-black/10 rounded-xl p-6 space-y-6">
              <h3 className="text-2xl font-bold">Property Info</h3>
              <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-6">
                <div>
                  <h2 className="font-semibold">Village:</h2>
                  <p>{detailData[0]?.property[0]?.city_village}</p>
                </div>
                <div>
                  <h2 className="font-semibold">District:</h2>
                  <p>{detailData[0]?.property[0]?.district_tehsil}</p>
                </div>
                <div>
                  <h2 className="font-semibold">Pin Code:</h2>
                  <p>{detailData[0]?.property[0]?.zipcode}</p>
                </div>
                <div>
                  <h2 className="font-semibold">Area Size:</h2>
                  <p>{detailData[0]?.property[0]?.area_size} {detailData[0]?.property[0]?.extra_info_area_size_type}</p>
                </div>

                <p
                    dangerouslySetInnerHTML={{
                      __html: detailData[0]?.property[0]?.site_specification,
                    }}
                  />
              </div>
            </div>
            <div className="border border-black/10 rounded-xl p-6 space-y-6">
              <h3 className="text-2xl font-bold">Pricing Info</h3>
              <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-6">
                <div>
                  <h2 className="font-semibold">Price:</h2>
                  <p>{detailData[0]?.property[0]?.price}</p>
                </div>
                {/* <div>
                  <h2 className="font-semibold">Markup:</h2>
                  <p>{detailData[0]?.property[0]?.markup}%</p>
                </div>
                <div>
                  <h2 className="font-semibold">Markup Value B2C:</h2>
                  <p>{detailData[0]?.property[0]?.markup_value_b2c}</p>
                </div>
                <div>
                  <h2 className="font-semibold">Markup Value B2B:</h2>
                  <p>{detailData[0]?.property[0]?.markup_value_b2b}</p>
                </div> */}
              </div>
            </div>

            {detailData[0]?.property[0]?.extra_info_area_size !== null && (
              <div className="border border-black/10 rounded-xl p-6 space-y-6">
                <h3 className="text-2xl font-bold">Extra Info</h3>
                <div className="grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-6">
                  <div>
                    <h2 className="font-semibold">Total Area:</h2>
                    <p>{detailData[0]?.property[0]?.extra_info_area_size}</p>
                  </div>
                  <div>
                    <h2 className="font-semibold">Area Type:</h2>
                    <p>
                      {detailData[0]?.property[0]?.extra_info_area_size_type}
                    </p>
                  </div>
                  {/* <div>
                    <h2 className="font-semibold">Number of Open Sides:</h2>
                    <p>{detailData[0]?.property[0]?.num_of_open_sides}</p>
                  </div> */}
                </div>
              </div>
            )}
          </div>
          <div className="lg:col-span-1 md:col-span-2 col-span-1 max-md:p-0">
            <div className="bg-white rounded-xl p-6 border border-[#1C3319] mb-7 shadow-dateShadow">
              <form className="space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    name="name"
                    type="text"
                    required
                    placeholder="Name"
                    disabled={loading}
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleInputChange}
                    disabled={loading}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Phone
                  </label>
                  <input
                    id="phone"
                    name="phoneNumber"
                    type="tel"
                    required
                    placeholder="Phone"
                    maxLength={10}
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    disabled={loading}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label
                    htmlFor="location"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Interested Location (e.g., Delhi)
                  </label>
                  <input
                    id="location"
                    name="location"
                    type="text"
                    required
                    placeholder="Interested Location (e.g., Delhi)"
                    value={formData.location}
                    onChange={handleInputChange}
                    disabled={loading}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label
                    htmlFor="budget"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Budget (e.g., 50k)
                  </label>
                  <input
                    id="budget"
                    name="budget"
                    type="text"
                    required
                    placeholder="Budget (e.g., 50k)"
                    value={formData.budget}
                    onChange={handleInputChange}
                    disabled={loading}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label
                    htmlFor="plan_date"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Plan Date
                  </label>
                  <input
                    id="plan_date"
                    name="plan_date"
                    type="date"
                    required
                    placeholder="Plan Date"
                    value={formData.plan_date}
                    onChange={handleInputChange}
                    min={new Date().toISOString().split("T")[0]}
                    disabled={loading}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    placeholder="Message"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    disabled={loading}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary text-white py-3 rounded-lg hover:bg-green-800 transition"
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </form>

              {/* <h3 className="text-xl font-bold mb-4">₹2,000 night</h3>
                            <div className="flex items-center border border-black/10 rounded-t-lg">
                                <div className='border-r border-black/10 px-4 py-[7px]'>
                                    <label className="block font-medium">Check-in</label>
                                    <DatePicker
                                        selected={startDate}
                                        onChange={onChange}
                                        startDate={startDate ?? undefined}
                                        endDate={endDate ?? undefined}
                                        selectsRange
                                        monthsShown={2}
                                        placeholderText="Select start date"
                                        className="w-full text-black/70"
                                        value={startDate ? startDate.toLocaleDateString() : ''}
                                    />
                                </div>
                                <div className="px-4 py-[7px]">
                                    <label className="block font-medium">Check-out</label>
                                    <DatePicker
                                        selected={endDate}
                                        onChange={onChange}
                                        startDate={startDate ?? undefined}
                                        endDate={endDate ?? undefined}
                                        selectsRange
                                        monthsShown={2}
                                        placeholderText="Select end date"
                                        className="w-full text-black/70"
                                        value={endDate ? endDate.toLocaleDateString() : ''}
                                    />
                                </div>
                            </div>
                            <GuestPicker />
                            <button className='bg-primary text-white px-4 py-2 rounded-lg w-full'>Book</button>
                            <table className="w-full mt-6 leading-4 text-lg font-normal">
                                <tbody>
                                    <tr className="py-4">
                                        <td className="text-left py-2">₹2,000x10 nights</td>
                                        <td className="text-right py-2">₹20,000</td>
                                    </tr>
                                    <tr className="py-4">
                                        <td className="text-left py-2">Cleaning fee</td>
                                        <td className="text-right py-2">₹1700</td>
                                    </tr>
                                    <tr className="py-4">
                                        <td className="text-left pb-7 pt-2">Gst</td>
                                        <td className="text-right pb-7 pt-2">₹200</td>
                                    </tr>
                                    <tr className="border-t">
                                        <td className="text-left pt-7 text-base font-bold">Total before taxes</td>
                                        <td className="text-right pt-7 text-base font-bold">₹22,000</td>
                                    </tr>
                                </tbody>
                            </table> */}
            </div>
            <div className="bg-white rounded-xl p-6 border border-black/10 mb-7">
              <h3 className="text-2xl text-[#007AFF]">1326 reviews</h3>
              <div className="rounded-md bg-bgLight p-6 border border-black/10 mb-7">
                <Swiper
                  modules={[Autoplay]}
                  loop={true}
                  autoplay={{ delay: 3000 }}
                  className="inset-0 w-full h-auto rounded-xl"
                >
                  <SwiperSlide>
                    <div className="flex items-center mb-2">
                      <Image
                        src={UserIco}
                        alt="user"
                        className="w-8 h-8 rounded-full object-cover"
                        width={30}
                        height={30}
                      />
                      <span className="text-xl font-medium ml-4">
                        {testimonial.name}
                      </span>
                    </div>
                    <div className="flex mb-2">
                      {Array.from({
                        length: Math.floor(testimonial.rate_count),
                      }).map((_, index) => (
                        <div
                          className="mr-1"
                          key={`filled-${testimonial.id}-${testimonial.rate_count}-${index}`}
                        >
                          <StarFilledIco width="20px" height="19px" />
                        </div>
                      ))}
                      {Array.from({
                        length: 5 - Math.floor(testimonial.rate_count),
                      }).map((_, index) => (
                        <div
                          className="mr-1"
                          key={`blank-${testimonial.id}-${testimonial.rate_count}-${index}`}
                        >
                          <StarblankIco width="20px" height="19px" />
                        </div>
                      ))}
                    </div>
                    <p>
                      “Entering the room was like stepping into a serene
                      retreat. The space was thoughtfully designed with a
                      contemporary coastal theme that was both relaxing and
                      stylish. The Color palette of soft blues and sandy
                      neutrals created an inviting atmosphere.”
                    </p>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="flex items-center mb-2">
                      <Image
                        src={UserIco}
                        alt="user"
                        className="w-8 h-8 rounded-full object-cover"
                        width={30}
                        height={30}
                      />
                      <span className="text-xl font-medium ml-4">
                        {testimonial.name}
                      </span>
                    </div>
                    <div className="flex mb-2">
                      {Array.from({
                        length: Math.floor(testimonial.rate_count),
                      }).map((_, index) => (
                        <div
                          className="mr-1"
                          key={`filled-${testimonial.id}-${testimonial.rate_count}-${index}`}
                        >
                          <StarFilledIco width="20px" height="19px" />
                        </div>
                      ))}
                      {Array.from({
                        length: 5 - Math.floor(testimonial.rate_count),
                      }).map((_, index) => (
                        <div
                          className="mr-1"
                          key={`blank-${testimonial.id}-${testimonial.rate_count}-${index}`}
                        >
                          <StarblankIco width="20px" height="19px" />
                        </div>
                      ))}
                    </div>
                    <p>
                      “Entering the room was like stepping into a serene
                      retreat. The space was thoughtfully designed with a
                      contemporary coastal theme that was both relaxing and
                      stylish. The Color palette of soft blues and sandy
                      neutrals created an inviting atmosphere.”
                    </p>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="flex items-center mb-2">
                      <Image
                        src={UserIco}
                        alt="user"
                        className="w-8 h-8 rounded-full object-cover"
                        width={30}
                        height={30}
                      />
                      <span className="text-xl font-medium ml-4">
                        {testimonial.name}
                      </span>
                    </div>
                    <div className="flex mb-2">
                      {Array.from({
                        length: Math.floor(testimonial.rate_count),
                      }).map((_, index) => (
                        <div
                          className="mr-1"
                          key={`filled-${testimonial.id}-${testimonial.rate_count}-${index}`}
                        >
                          <StarFilledIco width="20px" height="19px" />
                        </div>
                      ))}
                      {Array.from({
                        length: 5 - Math.floor(testimonial.rate_count),
                      }).map((_, index) => (
                        <div
                          className="mr-1"
                          key={`blank-${testimonial.id}-${testimonial.rate_count}-${index}`}
                        >
                          <StarblankIco width="20px" height="19px" />
                        </div>
                      ))}
                    </div>
                    <p>
                      “Entering the room was like stepping into a serene
                      retreat. The space was thoughtfully designed with a
                      contemporary coastal theme that was both relaxing and
                      stylish. The Color palette of soft blues and sandy
                      neutrals created an inviting atmosphere.”
                    </p>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="flex items-center mb-2">
                      <Image
                        src={UserIco}
                        alt="user"
                        className="w-8 h-8 rounded-full object-cover"
                        width={30}
                        height={30}
                      />
                      <span className="text-xl font-medium ml-4">
                        {testimonial.name}
                      </span>
                    </div>
                    <div className="flex mb-2">
                      {Array.from({
                        length: Math.floor(testimonial.rate_count),
                      }).map((_, index) => (
                        <div
                          className="mr-1"
                          key={`filled-${testimonial.id}-${testimonial.rate_count}-${index}`}
                        >
                          <StarFilledIco width="20px" height="19px" />
                        </div>
                      ))}
                      {Array.from({
                        length: 5 - Math.floor(testimonial.rate_count),
                      }).map((_, index) => (
                        <div
                          className="mr-1"
                          key={`blank-${testimonial.id}-${testimonial.rate_count}-${index}`}
                        >
                          <StarblankIco width="20px" height="19px" />
                        </div>
                      ))}
                    </div>
                    <p>
                      “Entering the room was like stepping into a serene
                      retreat. The space was thoughtfully designed with a
                      contemporary coastal theme that was both relaxing and
                      stylish. The Color palette of soft blues and sandy
                      neutrals created an inviting atmosphere.”
                    </p>
                  </SwiperSlide>
                </Swiper>
              </div>
              <h3 className="text-xl font-semibold mb-4">Write a review</h3>
              <div className="flex mb-4">
                {Array.from({ length: Math.floor(testimonial.rate_count) }).map(
                  (_, index) => (
                    <div
                      className="mr-1"
                      key={`filled-${testimonial.id}-${testimonial.rate_count}-${index}`}
                    >
                      <StarFilledIco width="20px" height="19px" />
                    </div>
                  )
                )}
                {Array.from({
                  length: 5 - Math.floor(testimonial.rate_count),
                }).map((_, index) => (
                  <div
                    className="mr-1"
                    key={`blank-${testimonial.id}-${testimonial.rate_count}-${index}`}
                  >
                    <StarblankIco width="20px" height="19px" />
                  </div>
                ))}
              </div>
              <textarea
                className="w-full h-24 border bg-bgLight2/80 placeholder:text-black border-black/10 rounded-lg p-2 mb-4"
                placeholder="Write your review here..."
              ></textarea>
              <button className="bg-primary text-white px-4 py-2 w-1/2">
                Submit Review
              </button>
              <h3 className="text-xl text-[#2A9F47]">
                Log in to write a review
              </h3>
            </div>
          </div>
        </div>
        {detailData[0]?.property[0]?.hotel_map_link && (
          <div className="bg-white rounded-xl p-6 border border-black/10 mb-7">
            <iframe
              width="100%"
              height="593.82px"
              frameBorder="0"
              className="rounded-xl"
              referrerPolicy="no-referrer-when-downgrade"
              src={detailData[0]?.property[0]?.hotel_map_link}
              allowFullScreen
            ></iframe>
          </div>
        )}
      </div>
    </>
  );
};
export default DetailPage;
