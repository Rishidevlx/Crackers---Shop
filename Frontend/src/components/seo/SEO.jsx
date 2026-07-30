import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEO = ({ 
  title = "AK Crackers - Best Crackers Shop in Sivakasi", 
  description = "Buy standard and premium Diwali crackers online from AK Crackers, Sivakasi. We offer wholesale prices, combo packs, and safe delivery.",
  keywords = "AK Crackers Sivakasi, buy crackers online Sivakasi, Diwali crackers Sivakasi, Sivakasi crackers wholesale, best crackers shop in Sivakasi",
  canonicalUrl = "https://akcrackers.genzneuralx.com"
}) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={canonicalUrl} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      
      {/* Local Business Schema */}
      <script type="application/ld+json">
        {`
          {
            "@context": "https://schema.org",
            "@type": "Store",
            "name": "AK Crackers Sivakasi",
            "image": "https://akcrackers.genzneuralx.com/assets/logo.png",
            "telephone": "93639 53616",
            "email": "hari953616@gmail.com",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "138, Sivakasi Street",
              "addressLocality": "Sivakasi",
              "addressRegion": "Tamil Nadu",
              "addressCountry": "IN"
            },
            "url": "https://akcrackers.genzneuralx.com"
          }
        `}
      </script>
    </Helmet>
  );
};

export default SEO;
