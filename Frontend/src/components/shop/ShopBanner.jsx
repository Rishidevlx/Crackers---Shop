import React from 'react';
import shopBannerImg from '../../assets/images/banners/crackers1.png';

const ShopBanner = () => {
  return (
    <div 
      className="relative w-full h-64 md:h-80 lg:h-96 flex items-center justify-center bg-brand overflow-hidden"
      style={{
        backgroundImage: `url(${shopBannerImg})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Overlay to ensure text is readable */}
      <div className="absolute inset-0 bg-black/40"></div>
      
      {/* Banner Content */}
      <div className="relative z-10 text-center">
        <h1 className="text-white text-5xl md:text-6xl font-heading tracking-widest drop-shadow-lg uppercase">
          Shop Now
        </h1>
      </div>
    </div>
  );
};

export default ShopBanner;
