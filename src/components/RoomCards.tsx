import RoomCard from "./RoomCard";
import { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { fetchPropertyInfo } from "@/store/propertySlice";

const RoomCardSkeleton: React.FC = () => {
  const skeletonItems = Array.from({ length: 4 });

  return (
    <>
      {skeletonItems.map((_, index) => (
        <div key={index} className="roomCard animate-pulse">
          <div className="rounded-xl relative bg-gray-200 h-56 md:h-48 w-full"></div>
          <div className="mt-2">
            <div className="h-4 bg-gray-200 rounded w-3/5 mb-2"></div>
            <div className="h-3 bg-gray-200 rounded w-2/5 mb-2"></div>
            <div className="flex space-x-3 text-sm text-lighttext">
              <div className="h-3 bg-gray-200 rounded w-8"></div>
              <div className="h-3 bg-gray-200 rounded w-8"></div>
              <div className="h-3 bg-gray-200 rounded w-12"></div>
            </div>
            <div className="h-4 bg-gray-200 rounded w-1/3 mt-2"></div>
          </div>
        </div>
      ))}
    </>
  );
};

const RoomCards = ({
  title,
  Sale,
  Rent,
}: {
  title: string;
  Sale?: boolean;
  Rent?: boolean;
}) => {
  const { data, loading } = useAppSelector((state) => state.property);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!data) {
      dispatch(fetchPropertyInfo({ type: "all", area_type: null, area_size: null, location: null, hotel_name: null }));
    }
  }, [dispatch, data]);
  const handleWishlistClick = (id: number, value: number) => {
    console.log(id, value);
  };

  const filteredRooms =
    data &&
    data?.filter((room) => {
      if (Sale) return room.title === "Sale" && room.status === 1;
      if (Rent) return room.title === "Rent" && room.status === 1;
      return true;
    });

  return (
    <div className="px-4 py-5 lg:py-11">
      <h3 className="text-2xl font-bold mb-6">{title}</h3>
      <div className="grid lg:grid-cols-4 lg:gap-5 md:grid-cols-2 grid-cols-1 gap-3">
        {loading ? (
          Array.from({ length: 2 }).map((_, index) => (
            <RoomCardSkeleton key={index} />
          ))
        ) : filteredRooms && filteredRooms.length > 0 ? (
          filteredRooms?.map((room) => {
            return (
              <RoomCard
                key={room.id}
                data={room.property}
                Sale={Sale}
                Rent={Rent}
                onWishlistClick={handleWishlistClick}
              />
            );
          })
        ) : (
          <p>No property available.</p>
        )}
      </div>
    </div>
  );
};

export default RoomCards;
