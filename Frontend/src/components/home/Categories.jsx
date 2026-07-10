import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation } from 'swiper/modules';
import { useNavigate } from 'react-router-dom';
import 'swiper/css';
import 'swiper/css/navigation';
import { FiImage } from 'react-icons/fi';

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(import.meta.env.VITE_API_URL + '/api/categories');
        const data = await response.json();
        if (data.success) {
          // Filter to show only active main categories (or you can show all)
          const mainCategories = data.data.filter(c => c.parent_id === null && c.status === 'active');
          setCategories(mainCategories);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };
    fetchCategories();
  }, []);

  const handleCategoryClick = (categoryName) => {
    // Redirect to shop page with the category filter
    navigate(`/shop?category=${encodeURIComponent(categoryName)}`);
  };

  if (categories.length === 0) return null;

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
              <div 
                onClick={() => handleCategoryClick(category.name)}
                className="flex flex-col items-center text-center p-2.5 cursor-pointer transition-transform duration-300 hover:-translate-y-1.5"
              >
                <div className="mb-4 w-32 h-32 rounded-full bg-[radial-gradient(circle_at_bottom,_#e0e0e0_0%,_#f9f9f9_70%)] shadow-md flex items-center justify-center">
                  <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center overflow-hidden border-2 border-white shadow-sm">
                    {category.image_url ? (
                      <img src={category.image_url} alt={category.name} className="w-full h-full object-cover" />
                    ) : (
                      <FiImage className="text-gray-400 text-3xl" />
                    )}
                  </div>
                </div>
                <h3 className="text-sm text-gray-800 mb-1 font-body font-bold">{category.name}</h3>
                <p className="text-xs text-brand font-body mt-1 font-medium">Explore &rarr;</p>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Categories;
