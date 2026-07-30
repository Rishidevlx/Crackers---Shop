import React from 'react';
import SEO from '../components/seo/SEO';
import Hero from '../components/home/Hero';
import Categories from '../components/home/Categories';
import FeaturedProducts from '../components/home/FeaturedProducts';
import HomeMarquee from '../components/home/HomeMarquee';
import HomeAbout from '../components/home/HomeAbout';

const Home = () => {
  return (
    <main className="home-page font-body">
      <SEO 
        title="AK Crackers - Buy Best Crackers Online in Sivakasi"
        description="Looking for the best Diwali crackers in Sivakasi? Buy standard and premium crackers at wholesale prices. Safe and fast delivery across India."
        keywords="Sivakasi crackers wholesale, buy crackers online Sivakasi, best crackers shop in Sivakasi, Diwali crackers Sivakasi"
        canonicalUrl="https://akcrackers.genzneuralx.com/home"
      />
      <Hero />
      <Categories />
      <FeaturedProducts />
      <HomeMarquee />
      <HomeAbout />
    </main>
  );
};

export default Home;
