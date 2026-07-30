import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../components/seo/SEO';
import { blogsData } from '../data/blogs';

const Blog = () => {
  return (
    <div className="font-body text-black bg-primary min-h-screen">
      <SEO 
        title="Blog - AK Crackers | Sivakasi Fireworks News & Guide"
        description="Read our latest blogs about Sivakasi crackers, safety tips, Diwali combos, and wholesale price guides. Stay updated with AK Crackers."
        keywords="Sivakasi crackers blog, Diwali fireworks guide, AK Crackers news, buy crackers online Sivakasi"
        canonicalUrl="https://akcrackers.genzneuralx.com/blog"
      />
      
      {/* Banner Section */}
      <section 
        className="relative h-64 md:h-80 bg-cover bg-center flex items-center"
        style={{ backgroundImage: 'linear-gradient(rgba(199, 14, 23, 0.8), rgba(47, 65, 93, 0.8)), url("/about_banner.png")' }}
      >
        <div className="container mx-auto px-4 lg:px-16 flex flex-col items-center justify-center z-10 text-center">
          <h1 className="text-4xl md:text-5xl font-heading text-white uppercase mb-4">
            Our Blog
          </h1>
          <div className="text-white text-sm md:text-base font-body">
            <Link to="/" className="hover:text-primary transition-colors">Home</Link>
            <span className="mx-2">/</span>
            <span className="text-gray-200">Blog</span>
          </div>
        </div>
      </section>

      {/* Blogs Grid */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-5 md:px-12">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-heading text-brand uppercase">Latest Articles</h2>
            <p className="text-gray-600 mt-4 max-w-2xl mx-auto">Everything you need to know about Sivakasi crackers, Diwali safety, and the best firework combo offers.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogsData.map(blog => (
              <div key={blog.id} className="bg-white border border-gray-100 rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col">
                <img src={blog.image} alt={blog.title} className="w-full h-48 object-cover" />
                <div className="p-6 flex flex-col flex-grow">
                  <div className="text-sm text-gray-500 mb-2">{blog.date}</div>
                  <h3 className="font-heading text-xl text-black mb-3 line-clamp-2">{blog.title}</h3>
                  <p className="text-gray-600 text-sm mb-6 flex-grow">{blog.excerpt}</p>
                  <Link 
                    to={`/blog/${blog.slug}`} 
                    className="text-brand font-bold uppercase text-sm hover:underline mt-auto inline-block w-fit"
                  >
                    Read More &rarr;
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Blog;
