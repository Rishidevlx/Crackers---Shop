import React from 'react';
import Hero from '../components/home/Hero';
import Categories from '../components/home/Categories';
import FeaturedProducts from '../components/home/FeaturedProducts';
import HomeMarquee from '../components/home/HomeMarquee';
import HomeAbout from '../components/home/HomeAbout';

const Home = () => {
  return (
    <main className="home-page font-body">
      <Hero />
      <Categories />
      <FeaturedProducts />
      <HomeMarquee />
      <HomeAbout />
    </main>
  );
};

export default Home;
