'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth-context';
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { Save, Plus, Trash2, Eye, Link2 } from 'lucide-react';

const COLLECTION = process.env.NEXT_PUBLIC_COACHPAGE_COLLECTION || "coachpage_tenants";

export default function ProfilePage() {
  const { user } = useAuth();
  const tenantId = user?.uid || "demo-tenant-id";
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [previewMode, setPreviewMode] = useState(false);
  const [profile, setProfile] = useState<any>({
    institute_name: '',
    tagline: '',
    logo_url: '',
    banner_image_url: '',
    institute_type: 'NEET/JEE',
    established_year: '',
    total_students_trained: '',
    about: '',
    achievements: [''],
    address: '',
    map_embed_url: '',
    phone: '',
    whatsapp_number: '',
    email: '',
    facebook_url: '',
    instagram_url: '',
    youtube_url: '',
    theme_color: '#1e40af',
    office_hours: 'Mon-Sat: 8 AM - 8 PM',
  });

  useEffect(() => {
    async function fetchProfile() {
      const docRef = doc(db, COLLECTION, tenantId, "profile", "main");
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setProfile((prev: any) => ({ ...prev, ...docSnap.data() }));
      }
      setLoading(false);
    }
    fetchProfile();
  }, [tenantId]);

  const handleChange = (field: string, value: any) => {
    setProfile((prev: any) => ({ ...prev, [field]: value }));
  };

  const addAchievement = () => {
    handleChange('achievements', [...(profile.achievements || []), '']);
  };

  const updateAchievement = (index: number, value: string) => {
    const achievements = [...(profile.achievements || [])];
    achievements[index] = value;
    handleChange('achievements', achievements);
  };

  const removeAchievement = (index: number) => {
    handleChange('achievements', profile.achievements.filter((_: string, i: number) => i !== index));
  };

  const handleSave = async () => {
    setSaving(true);
    setSaved(false);
    try {
      const docRef = doc(db, COLLECTION, tenantId, "profile", "main");
      await setDoc(docRef, {
        ...profile,
        updated_at: serverTimestamp()
      }, { merge: true });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (error) {
      console.error("Error updating profile:", error);
      alert("Error updating profile");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-900"></div></div>;

  return (
    <div className="max-w-4xl space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Institute Profile</h1>
        <div className="flex gap-3">
          <button onClick={() => setPreviewMode(!previewMode)} className="flex items-center gap-2 px-4 py-2 border rounded-lg font-bold text-gray-600 hover:bg-gray-50">
            <Eye className="w-4 h-4" /> {previewMode ? 'Edit Mode' : 'Preview'}
          </button>
          <button onClick={handleSave} disabled={saving} className={`flex items-center gap-2 px-6 py-2 rounded-lg font-bold transition-colors ${saved ? 'bg-green-600 text-white' : 'bg-blue-600 text-white hover:bg-blue-700'} disabled:opacity-50`}>
            <Save className="w-4 h-4" /> {saving ? 'Saving...' : saved ? 'Saved!' : 'Save Changes'}
          </button>
        </div>
      </div>

      {previewMode ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
          <div className="h-48 bg-gradient-to-r from-blue-900 to-blue-700 relative">
            {profile.banner_image_url && <img src={profile.banner_image_url} alt="Banner" className="w-full h-full object-cover" />}
            <div className="absolute bottom-4 left-6 flex items-end gap-4">
              {profile.logo_url && <img src={profile.logo_url} alt="Logo" className="w-20 h-20 rounded-xl border-4 border-white object-cover bg-white" />}
              <div className="text-white">
                <h2 className="text-2xl font-bold">{profile.institute_name || 'Institute Name'}</h2>
                <p className="text-blue-200 text-sm">{profile.tagline || 'Tagline'}</p>
              </div>
            </div>
          </div>
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center p-3 bg-blue-50 rounded-xl"><p className="text-2xl font-bold text-blue-600">{profile.total_students_trained || '0'}</p><p className="text-xs text-gray-500">Students Trained</p></div>
              <div className="text-center p-3 bg-green-50 rounded-xl"><p className="text-2xl font-bold text-green-600">{profile.established_year || '----'}</p><p className="text-xs text-gray-500">Established</p></div>
              <div className="text-center p-3 bg-purple-50 rounded-xl"><p className="text-2xl font-bold text-purple-600">{profile.institute_type}</p><p className="text-xs text-gray-500">Type</p></div>
              <div className="text-center p-3 bg-orange-50 rounded-xl"><p className="text-2xl font-bold text-orange-600">{profile.achievements?.filter((a: string) => a).length || 0}</p><p className="text-xs text-gray-500">Achievements</p></div>
            </div>
            <div><h3 className="font-bold text-gray-900 mb-2">About</h3><p className="text-sm text-gray-600">{profile.about || 'No about text yet.'}</p></div>
            <div><h3 className="font-bold text-gray-900 mb-2">Achievements</h3><ul className="space-y-1">{profile.achievements?.filter((a: string) => a).map((a: string, i: number) => <li key={i} className="text-sm text-gray-600 flex items-start gap-2"><span className="text-green-500 mt-0.5">✓</span>{a}</li>)}</ul></div>
            <div className="grid grid-cols-2 gap-4"><div><h3 className="font-bold text-gray-900 mb-2">Contact</h3><p className="text-sm">📞 {profile.phone || 'N/A'}</p><p className="text-sm">💬 {profile.whatsapp_number || 'N/A'}</p><p className="text-sm">✉️ {profile.email || 'N/A'}</p></div><div><h3 className="font-bold text-gray-900 mb-2">Address</h3><p className="text-sm">{profile.address || 'N/A'}</p></div></div>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Institute Name *</label>
                <input className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={profile.institute_name} onChange={(e) => handleChange('institute_name', e.target.value)} placeholder="Bright Star Academy" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Tagline</label>
                <input className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={profile.tagline} onChange={(e) => handleChange('tagline', e.target.value)} placeholder="Aurangabad's Most Trusted NEET/JEE Coaching" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Institute Type</label>
                <select className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={profile.institute_type} onChange={(e) => handleChange('institute_type', e.target.value)}>
                  <option>NEET/JEE</option><option>10th-12th</option><option>Skill Courses</option><option>Private Tuition</option><option>Language Classes</option><option>Mixed</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Theme Color</label>
                <div className="flex gap-2">
                  <input type="color" className="w-12 h-10 border rounded-lg cursor-pointer" value={profile.theme_color} onChange={(e) => handleChange('theme_color', e.target.value)} />
                  <input className="flex-grow px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={profile.theme_color} onChange={(e) => handleChange('theme_color', e.target.value)} />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Images</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Logo URL</label>
                <input className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={profile.logo_url} onChange={(e) => handleChange('logo_url', e.target.value)} placeholder="https://storage.googleapis.com/.../logo.png" />
                {profile.logo_url && <img src={profile.logo_url} alt="Logo preview" className="mt-2 w-16 h-16 rounded-lg object-cover border" />}
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Banner Image URL</label>
                <input className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={profile.banner_image_url} onChange={(e) => handleChange('banner_image_url', e.target.value)} placeholder="https://storage.googleapis.com/.../banner.jpg" />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4">About & Achievements</h3>
            <div className="mb-4">
              <label className="block text-sm font-bold text-gray-700 mb-1">About the Institute</label>
              <textarea rows={4} className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={profile.about} onChange={(e) => handleChange('about', e.target.value)} placeholder="Tell parents why they should choose your institute..." />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">Achievements</label>
              {profile.achievements?.map((ach: string, index: number) => (
                <div key={index} className="flex gap-2 mb-2">
                  <input className="flex-grow px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" value={ach} onChange={(e) => updateAchievement(index, e.target.value)} placeholder="e.g. AIR 142 in NEET 2024" />
                  <button type="button" onClick={() => removeAchievement(index)} className="p-2 text-red-400 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
                </div>
              ))}
              <button type="button" onClick={addAchievement} className="flex items-center gap-1 text-blue-600 text-sm font-bold mt-1"><Plus className="w-4 h-4" /> Add Achievement</button>
            </div>
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Established Year</label>
                <input type="number" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={profile.established_year} onChange={(e) => handleChange('established_year', e.target.value)} />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Total Students Trained</label>
                <input type="number" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={profile.total_students_trained} onChange={(e) => handleChange('total_students_trained', e.target.value)} />
              </div>
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Contact Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Phone</label>
                <input className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={profile.phone} onChange={(e) => handleChange('phone', e.target.value)} placeholder="+91 240 234 0000" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">WhatsApp Number</label>
                <input className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={profile.whatsapp_number} onChange={(e) => handleChange('whatsapp_number', e.target.value)} placeholder="+91 93700 00000" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Email</label>
                <input type="email" className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={profile.email} onChange={(e) => handleChange('email', e.target.value)} placeholder="info@institute.in" />
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-bold text-gray-700 mb-1">Address</label>
              <input className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={profile.address} onChange={(e) => handleChange('address', e.target.value)} placeholder="2nd Floor, Shri Ganesh Complex, N-6 CIDCO" />
            </div>
            <div className="mt-4">
              <label className="block text-sm font-bold text-gray-700 mb-1">Google Maps Embed URL</label>
              <div className="relative">
                <Link2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input className="w-full pl-10 pr-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={profile.map_embed_url} onChange={(e) => handleChange('map_embed_url', e.target.value)} placeholder="https://maps.google.com/...embed..." />
              </div>
            </div>
            <div className="mt-4">
              <label className="block text-sm font-bold text-gray-700 mb-1">Office Hours</label>
              <input className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={profile.office_hours} onChange={(e) => handleChange('office_hours', e.target.value)} placeholder="Mon-Sat: 8 AM - 8 PM" />
            </div>
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-lg font-bold text-gray-900 mb-4">Social Media Links</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Facebook URL</label>
                <input className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={profile.facebook_url} onChange={(e) => handleChange('facebook_url', e.target.value)} placeholder="https://facebook.com/..." />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Instagram URL</label>
                <input className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={profile.instagram_url} onChange={(e) => handleChange('instagram_url', e.target.value)} placeholder="https://instagram.com/..." />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">YouTube URL</label>
                <input className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={profile.youtube_url} onChange={(e) => handleChange('youtube_url', e.target.value)} placeholder="https://youtube.com/@..." />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
