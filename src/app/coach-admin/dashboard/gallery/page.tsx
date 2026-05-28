'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth-context';
import { db } from '@/lib/firebase';
import { collection, addDoc, updateDoc, deleteDoc, doc, query, orderBy, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { Plus, Pencil, Trash2, X, Upload } from 'lucide-react';

const COLLECTION = process.env.NEXT_PUBLIC_COACHPAGE_COLLECTION || "coachpage_tenants";

export default function GalleryPage() {
  const { user } = useAuth();
  const tenantId = user?.uid || "demo-tenant-id";
  const [images, setImages] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [formData, setFormData] = useState<any>({
    image_url: '', caption: '', category: 'classroom', order: 0
  });

  useEffect(() => {
    const q = query(collection(db, COLLECTION, tenantId, "gallery"), orderBy("order", "asc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setImages(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });
    return () => unsubscribe();
  }, [tenantId]);

  const handleChange = (field: string, value: any) => setFormData((prev: any) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) await updateDoc(doc(db, COLLECTION, tenantId, "gallery", editingId), { ...formData, updated_at: serverTimestamp() });
      else await addDoc(collection(db, COLLECTION, tenantId, "gallery"), { ...formData, uploaded_at: serverTimestamp() });
      setShowForm(false); setEditingId(null); resetForm();
    } catch (error) { console.error("Error saving image:", error); }
  };

  const resetForm = () => setFormData({ image_url: '', caption: '', category: 'classroom', order: 0 });
  const handleEdit = (image: any) => { setFormData(image); setEditingId(image.id); setShowForm(true); };
  const handleDelete = async (id: string) => { if (confirm("Delete this image?")) await deleteDoc(doc(db, COLLECTION, tenantId, "gallery", id)); };

  const filteredImages = filterCategory === 'all' ? images : images.filter(img => img.category === filterCategory);
  const categories = ['all', 'classroom', 'result_celebration', 'event', 'facility', 'team'];

  if (loading) return <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-900"></div></div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Gallery Manager</h1>
        <button onClick={() => { resetForm(); setEditingId(null); setShowForm(true); }} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-700"><Plus className="w-4 h-4" /> Add Image</button>
      </div>

      <div className="flex gap-2 flex-wrap">
        {categories.map(cat => (
          <button key={cat} onClick={() => setFilterCategory(cat)} className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${filterCategory === cat ? 'bg-blue-600 text-white' : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'}`}>
            {cat === 'all' ? `All (${images.length})` : `${cat.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())} (${images.filter(i => i.category === cat).length})`}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {filteredImages.map((image) => (
          <div key={image.id} className="group relative bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="aspect-square bg-gray-100">
              {image.image_url ? <img src={image.image_url} alt={image.caption} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-gray-300"><Upload className="w-8 h-8" /></div>}
            </div>
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
              <div className="flex gap-2">
                <button onClick={() => handleEdit(image)} className="p-2 bg-white rounded-lg text-blue-600"><Pencil className="w-4 h-4" /></button>
                <button onClick={() => handleDelete(image.id)} className="p-2 bg-white rounded-lg text-red-600"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
            <div className="p-3">
              <p className="text-sm font-medium text-gray-700 truncate">{image.caption || 'Untitled'}</p>
              <span className="text-[10px] text-gray-400 uppercase font-bold">{image.category.replace('_', ' ')}</span>
            </div>
          </div>
        ))}
      </div>

      {filteredImages.length === 0 && (
        <div className="bg-white p-12 rounded-2xl shadow-sm border border-gray-100 text-center text-gray-400">
          <Upload className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p className="font-medium">No images in this category</p>
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg p-6 relative">
            <button onClick={() => setShowForm(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"><X className="w-6 h-6" /></button>
            <h2 className="text-xl font-bold mb-4">{editingId ? 'Edit Image' : 'Add Image'}</h2>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div><label className="block text-sm font-bold text-gray-700 mb-1">Image URL *</label><input required className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={formData.image_url} onChange={(e) => handleChange('image_url', e.target.value)} placeholder="https://storage.googleapis.com/..." /></div>
              {formData.image_url && <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden"><img src={formData.image_url} alt="Preview" className="w-full h-full object-cover" onError={(e) => (e.currentTarget.style.display = 'none')} /></div>}
              <div><label className="block text-sm font-bold text-gray-700 mb-1">Caption</label><input className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={formData.caption} onChange={(e) => handleChange('caption', e.target.value)} /></div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Category</label>
                <select className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={formData.category} onChange={(e) => handleChange('category', e.target.value)}>
                  <option value="classroom">Classroom</option><option value="result_celebration">Result Celebration</option><option value="event">Event</option><option value="facility">Facility</option><option value="team">Team</option>
                </select>
              </div>
              <div className="pt-3 flex justify-end gap-3 border-t">
                <button type="button" onClick={() => setShowForm(false)} className="px-6 py-2 border rounded-lg font-bold text-gray-600 hover:bg-gray-50">Cancel</button>
                <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700">Save</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
