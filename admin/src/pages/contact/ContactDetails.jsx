import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';

const ContactDetails = () => {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    address: '138, Srivilliputhur Street,\\nSivakasi, Tamil Nadu',
    phone: '+91 93639 53616',
    email: 'hari953616@gmail.com',
    working_hours: 'Monday to Sunday: 9:00 AM - 9:00 PM',
    map_url: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3936.141517032128!2d77.79524451478953!3d9.452668593226768!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b06cee43b8210e3%3A0x868b446a2a07d4b4!2sSivakasi%2C%20Tamil%20Nadu!5e0!3m2!1sen!2sin!4v1689254125867!5m2!1sen!2sin',
    call_number: '+919363953616'
  });

  useEffect(() => {
    fetchContactDetails();
  }, []);

  const fetchContactDetails = async () => {
    try {
      const response = await fetch(import.meta.env.VITE_API_URL + '/api/cms/home');
      const data = await response.json();
      if (data.success && data.data.contact_details) {
        setFormData(data.data.contact_details);
      }
    } catch (error) {
      toast.error('Failed to fetch contact details');
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(import.meta.env.VITE_API_URL + '/api/cms/home', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('adminToken')}`,
        },
        body: JSON.stringify({ contact_details: formData }),
      });

      const data = await response.json();
      if (data.success) {
        toast.success('Contact details updated successfully!');
      } else {
        toast.error(data.message || 'Failed to update contact details');
      }
    } catch (error) {
      toast.error('An error occurred while updating details');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl">
      <h1 className="text-2xl font-bold mb-2">Contact Details</h1>
      <p className="text-gray-600 mb-6">Manage contact information displayed on the website</p>

      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Store Address
            </label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              rows="3"
              className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., 138, Srivilliputhur Street, Sivakasi"
              required
            ></textarea>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Customer Service Number
            </label>
            <div className="flex border border-gray-300 rounded focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
              <span className="flex items-center px-3 bg-gray-100 text-gray-600 border-r border-gray-300 rounded-l">
                +91
              </span>
              <input
                type="text"
                name="phone"
                value={formData.phone.replace('+91', '').trim()}
                onChange={(e) => setFormData(prev => ({ ...prev, phone: '+91 ' + e.target.value }))}
                className="w-full p-2 outline-none rounded-r"
                placeholder="XXXXX XXXXX"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Floating Call Icon Number
            </label>
            <div className="flex border border-gray-300 rounded focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-blue-500">
              <span className="flex items-center px-3 bg-gray-100 text-gray-600 border-r border-gray-300 rounded-l">
                +91
              </span>
              <input
                type="text"
                name="call_number"
                value={formData.call_number.replace('+91', '').trim()}
                onChange={(e) => setFormData(prev => ({ ...prev, call_number: '+91' + e.target.value.replace(/\s/g, '') }))}
                className="w-full p-2 outline-none rounded-r"
                placeholder="XXXXXXXXXX"
                required
              />
            </div>
            <p className="text-xs text-gray-500 mt-1">Used for the floating call button (10 digits)</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email Address
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
              placeholder="email@example.com"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Opening Hours
            </label>
            <input
              type="text"
              name="working_hours"
              value={formData.working_hours}
              onChange={handleInputChange}
              className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., Monday to Sunday: 9:00 AM - 9:00 PM"
              required
            />
          </div>

          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Google Maps Embed URL
            </label>
            <textarea
              name="map_url"
              value={formData.map_url}
              onChange={handleInputChange}
              rows="3"
              className="w-full p-2 border border-gray-300 rounded focus:ring-blue-500 focus:border-blue-500"
              placeholder="https://www.google.com/maps/embed?..."
              required
            ></textarea>
            <p className="text-xs text-gray-500 mt-1">Go to Google Maps -{'>'} Share -{'>'} Embed a map -{'>'} Copy the src URL only</p>
          </div>
        </div>

        <div className="mt-8">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors disabled:bg-blue-400"
          >
            {loading ? 'Saving...' : 'Save Settings'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactDetails;
