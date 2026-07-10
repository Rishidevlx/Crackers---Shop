import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiArrowRight } from 'react-icons/fi';
import defaultBanner from '../../assets/images/banners/crackers1.png'; // Fallback

const Hero = () => {
  const [banners, setBanners] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  // Fetch banners from CMS
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await fetch(import.meta.env.VITE_API_URL + '/api/cms/home');
        const data = await response.json();
        if (data.success && data.data.hero_banners) {
          const parsedBanners = data.data.hero_banners;
          if (Array.isArray(parsedBanners) && parsedBanners.length > 0) {
            setBanners(parsedBanners);
          } else {
            setBanners([defaultBanner]); // Fallback if empty array
          }
        } else {
          setBanners([defaultBanner]); // Fallback if not found
        }
      } catch (err) {
        console.error('Error fetching banners:', err);
        setBanners([defaultBanner]); // Fallback on error
      }
    };
    
    fetchBanners();
  }, []);

  // Auto-play slider
  useEffect(() => {
    if (banners.length <= 1) return;
    
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(timer);
  }, [banners.length]);

  return (
    <div className="relative h-[60vh] md:h-[80vh] w-full overflow-hidden bg-gray-900 mt-12 md:mt-16">
      
      {/* Slider Images */}
      {banners.map((img, index) => (
        <div 
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'}`}
        >
          <div className="absolute inset-0 bg-black/40 z-10"></div> {/* Overlay */}
          <img 
            src={img} 
            alt={`Hero Banner ${index + 1}`} 
            className="w-full h-full object-cover object-center transform hover:scale-105 transition-transform duration-[10000ms]"
          />
        </div>
      ))}

      {/* Content Overlay */}
      <div className="relative z-20 h-full flex items-center max-w-7xl mx-auto px-6">
        <div className="max-w-2xl text-white">
          <span className="inline-block py-1 px-3 rounded-full bg-brand/20 border border-brand/50 text-brand font-semibold text-sm mb-4 animate-fade-in-up">
            Premium Quality Crackers
          </span>
          <h1 className="text-4xl md:text-6xl font-heading font-extrabold mb-6 leading-tight drop-shadow-lg animate-fade-in-up animation-delay-200">
            CELEBRATE WITH <br/> <span className="text-brand">AK CRACKERS</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-200 mb-8 max-w-lg drop-shadow-md animate-fade-in-up animation-delay-400">
            Light up your celebrations with Sivakasi's finest standard fireworks. 
            Direct from factory to your doorstep.
          </p>
          <div className="flex flex-wrap gap-4 animate-fade-in-up animation-delay-600">
            <Link 
              to="/shop" 
              className="bg-brand hover:bg-red-700 text-white font-bold py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all flex items-center gap-2 transform hover:-translate-y-1"
            >
              Shop Now <FiArrowRight />
            </Link>
            <Link 
              to="/about" 
              className="bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all transform hover:-translate-y-1"
            >
              Explore Products
            </Link>
          </div>
        </div>
      </div>

      {/* Slider Controls */}
      {banners.length > 1 && (
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
          {banners.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${index === currentSlide ? 'bg-brand w-8' : 'bg-white/50 hover:bg-white'}`}
              aria-label={`Go to slide ${index + 1}`}
            ></button>
          ))}
        </div>
      )}

    </div>
  );
};

export default Hero;
