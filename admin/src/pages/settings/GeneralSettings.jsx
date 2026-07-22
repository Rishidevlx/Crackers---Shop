import React, { useState, useEffect, useRef } from 'react';
import toast from 'react-hot-toast';
import { FiSettings, FiSave, FiImage, FiType, FiDollarSign, FiUploadCloud, FiLink, FiX } from 'react-icons/fi';

const GeneralSettings = () => {
  const [settings, setSettings] = useState({
    site_name: '',
    logo_url: '',
    favicon_url: '',
    currency_symbol: '₹'
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [logoUploading, setLogoUploading] = useState(false);
  const [faviconUploading, setFaviconUploading] = useState(false);

  const logoInputRef = useRef(null);
  const faviconInputRef = useRef(null);

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

  const handleImageUpload = async (file, field, setUploading) => {
    if (!file) return;

    const formData = new FormData();
    formData.append('image', file);

    setUploading(true);
    const toastId = toast.loading('Uploading image to cloud...');

    try {
      const token = localStorage.getItem('adminToken');
      const response = await fetch(import.meta.env.VITE_API_URL + '/api/upload', {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${token}` },
        body: formData
      });
      const data = await response.json();
      if (data.success) {
        setSettings(prev => ({ ...prev, [field]: data.url }));
        toast.success('Image uploaded successfully!', { id: toastId });
      } else {
        toast.error(data.message || 'Upload failed', { id: toastId });
      }
    } catch (error) {
      console.error('Upload error:', error);
      toast.error('Upload failed. Please try again.', { id: toastId });
    } finally {
      setUploading(false);
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

  const ImageUploadField = ({ label, field, value, uploading, setUploading, inputRef, previewClass = 'h-24' }) => (
    <div>
      <label className="block text-sm font-semibold text-gray-700 mb-2 flex items-center gap-2">
        <FiImage className="text-gray-400" /> {label}
      </label>

      {/* Upload Button */}
      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        className="hidden"
        onChange={(e) => handleImageUpload(e.target.files[0], field, setUploading)}
      />
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        disabled={uploading}
        className="w-full flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-500 hover:border-brand hover:text-brand hover:bg-brand/5 transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed mb-3"
      >
        {uploading ? (
          <>
            <div className="w-4 h-4 border-2 border-brand border-t-transparent rounded-full animate-spin"></div>
            Uploading...
          </>
        ) : (
          <>
            <FiUploadCloud className="text-xl" />
            {value ? 'Replace Image' : 'Upload Image'}
          </>
        )}
      </button>

      {/* URL Text Input (manual fallback) */}
      <div className="flex items-center gap-2">
        <FiLink className="text-gray-400 shrink-0" />
        <input
          type="text"
          value={value}
          onChange={(e) => setSettings(prev => ({ ...prev, [field]: e.target.value }))}
          placeholder={`or paste URL directly...`}
          className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:bg-white focus:border-brand focus:ring-2 focus:ring-brand/20 outline-none transition-all text-gray-600"
        />
        {value && (
          <button type="button" onClick={() => setSettings(prev => ({ ...prev, [field]: '' }))} className="text-gray-400 hover:text-red-500 transition-colors">
            <FiX />
          </button>
        )}
      </div>

      {/* Preview */}
      {value && (
        <div className="mt-3 p-4 bg-gray-50 rounded-xl border border-gray-200 flex items-center justify-center">
          <img src={value} alt={`${label} Preview`} className={`${previewClass} object-contain drop-shadow-md`} />
        </div>
      )}
    </div>
  );

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
              <ImageUploadField
                label="Logo"
                field="logo_url"
                value={settings.logo_url}
                uploading={logoUploading}
                setUploading={setLogoUploading}
                inputRef={logoInputRef}
                previewClass="max-h-24 max-w-full"
              />
              
              <ImageUploadField
                label="Favicon"
                field="favicon_url"
                value={settings.favicon_url}
                uploading={faviconUploading}
                setUploading={setFaviconUploading}
                inputRef={faviconInputRef}
                previewClass="h-12 w-12"
              />
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
