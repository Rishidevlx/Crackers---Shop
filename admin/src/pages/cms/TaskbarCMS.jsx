import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { FiSave } from 'react-icons/fi';

const TaskbarCMS = () => {
  const [text, setText] = useState('Order value must be at least ₹2,500.');
  const [minimumValue, setMinimumValue] = useState(2500);
  const [isActive, setIsActive] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(import.meta.env.VITE_API_URL + '/api/cms/home');
      const data = await response.json();
      if (data.success && data.data.taskbar_settings) {
        const settings = typeof data.data.taskbar_settings === 'string' 
          ? JSON.parse(data.data.taskbar_settings) 
          : data.data.taskbar_settings;
        setText(settings.text || '');
        setMinimumValue(settings.minimum_value || 0);
        setIsActive(settings.is_active !== false);
      }
    } catch (error) {
      console.error('Error fetching taskbar settings:', error);
      toast.error('Failed to load settings');
    }
  };

  const handleSave = async () => {
    setIsLoading(true);
    const token = localStorage.getItem('adminToken');
    
    try {
      const payload = {
        taskbar_settings: {
          text,
          minimum_value: parseFloat(minimumValue) || 0,
          is_active: isActive
        }
      };

      const response = await fetch(import.meta.env.VITE_API_URL + '/api/cms/home', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(payload)
      });

      const data = await response.json();
      if (data.success) {
        toast.success('Taskbar settings saved successfully!');
      } else {
        toast.error(data.message || 'Failed to save settings');
      }
    } catch (error) {
      console.error('Error saving taskbar settings:', error);
      toast.error('Server error');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto pb-10">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Taskbar Settings</h1>
        <p className="text-gray-500 text-sm mt-1">Configure the message displayed above the floating order bar on the Shop page.</p>
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6">
        <div className="space-y-6">
          
          {/* Toggle Active/Inactive */}
          <div className="flex items-center justify-between border-b border-gray-100 pb-6">
            <div>
              <h3 className="text-sm font-semibold text-gray-800">Enable Taskbar</h3>
              <p className="text-xs text-gray-500 mt-1">Show or hide the taskbar above the floating order bar.</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input 
                type="checkbox" 
                className="sr-only peer"
                checked={isActive}
                onChange={() => setIsActive(!isActive)}
              />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#3c50e0]"></div>
            </label>
          </div>

          {/* Minimum Order Value */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Minimum Order Value (₹) *</label>
            <input 
              type="number" 
              value={minimumValue}
              onChange={(e) => setMinimumValue(e.target.value)}
              className="w-full border border-gray-300 rounded-lg py-2.5 px-4 outline-none focus:border-[#3c50e0]"
              placeholder="e.g., 2500"
              required
              min="0"
            />
            <p className="text-xs text-gray-500 mt-1">Users cannot place an order if their cart total is below this amount.</p>
          </div>

          {/* Taskbar Text */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-2">Taskbar Text *</label>
            <input 
              type="text" 
              value={text}
              onChange={(e) => setText(e.target.value)}
              className="w-full border border-gray-300 rounded-lg py-2.5 px-4 outline-none focus:border-[#3c50e0]"
              placeholder="e.g., Order value must be at least ₹2,500."
              required
            />
          </div>

          <div className="pt-4 border-t border-gray-100">
            <button 
              onClick={handleSave}
              disabled={isLoading}
              className="bg-[#3c50e0] text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 flex items-center gap-2 font-medium transition-colors disabled:opacity-50"
            >
              <FiSave /> {isLoading ? 'Saving...' : 'Save Settings'}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
};

export default TaskbarCMS;
