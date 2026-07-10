import React, { useState, useEffect } from 'react';
import toast from 'react-hot-toast';
import { FiSettings, FiSave, FiImage, FiType, FiDollarSign } from 'react-icons/fi';

const GeneralSettings = () => {
  const [settings, setSettings] = useState({
    site_name: '',
    logo_url: '',
    favicon_url: '',
    currency_symbol: '₹'
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const res = await fetch(import.meta.env.VITE_API_URL + '/api/cms/home');
      const data = await res.json();
      if (data.success && data.data.general_settings) {
        setSettings({
          site_name: data.data.general_settings.site_name || '',
          logo_url: data.data.general_settings.logo_url || '',
          favicon_url: data.data.general_settings.favicon_url || '',
          currency_symbol: data.data.general_settings.currency_symbol || '₹'
        });
      }
    } catch (error) {
      console.error('Error fetching settings:', error);
      toast.error('Failed to load settings');
    } finally {
      setLoading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const token = localStorage.getItem('adminToken');
      const res = await fetch(import.meta.env.VITE_API_URL + '/api/cms/home', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ general_settings: settings })
      });
      const data = await res.json();
      if (data.success) {
        toast.success('Settings saved successfully!');
      } else {
        toast.error('Failed to save settings');
      }
    } catch (error) {
      console.error('Error saving settings:', error);
      toast.error('Network error while saving');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <div className="p-10 text-center text-gray-500 font-medium">Loading Settings...</div>;
  }

  return (
    <div className="p-6 max-w-4xl mx-auto font-body">
      <div className="mb-8 animate-fade-in-up">
        <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
          <FiSettings className="text-brand" /> General Settings
        </h1>
        <p className="text-gray-500 mt-2 text-lg">Manage your website's core branding and configuration.</p>
      </div>

      <form onSubmit={handleSave} className="space-y-6 animate-fade-in-up" style={{animationDelay: '0.1s'}}>
        {/* Branding Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex items-center gap-2">
            <FiType className="text-brand text-xl" />
            <h2 className="text-lg font-bold text-gray-800">Branding Information</h2>
          </div>
          
          <div className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Site Name</label>
              <input 
                type="text" 
                value={settings.site_name}
                onChange={(e) => setSettings({...settings, site_name: e.target.value})}
                placeholder="e.g. AK Crackers"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none transition-all"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <FiImage className="text-gray-400" /> Logo URL
                </label>
                <input 
                  type="text" 
                  value={settings.logo_url}
                  onChange={(e) => setSettings({...settings, logo_url: e.target.value})}
                  placeholder="https://example.com/logo.png"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none transition-all"
                />
                {settings.logo_url && (
                  <div className="mt-3 p-4 bg-gray-50 rounded-xl border border-gray-200 flex items-center justify-center h-32">
                    <img src={settings.logo_url} alt="Logo Preview" className="max-h-full max-w-full object-contain drop-shadow-md" />
                  </div>
                )}
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
                  <FiImage className="text-gray-400" /> Favicon URL
                </label>
                <input 
                  type="text" 
                  value={settings.favicon_url}
                  onChange={(e) => setSettings({...settings, favicon_url: e.target.value})}
                  placeholder="https://example.com/favicon.png"
                  className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none transition-all"
                />
                {settings.favicon_url && (
                  <div className="mt-3 p-4 bg-gray-50 rounded-xl border border-gray-200 flex items-center justify-center h-32">
                    <img src={settings.favicon_url} alt="Favicon Preview" className="h-12 w-12 object-contain drop-shadow-sm" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Configuration Card */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="bg-gray-50 px-6 py-4 border-b border-gray-100 flex items-center gap-2">
            <FiDollarSign className="text-brand text-xl" />
            <h2 className="text-lg font-bold text-gray-800">Regional Configuration</h2>
          </div>
          
          <div className="p-6">
            <div className="max-w-sm">
              <label className="block text-sm font-semibold text-gray-700 mb-2">Currency Symbol</label>
              <input 
                type="text" 
                value={settings.currency_symbol}
                onChange={(e) => setSettings({...settings, currency_symbol: e.target.value})}
                placeholder="e.g. ₹ or $"
                className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:bg-white focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none transition-all text-xl font-bold"
              />
            </div>
          </div>
        </div>

        {/* Action Area */}
        <div className="flex justify-end pt-4">
          <button 
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 bg-brand text-white px-8 py-3.5 rounded-xl font-bold hover:bg-brand/90 transition-all shadow-lg hover:shadow-brand/30 disabled:opacity-70"
          >
            {saving ? (
              <>Saving...</>
            ) : (
              <><FiSave className="text-xl" /> Save Configuration</>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default GeneralSettings;
