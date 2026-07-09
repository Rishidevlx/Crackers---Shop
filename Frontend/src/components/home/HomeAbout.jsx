import React from 'react';
import bgImage from '../../assets/images/banners/crackers1.png';

const HomeAbout = () => {
  return (
    <div 
      className="relative w-full py-24 px-5 md:px-12 flex items-center justify-center lg:justify-start overflow-hidden bg-brand"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}
    >
      {/* Subtle overlay for text readability if needed */}
      <div className="absolute inset-0 bg-black/30"></div>

      {/* Content Container */}
      <div className="relative z-10 max-w-3xl text-center lg:text-left text-white mx-auto lg:mx-0 lg:ml-20">
        <h2 className="text-3xl md:text-4xl font-heading tracking-wider mb-6 drop-shadow-lg uppercase">
          Online Crackers in Sivakasi
        </h2>
        
        <p className="text-base md:text-lg font-body leading-relaxed drop-shadow-md">
          <span className="font-bold text-[#F8B400]">AK Crackers</span> is a leading Online Crackers shop in Sivakasi. We are top Online Crackers in Sivakasi for more than 25 years of experience in Online crackers in sivakasi. With our Top-Rated Customer service, good packaging and proper delivery of online crackers we now have more than 25,000+ happy customers.
        </p>

        <div className="mt-8">
          <button className="bg-[#F8B400] text-black px-8 py-3 rounded-full font-bold hover:bg-white hover:text-brand transition-colors duration-300 shadow-lg">
            KNOW MORE ABOUT US
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeAbout;
