import React, { useState, useEffect } from 'react';
import { FaBolt } from 'react-icons/fa';

const HomeMarquee = () => {
  const [text, setText] = useState('SPECIAL DIWALI OFFER: GET UPTO 50% OFF ON ALL BULK ORDERS! LIMITED TIME ONLY.');

  useEffect(() => {
    const fetchCMS = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/cms/home');
        const data = await response.json();
        if (data.success && data.data.marquee_text) {
          setText(data.data.marquee_text);
        }
      } catch (err) {
        console.error('Failed to fetch marquee:', err);
      }
    };
    fetchCMS();
  }, []);

  return (
    <div className="bg-[#2F415D] text-white py-2 overflow-hidden relative">
      <div className="whitespace-nowrap flex items-center">
        <div className="inline-block animate-marquee hover:[animation-play-state:paused]">
          {/* Duplicate content for seamless loop */}
          {[...Array(3)].map((_, i) => (
            <span key={i} className="mx-4 text-sm font-semibold tracking-wide flex items-center inline-flex">
              <FaBolt className="text-yellow-400 mr-2" />
              {text}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default HomeMarquee;
