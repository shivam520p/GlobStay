import "swiper/css";
import React, { useEffect } from "react";
import BreadCrumbs from "@/components/BreadCrumbs";
import Image from "next/image";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { fetchBannerInfo } from "@/store/bannerSlice";
import { fetchAboutInfo } from "@/store/aboutUsSlice";
import { fetchGallaryInfo } from "@/store/gallarySlice";
import ImageGallery from "@/components/ImageGallery/ImageGallery";

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
export default function About() {
  const dispatch = useAppDispatch();
  const { data: fetchBanner } = useAppSelector((state) => state.banner);
  const { data: fetchAboutUs } = useAppSelector((state) => state.aboutUs);
  const { data: fetchGallary } = useAppSelector((state) => state.gallary);

  useEffect(() => {
    dispatch(fetchBannerInfo({ type: "about" }));
    dispatch(fetchAboutInfo());
    dispatch(fetchGallaryInfo());
  }, [dispatch]);

  return (
    <>
      {/* Banner Section */}
      {Array.isArray(fetchBanner) &&
        fetchBanner.map((banner: Banner) => (
          <BreadCrumbs
            key={banner.id}
            title={banner.title}
            description={banner.description}
            imageSrc={`${process.env.NEXT_PUBLIC_API_URL}${banner.image}`}
          />
        ))}

      {/* About Us Section */}
      {Array.isArray(fetchAboutUs) &&
        fetchAboutUs
          .filter((item) => item.page_name === "about_us")
          .map((abt) => (
            <div
              key={abt.id}
              className="grid md:grid-cols-2 grid-cols-1 gap-4 mt-12 px-4 md:px-0"
            >
              <div className="col-span-1">
                <div className="bg-white border rounded-lg p-2">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_API_URL}${abt.image}`}
                    alt="About Us Image"
                    className="w-full h-[442px] rounded-lg object-cover"
                    width={514}
                    height={442}
                    loading="lazy"
                  />
                </div>
              </div>
              <div className="col-span-1">
                <h2 className="text-3xl font-bold">{abt.title}</h2>
                <p className="text-lg text-black/60 mt-6">{abt.paragraph}</p>
              </div>
            </div>
          ))}

      {/* Our Vision Section */}
      {Array.isArray(fetchAboutUs) &&
        fetchAboutUs
          .filter((item) => item.page_name === "our_vision")
          .map((vision) => (
            <div
              key={vision.id}
              className="grid md:grid-cols-2 grid-cols-1 gap-4 mt-12 px-4 md:px-0"
            >
              <div className="col-span-1">
                <h2 className="text-3xl font-bold">{vision.title}</h2>
                <p dangerouslySetInnerHTML={{ __html: vision.paragraph }} />
              </div>
              <div className="col-span-1">
                <div className="bg-white border rounded-lg p-2">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_API_URL}${vision.image}`}
                    alt="Our Vision Image"
                    className="w-full h-[442px] rounded-lg object-cover"
                    width={514}
                    height={442}
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          ))}

      {/* Gallery Section */}
      {Array.isArray(fetchGallary) && fetchGallary.length > 0 && (
        <div className="my-20 px-4">
          <h2 className="text-4xl font-bold mb-5">Our Gallery</h2>
          <ImageGallery images={fetchGallary} />
        </div>
      )}
    </>
  );
}
