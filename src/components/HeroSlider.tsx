import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/bundle';
import { Autoplay, Pagination } from 'swiper/modules';
import SearchComponent from './SearchComponent';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { fetchCategoryInfo } from '@/store/categorySlice';
import { useEffect } from 'react';

interface Banner {
  id: number;
  type: string;
  image: string;
  title: string;
  description: string;
}

const HeroSlider = ({ fetchBanner }: { fetchBanner: Banner[]; }) => {

  const { data: categories } = useAppSelector(state => state.category);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(fetchCategoryInfo());
  }, [dispatch]);


  return (

    <div className="relative block shadow-md rounded-xl outline-0 mb-4">
      <Swiper
        modules={[Autoplay, Pagination]}
        loop={true}
        pagination
        autoplay={{ delay: 3000 }}
        className="inset-0 w-full h-[550px] rounded-xl hero customOverlay"
      > {fetchBanner && Array.isArray(fetchBanner) && fetchBanner.map((banner) => (
        <SwiperSlide key={banner.id}>
          <img
            src={`${process.env.NEXT_PUBLIC_API_URL}${banner.image}`}
            alt={banner.title}
            className="w-full h-full object-cover"
          />
        </SwiperSlide>
      ))}
      </Swiper>
      <div className="lg:absolute lg:z-10 lg:top-2/3 lg:left-1/2 lg:transform lg:-translate-x-1/2 lg:-translate-y-1/2 lg:mx-auto">
        <SearchComponent categories={categories || []} />
      </div>
    </div>
  );
};

export default HeroSlider;