import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const Hero = () => {
  return (
    <div className="w-full h-[250px] md:h-[400px]">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="w-full h-full mySwiper"
      >
        <SwiperSlide>
          <div className="w-full h-full flex flex-col justify-center items-center text-center p-5 bg-[#ffcccc]">
            <h2 className="text-3xl md:text-5xl mb-4 text-brand font-heading">Special Diwali Offer!</h2>
            <p className="text-base md:text-xl text-gray-800 font-body">Get up to 50% off on all crackers.</p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-full h-full flex flex-col justify-center items-center text-center p-5 bg-[#ccffcc]">
            <h2 className="text-3xl md:text-5xl mb-4 text-brand font-heading">Safe & Green Crackers</h2>
            <p className="text-base md:text-xl text-gray-800 font-body">100% Supreme Court Approved.</p>
          </div>
        </SwiperSlide>
        <SwiperSlide>
          <div className="w-full h-full flex flex-col justify-center items-center text-center p-5 bg-[#ccccff]">
            <h2 className="text-3xl md:text-5xl mb-4 text-brand font-heading">Mega Combo Packs</h2>
            <p className="text-base md:text-xl text-gray-800 font-body">Starting at just ₹2999</p>
          </div>
        </SwiperSlide>
      </Swiper>
      {/* 
        Note: To target Swiper's internal buttons with Tailwind brand colors without external CSS,
        we can use inline styles or add them to the global index.css.
        We'll use global index.css for the swiper button overrides since they are injected by the lib.
      */}
    </div>
  );
};

export default Hero;
