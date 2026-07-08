import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';

const categories = [
  { id: 1, name: "CHOTTA FANCY", items: 1 },
  { id: 2, name: "COLOUR SMOKE", items: 1 },
  { id: 3, name: "COMBO", items: 4 },
  { id: 4, name: "ELECTRIC CRACKERS", items: 3 },
  { id: 5, name: "FANCY CRACKERS", items: 3 },
  { id: 6, name: "FLOWER POTS", items: 9 },
  { id: 7, name: "SPARKLERS", items: 5 },
];

const Categories = () => {
  return (
    <div className="py-10 px-12 bg-primary">
      <div className="mb-7">
        <h2 className="text-2xl text-gray-800 mb-1 font-medium uppercase font-heading">TOP CATEGORIES</h2>
        <div className="w-12 h-0.5 bg-[#F8B400]"></div>
      </div>
      
      <div className="w-full relative">
        <Swiper
          slidesPerView={1}
          spaceBetween={10}
          navigation={true}
          modules={[Navigation]}
          breakpoints={{
            640: { slidesPerView: 2, spaceBetween: 20 },
            768: { slidesPerView: 4, spaceBetween: 40 },
            1024: { slidesPerView: 6, spaceBetween: 50 },
          }}
          className="categoriesSwiper pb-5"
        >
          {categories.map((category) => (
            <SwiperSlide key={category.id}>
              <div className="flex flex-col items-center text-center p-2.5 cursor-pointer transition-transform duration-300 hover:-translate-y-1.5">
                <div className="mb-4 w-30 h-30 rounded-full bg-[radial-gradient(circle_at_bottom,_#e0e0e0_0%,_#f9f9f9_70%)] shadow-md flex items-center justify-center">
                  <div className="w-20 h-20 bg-gray-200 rounded-lg flex items-center justify-center -translate-y-2.5">
                    <span className="text-gray-400">Img</span>
                  </div>
                </div>
                <h3 className="text-sm text-gray-800 mb-1 font-body">{category.name}</h3>
                <p className="text-xs text-gray-500 font-body">{category.items} product{category.items > 1 ? 's' : ''}</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Categories;
