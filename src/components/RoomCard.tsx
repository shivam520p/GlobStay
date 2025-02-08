import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Pagination } from "swiper/modules";
import StarIco from "@/assets/images/Icons/StarIco";
import WishListIco from "@/assets/images/Icons/WishListIco";
import BedIco from "../assets/images/Icons/BedIco";
import BathroomIco from "../assets/images/Icons/BathroomIco";
import AreaIco from "../assets/images/Icons/AreaIco";
import WishListFillIco from "@/assets/images/Icons/WishListFillIco";
import Link from "next/link";
import { useRouter , usePathname } from "next/navigation";
import ArrowRight from "@/assets/images/Icons/ArrowRight";


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
}

interface RoomCardProps {
  data: Property[];
  Sale?: boolean;
  Rent?: boolean;
  onClick?: () => void;
  onWishlistClick: (id: number, value: number) => void;
}

const RoomCard: React.FC<RoomCardProps> = ({
  data,
  Sale,
  Rent,
  onWishlistClick,
}) => {
  const router = useRouter();
  
  const pathname = usePathname();
  const handleShowMoreClick = () => {
    router.push("/propertiesList");
  };
    // Get the last part of the path from the URL
    const lastSegment = pathname.split('/').pop();
  // Calculate the number of cards to show based on showMore state
  const visibleData = lastSegment==="propertiesList" ? data : data.slice(0, 7); // Show 6 cards initially, toggle with showMore

  
  return (
    <>
      {visibleData?.map((room: Property, index: number) => {
        return (
          <Link
            key={room.id}
            href={`/details/${room.id}?cat=${room.category_id}`}
            className={`roomCard ${
              room.status === 2 ? "pointer-events-none opacity-50" : ""
            } roomCard`}
          >
            <div className="rounded-xl relative">
              <Swiper
                modules={[Navigation, Pagination]}
                navigation
                pagination
                className="inset-0 customOverlay rounded-xl"
              >
                {room.sub_img.map((image: SubImage) => (
                  <SwiperSlide key={image.id}>
                    <img
                      src={`${process.env.NEXT_PUBLIC_API_URL}${image.image}`}
                      alt={`Room Image ${index + 1}`}
                      className="w-full md:h-48 h-56 object-cover"
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
              <i
                className="absolute right-4 top-4 z-10 cursor-pointer"
                onClick={() => onWishlistClick(room.id, room.whislist_status)}
              >
                {room.whislist_status === 2 ? (
                  <WishListFillIco height="22px" width="24px" />
                ) : (
                  <WishListIco height="22px" width="24px" />
                )}
              </i>
            </div>
            <div className="text-sm mt-2 flex justify-between items-center">
              <span className="font-semibold block">{room.hotel_name}</span>
              <span className="font-normal flex items-center gap-2">
                <StarIco width="20px" height="20px" /> {room.rating}
              </span>
            </div>
            <div className="text-sm text-lighttext">{room.location}</div>
            {/* <div className="text-sm text-lighttext">{room.distance} away</div> */}
            {Sale && (
              <div className="text-base text-lighttext hidden">25 -30 Nov</div>
            )}
            {Rent && (
              <div className="flex space-x-3 text-sm text-lighttext">
                <div className="flex items-center space-x-1">
                  <BedIco width="18px" height="18px" />
                  <span>4</span>
                </div>
                <div className="flex items-center space-x-1">
                  <BathroomIco width="18px" height="18px" />
                  <span>2</span>
                </div>
                <div className="flex items-center space-x-1">
                  <AreaIco width="18px" height="18px" />
                  <span>
                    {room.area_size}m<sup>2</sup>
                  </span>
                </div>
              </div>
            )}
            <div className="text-base font-semibold">₹{room.price}</div>
          </Link>
        );
      })}
      {/* Show More / Show Less Button */}
      {lastSegment !== "propertiesList" && <div
        onClick={() => {
          handleShowMoreClick();
        }}
        className="flex justify-center items-center bg-blue-50 h-48 rounded-lg cursor-pointer"
      >
        <button className="text-base font-semibold flex items-center">View All</button>
        <i className="ml-2">
                            <ArrowRight width="16px" height="13px"/>  
                    </i>
      </div>}
    </>
  );
};

export default RoomCard;
