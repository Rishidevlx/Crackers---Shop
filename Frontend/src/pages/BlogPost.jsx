import React, { useEffect, useState } from 'react';
import { useParams, Link, Navigate } from 'react-router-dom';
import SEO from '../components/seo/SEO';
import { blogsData } from '../data/blogs';

const BlogPost = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const foundBlog = blogsData.find(b => b.slug === slug);
    setBlog(foundBlog);
    setLoading(false);
  }, [slug]);

  if (loading) return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  if (!blog) return <Navigate to="/blog" />;

  return (
    <div className="font-body text-black bg-white min-h-screen pb-20">
      <SEO 
        title={`${blog.title} | AK Crackers Sivakasi`}
        description={blog.excerpt}
        keywords={blog.keywords}
        canonicalUrl={`https://akcrackers.genzneuralx.com/blog/${blog.slug}`}
      />

      {/* Header Image & Title */}
      <section className="relative w-full h-[50vh] min-h-[400px]">
        <img src={blog.image} alt={blog.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
          <div className="max-w-4xl mx-auto px-5 text-center mt-20">
            <div className="text-brand font-bold tracking-widest uppercase mb-4 text-sm bg-white/10 inline-block px-3 py-1 rounded backdrop-blur-sm">
              Sivakasi Crackers Guide
            </div>
            <h1 className="text-3xl md:text-5xl font-heading text-white leading-tight mb-6">{blog.title}</h1>
            <div className="text-gray-300 text-sm flex items-center justify-center gap-4">
              <span>By {blog.author}</span>
              <span>•</span>
              <span>{blog.date}</span>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="max-w-3xl mx-auto px-5 mt-[-40px] relative z-10 bg-white p-8 md:p-12 rounded-xl shadow-lg border border-gray-100">
        <div 
          className="prose prose-lg max-w-none text-gray-700
                     prose-headings:font-heading prose-headings:text-black prose-headings:uppercase
                     prose-h2:text-3xl prose-h2:mb-6 prose-h2:mt-10 prose-h2:text-brand
                     prose-h3:text-2xl prose-h3:mb-4 prose-h3:mt-8
                     prose-p:mb-6 prose-p:leading-relaxed
                     prose-ul:list-disc prose-ul:pl-6 prose-ul:mb-6
                     prose-li:mb-2"
          dangerouslySetInnerHTML={{ __html: blog.content }}
        />
        
        {/* Call to Action inside Blog */}
        <div className="mt-12 p-8 bg-primary rounded-lg text-center border-2 border-brand/20">
          <h3 className="text-2xl font-heading text-black uppercase mb-4">Ready to Light up your Diwali?</h3>
          <p className="text-gray-700 mb-6">Buy 100% Genuine Sivakasi Crackers online directly from AK Crackers.</p>
          <Link to="/shop" className="bg-brand text-white px-8 py-3 rounded-full font-heading uppercase text-lg hover:bg-footer transition-colors inline-block shadow-md">
            Explore Shop
          </Link>
        </div>

        <div className="mt-12 pt-8 border-t border-gray-200">
          <Link to="/blog" className="text-brand font-bold uppercase hover:underline">
            &larr; Back to all Blogs
          </Link>
        </div>
      </section>
    </div>
  );
};

export default BlogPost;
