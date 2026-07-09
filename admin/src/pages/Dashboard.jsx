import React from 'react';
import { Link } from 'react-router-dom';
import { 
  FiBox, FiGrid, FiTag, FiStar, FiMessageCircle, 
  FiArrowRight, FiActivity, FiPieChart, FiBarChart2 
} from 'react-icons/fi';

const StatCard = ({ title, value, icon: Icon, trend, isPositive }) => (
  <div className="p-6 rounded-xl bg-white border border-gray-100 shadow-sm hover:shadow-md transition-shadow flex-1 min-w-[200px]">
    <div className="w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center text-gray-600 border border-gray-100 mb-4">
      <Icon className="text-xl" />
    </div>
    <div className="flex justify-between items-end mt-2">
      <div>
        <p className="text-gray-500 text-sm font-medium mb-1">{title}</p>
        <h3 className="text-2xl font-bold text-gray-800">{value}</h3>
      </div>
      {trend && (
        <span className={`text-xs font-bold px-2 py-1 rounded-md ${isPositive ? 'text-green-500 bg-green-50' : 'text-red-500 bg-red-50'}`}>
          {isPositive ? '↑' : '↓'} {trend}
        </span>
      )}
    </div>
  </div>
);

const ShortcutCard = ({ title, to, icon: Icon }) => (
  <Link to={to} className="flex items-center p-4 bg-white border border-gray-100 rounded-xl shadow-sm hover:shadow-md hover:border-brand/30 transition-all group">
    <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center text-gray-500 group-hover:text-brand group-hover:bg-red-50 transition-colors mr-4">
      <Icon className="text-xl" />
    </div>
    <div className="flex-1">
      <h4 className="font-bold text-gray-800 text-sm">{title}</h4>
    </div>
    <FiArrowRight className="text-gray-300 group-hover:text-brand transition-colors" />
  </Link>
);

const Dashboard = () => {
  return (
    <div className="flex flex-col gap-8 pb-10 font-body">
      
      {/* Header section */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800 mb-1">Dashboard Overview</h1>
        <p className="text-gray-500 text-sm">Welcome back! Here's a quick summary of your store.</p>
      </div>

      {/* Stats Grid (5 Cards) */}
      <div className="flex flex-wrap gap-4">
        <StatCard 
          title="Total Products" 
          value="124" 
          icon={FiBox}
          trend="12%"
          isPositive={true}
        />
        <StatCard 
          title="Total Categories" 
          value="18" 
          icon={FiGrid}
          trend="2%"
          isPositive={true}
        />
        <StatCard 
          title="Total Offers" 
          value="5" 
          icon={FiTag}
          trend="10%"
          isPositive={false}
        />
        <StatCard 
          title="Featured Products" 
          value="12" 
          icon={FiStar}
        />
        <StatCard 
          title="Latest Enquiries" 
          value="48" 
          icon={FiMessageCircle}
          trend="24%"
          isPositive={true}
        />
      </div>

      {/* Graphs Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Enquiries Graph */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 lg:col-span-2">
          <div className="flex justify-between items-center mb-6">
            <div>
              <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                 Monthly Enquiries
              </h2>
              <p className="text-gray-500 text-xs mt-1">Enquiry requests over time</p>
            </div>
            <select className="text-sm border border-gray-200 rounded px-2 py-1 outline-none text-gray-600 font-medium">
              <option>This Year</option>
              <option>Last Year</option>
            </select>
          </div>
          <div className="w-full h-64 flex items-center justify-center relative overflow-hidden mt-4 border-b border-gray-100 pb-4">
             {/* Dummy line chart visual matching the blue theme */}
             <svg className="w-full h-full absolute bottom-0" viewBox="0 0 100 40" preserveAspectRatio="none">
               <path d="M0 40 L0 30 L20 20 L40 35 L60 15 L80 25 L100 5 L100 40 Z" fill="#eff2fc" />
               <path d="M0 30 L20 20 L40 35 L60 15 L80 25 L100 5" fill="none" stroke="#3c50e0" strokeWidth="1.5" />
               {/* Data points */}
               <circle cx="20" cy="20" r="1.5" fill="#3c50e0" stroke="#fff" strokeWidth="0.5" />
               <circle cx="40" cy="35" r="1.5" fill="#3c50e0" stroke="#fff" strokeWidth="0.5" />
               <circle cx="60" cy="15" r="1.5" fill="#3c50e0" stroke="#fff" strokeWidth="0.5" />
               <circle cx="80" cy="25" r="1.5" fill="#3c50e0" stroke="#fff" strokeWidth="0.5" />
               <circle cx="100" cy="5" r="1.5" fill="#3c50e0" stroke="#fff" strokeWidth="0.5" />
             </svg>
             {/* Grid lines */}
             <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                <div className="w-full h-px bg-gray-100"></div>
                <div className="w-full h-px bg-gray-100"></div>
                <div className="w-full h-px bg-gray-100"></div>
                <div className="w-full h-px bg-gray-100"></div>
             </div>
          </div>
          <div className="flex justify-between text-xs text-gray-400 mt-2 px-2">
            <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span>
          </div>
        </div>

        {/* Categories Graph */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 flex flex-col">
          <h2 className="text-lg font-bold text-gray-800 mb-1">
            Category Target
          </h2>
          <p className="text-gray-500 text-xs mb-8">Target you've set for each month</p>
          
          <div className="flex-1 flex flex-col items-center justify-center relative">
            {/* Dummy gauge/pie chart visual matching TailAdmin */}
            <div className="relative w-48 h-24 overflow-hidden mb-4">
              <div className="absolute top-0 left-0 w-48 h-48 rounded-full border-[16px] border-gray-100"></div>
              <div className="absolute top-0 left-0 w-48 h-48 rounded-full border-[16px] border-transparent border-t-[#3c50e0] border-l-[#3c50e0] rotate-45"></div>
            </div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/4 text-center">
              <h3 className="text-3xl font-bold text-gray-800">75.55%</h3>
              <span className="text-xs font-bold text-green-500 bg-green-50 px-2 py-0.5 rounded-full mt-1 inline-block">+10%</span>
            </div>
          </div>
          <p className="text-center text-sm text-gray-500 mt-4">You have achieved 75% of your target this month. Keep up the good work!</p>
        </div>

        {/* Product Graph */}
        <div className="bg-white p-6 rounded-xl shadow-sm border border-gray-100 lg:col-span-3">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              Monthly Sales
            </h2>
          </div>
          
          <div className="w-full h-64 relative flex items-end justify-between px-4 pb-6 pt-4 border-b border-gray-100">
             {/* Grid lines */}
             <div className="absolute inset-0 flex flex-col justify-between pointer-events-none pb-6">
                <div className="w-full flex items-center gap-2"><span className="text-xs text-gray-400 w-6">400</span><div className="flex-1 h-px bg-gray-100"></div></div>
                <div className="w-full flex items-center gap-2"><span className="text-xs text-gray-400 w-6">300</span><div className="flex-1 h-px bg-gray-100"></div></div>
                <div className="w-full flex items-center gap-2"><span className="text-xs text-gray-400 w-6">200</span><div className="flex-1 h-px bg-gray-100"></div></div>
                <div className="w-full flex items-center gap-2"><span className="text-xs text-gray-400 w-6">100</span><div className="flex-1 h-px bg-gray-100"></div></div>
                <div className="w-full flex items-center gap-2"><span className="text-xs text-gray-400 w-6">0</span><div className="flex-1 h-px bg-gray-100"></div></div>
             </div>

             {/* Dummy bar chart visual */}
             <div className="w-8 bg-[#3c50e0] h-[35%] rounded-t-sm z-10 ml-10 hover:opacity-80 transition-opacity"></div>
             <div className="w-8 bg-[#3c50e0] h-[80%] rounded-t-sm z-10 hover:opacity-80 transition-opacity"></div>
             <div className="w-8 bg-[#3c50e0] h-[45%] rounded-t-sm z-10 hover:opacity-80 transition-opacity"></div>
             <div className="w-8 bg-[#3c50e0] h-[65%] rounded-t-sm z-10 hover:opacity-80 transition-opacity"></div>
             <div className="w-8 bg-[#3c50e0] h-[40%] rounded-t-sm z-10 hover:opacity-80 transition-opacity"></div>
             <div className="w-8 bg-[#3c50e0] h-[60%] rounded-t-sm z-10 hover:opacity-80 transition-opacity"></div>
             <div className="w-8 bg-[#3c50e0] h-[25%] rounded-t-sm z-10 hover:opacity-80 transition-opacity"></div>
             <div className="w-8 bg-[#3c50e0] h-[50%] rounded-t-sm z-10 hover:opacity-80 transition-opacity"></div>
             <div className="w-8 bg-[#3c50e0] h-[85%] rounded-t-sm z-10 hover:opacity-80 transition-opacity"></div>
             <div className="w-8 bg-[#3c50e0] h-[55%] rounded-t-sm z-10 hover:opacity-80 transition-opacity"></div>
             <div className="w-8 bg-[#3c50e0] h-[20%] rounded-t-sm z-10 hover:opacity-80 transition-opacity mr-2"></div>
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-3 pl-10 pr-2">
            <span>Jan</span><span>Feb</span><span>Mar</span><span>Apr</span><span>May</span><span>Jun</span><span>Jul</span><span>Aug</span><span>Sep</span><span>Oct</span><span>Nov</span>
          </div>
        </div>

      </div>

      {/* Shortcuts Section */}
      <div>
        <h2 className="text-lg font-bold text-gray-800 mb-4 mt-2">Quick Shortcuts</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <ShortcutCard title="Manage Products" to="/dashboard/products" icon={FiBox} />
          <ShortcutCard title="Manage Offers" to="/dashboard/offers" icon={FiTag} />
          <ShortcutCard title="View Enquiries" to="/dashboard/enquiries/customer" icon={FiMessageCircle} />
          <ShortcutCard title="General Settings" to="/dashboard/settings/general" icon={FiGrid} />
        </div>
      </div>

    </div>
  );
};

export default Dashboard;
