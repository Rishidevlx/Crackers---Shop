import React from 'react';
import Hero from '../components/home/Hero';
import Categories from '../components/home/Categories';
import FeaturedProducts from '../components/home/FeaturedProducts';

const Home = () => {
  return (
    <main className="home-page">
      <Hero />
      <Categories />
      <FeaturedProducts />
    </main>
  );
};

export default Home;
