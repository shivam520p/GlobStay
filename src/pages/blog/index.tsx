import 'swiper/css';
import React, { useEffect } from 'react';
import BreadCrumbs from '@/components/BreadCrumbs';
import BlogSection from '@/components/BlogSection';
import { fetchBannerInfo } from '@/store/bannerSlice';
import { useAppDispatch, useAppSelector } from '@/store/store';
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
export default function Blog() {
    const dispatch = useAppDispatch();  
    const {data: fetchBanner} = useAppSelector((state) => state.banner);
    useEffect(() => {
          dispatch(fetchBannerInfo({ type: 'blog' }));
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
                <BlogSection title='Latest Blogs' />
        </>
    );
}
