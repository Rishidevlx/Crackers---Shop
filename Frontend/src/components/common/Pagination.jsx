import React from 'react';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const Pagination = () => {
  return (
    <div className="flex justify-center items-center gap-2 mt-12 font-body">
      <button className="w-10 h-10 rounded-full flex items-center justify-center border border-gray-200 text-gray-500 hover:bg-gray-100 transition-colors disabled:opacity-50">
        <FiChevronLeft />
      </button>
      
      <button className="w-10 h-10 rounded-full flex items-center justify-center bg-brand text-white font-bold shadow-md">
        1
      </button>
      <button className="w-10 h-10 rounded-full flex items-center justify-center border border-gray-200 text-gray-700 hover:bg-gray-100 transition-colors font-semibold">
        2
      </button>
      <button className="w-10 h-10 rounded-full flex items-center justify-center border border-gray-200 text-gray-700 hover:bg-gray-100 transition-colors font-semibold">
        3
      </button>
      
      <span className="text-gray-400 mx-1">...</span>
      
      <button className="w-10 h-10 rounded-full flex items-center justify-center border border-gray-200 text-gray-700 hover:bg-gray-100 transition-colors font-semibold">
        12
      </button>

      <button className="w-10 h-10 rounded-full flex items-center justify-center border border-gray-200 text-gray-500 hover:bg-gray-100 transition-colors">
        <FiChevronRight />
      </button>
    </div>
  );
};

export default Pagination;
