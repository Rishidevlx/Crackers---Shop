import React from 'react';

const products = [
  { id: 1, name: "Mega Combo Offer", price: 1500, oldPrice: 3000 },
  { id: 2, name: "1000 Wala Garland", price: 500, oldPrice: 1000 },
  { id: 3, name: "Special Sparklers Box", price: 250, oldPrice: 500 },
  { id: 4, name: "Multi-color Sky Shots", price: 800, oldPrice: 1600 }
];

const FeaturedProducts = () => {
  return (
    <div className="py-10 px-12 bg-white">
      <div className="mb-7">
        <h2 className="text-2xl text-gray-800 mb-1 font-medium uppercase font-heading">LATEST TOP SELLING</h2>
        <div className="w-12 h-0.5 bg-[#F8B400]"></div>
      </div>

      <div className="grid grid-cols-[repeat(auto-fill,minmax(250px,1fr))] gap-7 mt-5">
        {products.map((product) => (
          <div className="border border-gray-100 rounded-lg p-5 text-center transition-shadow duration-300 hover:shadow-lg bg-primary group" key={product.id}>
            <div className="w-full h-48 flex items-center justify-center mb-5 overflow-hidden">
              {/* Product Image with 360-degree rotation on hover (using group-hover) */}
              <div className="w-36 h-36 bg-gray-300 rounded-lg flex items-center justify-center transition-transform duration-700 ease-in-out group-hover:rotate-[360deg]">
                <span className="text-gray-500 font-bold">Img</span>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <h3 className="text-base text-gray-800 mb-2.5 font-body">{product.name}</h3>
              <div className="mb-4">
                <span className="font-bold text-brand text-lg mr-2.5">₹{product.price.toFixed(2)}</span>
                <span className="text-gray-500 line-through text-sm">₹{product.oldPrice.toFixed(2)}</span>
              </div>
              <button className="bg-footer text-white border-none py-2.5 px-5 rounded-full cursor-pointer font-bold text-sm transition-colors duration-300 hover:bg-brand font-body">
                ADD TO CART
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FeaturedProducts;
