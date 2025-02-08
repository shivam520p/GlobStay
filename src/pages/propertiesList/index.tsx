import 'swiper/css';
import RoomCards from "@/components/RoomCards";
import { useAppDispatch, useAppSelector } from '@/store/store';
import { fetchBannerInfo } from '@/store/bannerSlice';
import { useEffect } from 'react';
import BreadCrumbs from '@/components/BreadCrumbs';
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
export default function PropertyList() {
  const {data: fetchBanner} = useAppSelector((state) => state.banner);
  const dispatch = useAppDispatch();
  useEffect(() => {
      dispatch(fetchBannerInfo({ type: 'propert-list' }));
  }, [dispatch]);
  return (
    <div>
      
      {fetchBanner && Array.isArray(fetchBanner) && fetchBanner.map((banner: Banner) => (
        <BreadCrumbs
          key={banner.id}
          title={banner.title}
          description={banner.description}
          imageSrc={`${process.env.NEXT_PUBLIC_API_URL}${banner.image}`}
        />
      ))}
      <RoomCards title="Properties For Sale" Sale={true} />
    </div>
  );
}
