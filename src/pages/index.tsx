import 'swiper/css';
import HeroSlider from "@/components/HeroSlider";
import RoomCards from "@/components/RoomCards";
import BlogSection from "@/components/BlogSection";
import TestimonialSlider from '@/components/TestimonialSection';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { fetchBannerInfo } from '@/store/bannerSlice';
import { useEffect } from 'react';

export default function Home() {
  const {data: fetchBanner} = useAppSelector((state) => state.banner);
  const dispatch = useAppDispatch();
  useEffect(() => {
      dispatch(fetchBannerInfo({ type: 'home' }));
  }, [dispatch]);
  return (
    <div>
      <HeroSlider fetchBanner={fetchBanner || []} />
      <RoomCards title="Properties For Sale" Sale={true} />
      <BlogSection title='Latest Blogs' />
      <TestimonialSlider />
    </div>
  );
}
