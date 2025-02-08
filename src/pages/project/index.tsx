import 'swiper/css';
import RoomCards from '@/components/RoomCards';
import dynamic from "next/dynamic";
import { useEffect } from 'react';
import { fetchBannerInfo } from '@/store/bannerSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';
const BreadCrumbs = dynamic(() => import('@/components/BreadCrumbs'), { ssr: false });

interface Banner {
  id: number;
  type: string;
  image: string;
  title: string;
  description: string;
}
export default function Project() {
  const dispatch = useAppDispatch();  
  const {data: fetchBanner} = useAppSelector((state) => state.banner);
  
  useEffect(() => {
      dispatch(fetchBannerInfo({ type: 'project' }));
  }, [dispatch]);
  return (
    <>
      {fetchBanner && Array.isArray(fetchBanner) && fetchBanner.map((banner: Banner) => (
        <BreadCrumbs
          key={banner.id}
          title={banner.title}
          description={banner.description}
          imageSrc={`${process.env.NEXT_PUBLIC_API_URL}${banner.image}`}
        />
      ))}
      <div className="my-10 p-8 bg-[#F0F1EA] gap-1 block lg:flex lg:justify-evenly lg:items-end max-sm:space-y-3">
        <div className="w-full">
          <label htmlFor="where" className="text-sm">Keyword</label>
          <input
            id="where"
            type="text"
            placeholder="Enter"
            className="text-sm focus:outline-none border-[#E2E2E2] border py-2 px-3 rounded-md placeholder:text-[#595D62] w-full"
          />
        </div>
        <div className="w-full">
          <label htmlFor="where" className="text-sm">Choices</label>
          <input
            id="where"
            type="text"
            placeholder="Type, category.."
            className="text-sm focus:outline-none border-[#E2E2E2] border py-2 px-3 rounded-md placeholder:text-[#595D62] w-full"
          />
        </div>
        <div className="w-full">
          <label htmlFor="where" className="text-sm">Location</label>
          <input
            id="where"
            type="text"
            placeholder="City, State"
            className="text-sm focus:outline-none border-[#E2E2E2] border py-2 px-3 rounded-md placeholder:text-[#595D62] w-full"
          />
        </div>
        <div className="w-full">
          <label htmlFor="where" className="text-sm">Floors</label>
          <input
            id="where"
            type="text"
            placeholder="Select"
            className="text-sm focus:outline-none border-[#E2E2E2] border py-2 px-3 rounded-md placeholder:text-[#595D62] w-full"
          />
        </div>
        <div className="w-full">
          <label htmlFor="where" className="text-sm">Flat range</label>
          <input
            id="where"
            type="text"
            placeholder="All Flats"
            className="text-sm focus:outline-none border-[#E2E2E2] border py-2 px-3 rounded-md placeholder:text-[#595D62] w-full"
          />
        </div>
          <button className='bg-primary text-sm font-semibold py-2 px-6 rounded-lg text-white max-sm:w-full'>
            Search
          </button>
      </div>
      <RoomCards title="Projects" Rent={true}/>
    </>
  );
}
