import React from 'react';
import { FaPhoneAlt, FaBoxOpen, FaPercent, FaHandshake, FaQuoteLeft, FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <div className="font-body text-black bg-primary min-h-screen">
      
      {/* 1. Banner Section */}
      <section 
        className="relative h-64 md:h-80 bg-cover bg-center flex items-center"
        style={{ backgroundImage: 'linear-gradient(rgba(199, 14, 23, 0.8), rgba(47, 65, 93, 0.8)), url("/about_banner.png")' }}
      >
        <div className="container mx-auto px-4 lg:px-16 flex flex-col md:flex-row justify-between items-center z-10">
          <h1 className="text-3xl md:text-4xl font-heading text-white uppercase mb-4 md:mb-0">
            About AK Crackers
          </h1>
          <div className="text-white text-sm md:text-base font-body">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-200">About Us</span>
          </div>
        </div>
      </section>

      {/* 2. Intro Section */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-4 lg:px-16 flex flex-col lg:flex-row items-center gap-12">
          <div className="w-full lg:w-1/2">
            <img 
              src="/about_intro.png" 
              alt="AK Crackers Family Celebration" 
              className="rounded-lg shadow-xl w-full h-[400px] object-cover"
            />
          </div>
          <div className="w-full lg:w-1/2">
            <h2 className="text-3xl md:text-4xl font-heading text-brand mb-6 uppercase">
              Online Crackers Shopping Sivakasi
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              Welcome to <strong>AK Crackers</strong>, your premier destination for high-quality fireworks since 2020. 
              We are a leading crackers online shopping platform located in the heart of Sivakasi, offering an extensive collection 
              of sparklers, flower pots, rockets, fancy crackers, and multi-shot aerials.
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">
              All our crackers are sourced directly from top manufacturers to ensure a smooth and enjoyable online crackers shopping experience. 
              With our user-friendly site and fast delivery service, we strive to make your celebrations brighter and more memorable.
            </p>
            <div className="flex gap-4">
              <Link to="/shop" className="bg-brand text-white px-8 py-3 rounded-full font-heading uppercase text-lg hover:bg-footer transition-colors shadow-lg">
                Shop Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Why Choose Us Section */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4 lg:px-16 text-center">
          <p className="text-gray-500 italic mb-2">Core values</p>
          <h2 className="text-3xl md:text-4xl font-heading text-black mb-12 uppercase">
            Why Choose Us?
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full border-2 border-brand flex items-center justify-center text-brand text-2xl mb-4 hover:bg-brand hover:text-white transition-colors">
                <FaPhoneAlt />
              </div>
              <h3 className="font-heading text-xl mb-2 uppercase">Outstanding Support</h3>
              <p className="text-sm text-gray-600 text-center">We are here to assist you 24/7 with any queries.</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full border-2 border-brand flex items-center justify-center text-brand text-2xl mb-4 hover:bg-brand hover:text-white transition-colors">
                <FaBoxOpen />
              </div>
              <h3 className="font-heading text-xl mb-2 uppercase">Secure Packaging</h3>
              <p className="text-sm text-gray-600 text-center">Safest packaging to ensure damage-free delivery.</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full border-2 border-brand flex items-center justify-center text-brand text-2xl mb-4 hover:bg-brand hover:text-white transition-colors">
                <FaPercent />
              </div>
              <h3 className="font-heading text-xl mb-2 uppercase">Up To 90% Discount</h3>
              <p className="text-sm text-gray-600 text-center">Unbeatable wholesale prices directly from Sivakasi.</p>
            </div>
            
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 rounded-full border-2 border-brand flex items-center justify-center text-brand text-2xl mb-4 hover:bg-brand hover:text-white transition-colors">
                <FaHandshake />
              </div>
              <h3 className="font-heading text-xl mb-2 uppercase">Trustworthy Service</h3>
              <p className="text-sm text-gray-600 text-center">Quality assured crackers for your bright celebrations.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Crackers Online Shopping (Diya Section) */}
      <section className="py-16 md:py-24 bg-primary relative overflow-hidden">
        {/* Decorative background elements can go here */}
        <div className="container mx-auto px-4 lg:px-16 flex flex-col-reverse lg:flex-row items-center gap-12">
          <div className="w-full lg:w-1/2 flex justify-center">
            <img 
              src="/diwali_diya.png" 
              alt="Joy of Deepavali Diya" 
              className="w-full max-w-md h-auto object-contain drop-shadow-2xl"
            />
          </div>
          <div className="w-full lg:w-1/2">
            <h2 className="text-3xl md:text-5xl font-heading text-black mb-6 uppercase">
              Crackers Online Shopping
            </h2>
            <p className="text-gray-700 leading-relaxed mb-4">
              <strong>Crackers Online Shopping</strong> is increasing nowadays, and you can conveniently book Diwali crackers from the comfort of your home using your mobile phone, making your <strong>online crackers shopping</strong> experience hassle-free.
            </p>
            <p className="text-gray-700 leading-relaxed mb-6">
              <strong>AK Crackers</strong> is a leading <strong>crackers online shopping in Sivakasi</strong>, offering a wide range of high-quality <strong>online crackers sivakasi</strong> at unbeatable prices with amazing discounts. We bring you an extensive collection of fireworks sourced directly from Sivakasi's top manufacturers.
            </p>
            <p className="text-gray-700 font-semibold mb-8">
              Order Now for the Ultimate Sivakasi Experience!
            </p>
            <Link to="/pricelist" className="bg-brand text-white px-10 py-3 rounded-full font-heading uppercase text-lg hover:bg-footer transition-colors shadow-lg">
              Pricelist
            </Link>
          </div>
        </div>
      </section>

      {/* 5. Testimonials Section */}
      <section className="py-16 bg-primary">
        <div className="container mx-auto px-4 lg:px-16">
          <div className="text-center mb-12">
            <p className="text-gray-500 italic mb-2">Happy Customer</p>
            <h2 className="text-3xl md:text-4xl font-heading text-black uppercase">
              Testimonials
            </h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white p-8 rounded-lg shadow-md flex flex-col items-center text-center relative pt-12">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-2 text-gray-300 text-4xl">
                <FaQuoteLeft />
              </div>
              <p className="text-gray-600 text-sm mb-6 flex-grow">
                "I recently ordered from AK Crackers, and I must say they offer the best online crackers shopping site in Sivakasi. The quality was amazing, and the prices were much lower than others. Best site for anyone looking for online crackers shopping!"
              </p>
              <div className="flex text-yellow-400 mb-4">
                <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-green-600 text-white flex items-center justify-center font-bold text-xl">
                  R
                </div>
                <h4 className="font-heading text-lg">Raja</h4>
              </div>
            </div>

            {/* Testimonial 2 */}
            <div className="bg-white p-8 rounded-lg shadow-md flex flex-col items-center text-center relative pt-12">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-2 text-gray-300 text-4xl">
                <FaQuoteLeft />
              </div>
              <p className="text-gray-600 text-sm mb-6 flex-grow">
                "Super happy with my first crackers online shopping from AK Crackers. The website was very user-friendly easy to navigate, and the delivery was right on time. Got an amazing deal with an online crackers discount. Will buy again next year!"
              </p>
              <div className="flex text-yellow-400 mb-4">
                <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-xl">
                  M
                </div>
                <h4 className="font-heading text-lg">Meena</h4>
              </div>
            </div>

            {/* Testimonial 3 */}
            <div className="bg-white p-8 rounded-lg shadow-md flex flex-col items-center text-center relative pt-12">
              <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-full p-2 text-gray-300 text-4xl">
                <FaQuoteLeft />
              </div>
              <p className="text-gray-600 text-sm mb-6 flex-grow">
                "Very happy with my online crackers shopping sivakasi order. AK Crackers was customer friendly, and the delivery was right on time. Got an best online crackers shopping sivakasi with good quality and good packaging. Referred many of my friends also."
              </p>
              <div className="flex text-yellow-400 mb-4">
                <FaStar /><FaStar /><FaStar /><FaStar /><FaStar />
              </div>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-brand text-white flex items-center justify-center font-bold text-xl">
                  P
                </div>
                <h4 className="font-heading text-lg">Pooja</h4>
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default About;
