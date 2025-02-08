import SearchIco from "@/assets/images/Icons/SearchIco";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useAppDispatch } from "@/store/store";
import { fetchPropertyInfo } from "@/store/propertySlice";

interface Category {
  id: number;
  title: string;
  image: string | null;
  status: number;
  created_at: string;
  updated_at: string;
}

const SearchComponent = ({ categories }: { categories: Category[] }) => {
  const [selectedTab, setSelectedTab] = useState("Book");
  const dispatch = useAppDispatch();
  const [searchParams, setSearchParams] = useState({
    location: "",
    area_type: "",
    area_size: "",
    hotel_name: "",
  });
  const router = useRouter();
  const isFormFilled = Object.values(searchParams).some(
    (value) => value !== ""
  );
  const handleTabClick = (tab: string) => {
    setSelectedTab(tab);
    if (tab === "Sale") {
      router.push("/propertiesList");
    } else {
      router.push("/");
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setSearchParams((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSearch = () => {
    const { location, area_type, area_size, hotel_name } = searchParams;
    dispatch(
      fetchPropertyInfo({
        type: "all",
        area_type,
        area_size,
        location,
        hotel_name,
      })
    );
    setSearchParams({
      location: "",
      area_type: "",
      area_size: "",
      hotel_name: "",
    });
  };

  return (
    <>
      <div className="flex tabBtn justify-center mb-3 lg:mb-7">
        {categories && categories.length > 0 ? (
          categories.map((category) => (
            <a
              role="tab"
              key={category.id}
              aria-selected={selectedTab === category.title}
              onClick={() => handleTabClick(category.title)}
              className={`text-lg font-medium cursor-pointer p-3 ${
                selectedTab === category.title ? "active" : ""
              }`}
            >
              {category.title}
            </a>
          ))
        ) : (
          <p>No categories available.</p>
        )}
      </div>
      <div className="lg:bg-white/80 block rounded-sm lg:rounded-[40px] lg:p-2 lg:shadow-lg w-full mx-auto">
        <div className="lg:flex items-center serachBarInput lg:rounded-[40px] bg-white lg:p-0 lg:space-x-2">
          {/* <div className="inputBox lg:py-[11.5px] py-4 px-[30px]">
            <label htmlFor="guests" className="text-base block">
              Name
            </label>
            <input
              id="hotel_name"
              name="hotel_name"
              type="text"
              value={searchParams.hotel_name}
              onChange={handleInputChange}
              placeholder="Add Name"
              className="leading-6 text-base focus:outline-none"
            />
          </div> */}
          <div className="inputBox lg:py-[11.5px] py-4 px-[30px]">
            <label htmlFor="checkIn" className="text-base block">
              Property
            </label>
            <select
              className="form-control"
              name="area_type"
              id="area_type"
              value={searchParams.area_type}
              onChange={handleInputChange}
            >
              <option value="">Select Property Type</option>
              <option value="A-FFRAME VILLA">A-FFRAME VILLA</option>
              <option value="DOMES VILLA">DOMES VILLA</option>
              <option value="2-BHK VILLA">2-BHK VILLA</option>
              <option value="3-BHK VILLA">3-BHK VILLA</option>
              <option value="4-BHK VILLA">4-BHK VILLA</option>
              <option value="CAPSULE VILLA">CAPSULE VILLA</option>
              <option value="CONTAINER VILLA">CONTAINER VILLA</option>
            </select>
          </div>
          <div className="inputBox lg:py-[11.5px] py-4 px-[30px]">
            <label htmlFor="checkOut" className="text-base block">
              Property Size
            </label>
            <input
              id="area_size"
              name="area_size"
              type="text"
              value={searchParams.area_size}
              onChange={handleInputChange}
              placeholder="Property Size"
              className="leading-6 text-xs focus:outline-none"
            />
          </div>
          <div className="lg:py-[11.5px] py-4 px-[30px]">
            <label htmlFor="where" className="text-base block">
              Location
            </label>
            <input
              id="location"
              name="location"
              type="text"
              value={searchParams.location}
              onChange={handleInputChange}
              placeholder="Search Destination"
              className="leading-6 text-base focus:outline-none"
            />
          </div>
          <button
            onClick={handleSearch}
            className="block w-full h-full text-lg lg:rounded-r-[40px] font-semibold lg:w-auto lg:flex items-center justify-center bg-primary text-white border border-white"
            disabled={!isFormFilled}
          >
            <div className="flex items-center justify-center gap-2">
              <SearchIco width="24" height="24" />
              <span className="lg:hidden">Search</span>
            </div>
          </button>
        </div>
      </div>
    </>
  );
};

export default SearchComponent;
