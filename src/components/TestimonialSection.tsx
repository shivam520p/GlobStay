import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Mousewheel, Pagination } from "swiper/modules";
import StarFilledIco from "@/assets/images/Icons/StarFilledIco";
import StarblankIco from "@/assets/images/Icons/StarblankIco";
import { useAppDispatch, useAppSelector } from "@/store/store";
import { fetchTestimonialInfo } from "@/store/testimonialSlice";
import Image from "next/image";

const TestimonialSlider = () => {
  const dispatch = useAppDispatch();
  const { data: testimonials } = useAppSelector((state) => state.testimonial);
  useEffect(() => {
    dispatch(fetchTestimonialInfo());
  }, [dispatch]);

  return (
    <div className="lg:p-11">
      <div className="max-sm:px-4">
        <h2 className="text-center text-3xl md:text-[42px] leading-[57px] text-[#525252] font-bold mb-10">
          What Our Clients Say About Us
        </h2>
      </div>
      <Swiper
        modules={[Pagination, Mousewheel]}
        pagination={{ clickable: true }}
        className="testswiper"
        spaceBetween={30}
        mousewheel={true}
        slidesPerView={1}
        breakpoints={{
          640: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
      >
        {testimonials?.map((testimonial) => (
          <SwiperSlide key={testimonial.id}>
            <div className="bg-white rounded-lg shadow-testShadow px-6 py-10">
              <div className="flex space-x-2 items-center justify-between">
                <div className="flex space-x-2 items-center justify-between">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_API_URL}${testimonial.image}`}
                    alt={testimonial.name}
                    className="w-[72px] h-[72px] rounded-full object-cover"
                    width={72}
                    height={72}
                  />
                  <div className="des">
                    <h3 className="text-xl font-semibold">
                      {testimonial.name}
                    </h3>
                    <p className="text-sm text-gray-500">
                      {testimonial.designation}
                    </p>
                  </div>
                </div>
                <div className="flex">
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
              </div>
              <div className="flex flex-col items-center justify-center space-y-4 mt-4">
                <h4 className="text-xl leading-8 font-bold">
                  {testimonial.title}
                </h4>
                <p className="text-black text-center text-base overflow-hidden">
                  {testimonial.description}
                </p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default TestimonialSlider;
