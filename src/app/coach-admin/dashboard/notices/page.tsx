'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth-context';
import { db } from '@/lib/firebase';
import { collection, addDoc, updateDoc, deleteDoc, doc, query, orderBy, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { Plus, Pencil, Trash2, X, Bell, Eye } from 'lucide-react';
import { formatDate } from '@/lib/utils';

const COLLECTION = process.env.NEXT_PUBLIC_COACHPAGE_COLLECTION || "coachpage_tenants";

export default function NoticesPage() {
  const { user } = useAuth();
  const tenantId = user?.uid || "demo-tenant-id";
  const [notices, setNotices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [previewNotice, setPreviewNotice] = useState<any>(null);
  const [formData, setFormData] = useState<any>({
    title: '', body: '', type: 'general', urgent: false, published: true, expires_at: ''
  });

  useEffect(() => {
    const q = query(collection(db, COLLECTION, tenantId, "notices"), orderBy("created_at", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setNotices(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });
    return () => unsubscribe();
  }, [tenantId]);

  const handleChange = (field: string, value: any) => setFormData((prev: any) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = { ...formData, updated_at: serverTimestamp() };
      if (editingId) await updateDoc(doc(db, COLLECTION, tenantId, "notices", editingId), data);
      else await addDoc(collection(db, COLLECTION, tenantId, "notices"), { ...data, created_at: serverTimestamp() });
      setShowForm(false); setEditingId(null); resetForm();
    } catch (error) { console.error("Error saving notice:", error); }
  };

  const resetForm = () => setFormData({ title: '', body: '', type: 'general', urgent: false, published: true, expires_at: '' });
  const handleEdit = (notice: any) => { setFormData(notice); setEditingId(notice.id); setShowForm(true); };
  const handleDelete = async (id: string) => { if (confirm("Delete this notice?")) await deleteDoc(doc(db, COLLECTION, tenantId, "notices", id)); };
  const togglePublished = async (id: string, current: boolean) => { await updateDoc(doc(db, COLLECTION, tenantId, "notices", id), { published: !current }); };

  const typeColors: Record<string, string> = {
    admission: 'bg-green-100 text-green-700', result: 'bg-blue-100 text-blue-700',
    holiday: 'bg-purple-100 text-purple-700', exam: 'bg-orange-100 text-orange-700', general: 'bg-gray-100 text-gray-700',
  };

  if (loading) return <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-900"></div></div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Notice Board</h1>
        <button onClick={() => { resetForm(); setEditingId(null); setShowForm(true); }} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-700"><Plus className="w-4 h-4" /> Add Notice</button>
      </div>

      <div className="space-y-3">
        {notices.map((notice) => (
          <div key={notice.id} className={`bg-white p-5 rounded-2xl shadow-sm border ${notice.urgent ? 'border-red-200 bg-red-50/5' : notice.published ? 'border-gray-100' : 'border-gray-200 opacity-50'}`}>
            <div className="flex justify-between items-start">
              <div className="flex gap-4 flex-grow">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${notice.urgent ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'}`}><Bell className="w-5 h-5" /></div>
                <div className="flex-grow">
                  <div className="flex items-center gap-2">
                    <h3 className="font-bold text-gray-900">{notice.title}</h3>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${typeColors[notice.type] || 'bg-gray-100 text-gray-700'}`}>{notice.type}</span>
                    {notice.urgent && <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-100 text-red-700 uppercase">Urgent</span>}
                  </div>
                  <p className="text-xs text-gray-400 mt-1">{formatDate(notice.created_at)}{notice.expires_at && ` • Expires: ${formatDate(notice.expires_at)}`}</p>
                  <p className="text-sm text-gray-600 mt-2 leading-relaxed">{notice.body}</p>
                </div>
              </div>
              <div className="flex gap-1 shrink-0 ml-4">
                <button onClick={() => setPreviewNotice(notice)} className="p-1.5 text-gray-400 hover:text-blue-600"><Eye className="w-4 h-4" /></button>
                <button onClick={() => handleEdit(notice)} className="p-1.5 text-gray-400 hover:text-blue-600"><Pencil className="w-4 h-4" /></button>
                <button onClick={() => togglePublished(notice.id, notice.published)} className={`p-1.5 rounded ${notice.published ? 'text-green-600' : 'text-gray-400'}`}>{notice.published ? <Eye className="w-4 h-4" /> : <Eye className="w-4 h-4" />}</button>
                <button onClick={() => handleDelete(notice.id)} className="p-1.5 text-gray-400 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {notices.length === 0 && (
        <div className="bg-white p-12 rounded-2xl shadow-sm border border-gray-100 text-center text-gray-400">
          <Bell className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p className="font-medium">No notices yet</p>
          <p className="text-sm mt-1">Post admissions, results, holidays and more</p>
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg p-6 relative">
            <button onClick={() => setShowForm(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"><X className="w-6 h-6" /></button>
            <h2 className="text-xl font-bold mb-4">{editingId ? 'Edit Notice' : 'Add Notice'}</h2>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div><label className="block text-sm font-bold text-gray-700 mb-1">Title *</label><input required className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={formData.title} onChange={(e) => handleChange('title', e.target.value)} /></div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Type</label>
                <div className="flex flex-wrap gap-2">
                  {Object.keys(typeColors).map(type => (
                    <button key={type} type="button" onClick={() => handleChange('type', type)} className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${formData.type === type ? typeColors[type] : 'bg-gray-100 text-gray-600'}`}>{type.charAt(0).toUpperCase() + type.slice(1)}</button>
                  ))}
                </div>
              </div>
              <div><label className="block text-sm font-bold text-gray-700 mb-1">Body / Message</label><textarea rows={4} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={formData.body} onChange={(e) => handleChange('body', e.target.value)}></textarea></div>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2"><input type="checkbox" checked={formData.urgent} onChange={(e) => handleChange('urgent', e.target.checked)} /><span className="text-sm font-bold text-gray-700">Urgent (Ticker)</span></label>
                <label className="flex items-center gap-2"><input type="checkbox" checked={formData.published} onChange={(e) => handleChange('published', e.target.checked)} /><span className="text-sm font-bold text-gray-700">Published</span></label>
              </div>
              <div><label className="block text-sm font-bold text-gray-700 mb-1">Expiry Date (Optional)</label><input type="date" className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={formData.expires_at || ''} onChange={(e) => handleChange('expires_at', e.target.value)} /></div>
              <div className="pt-3 flex justify-end gap-3 border-t">
                <button type="button" onClick={() => setShowForm(false)} className="px-6 py-2 border rounded-lg font-bold text-gray-600 hover:bg-gray-50">Cancel</button>
                <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700">{editingId ? 'Update' : 'Post Notice'}</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {previewNotice && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-md p-6 relative">
            <button onClick={() => setPreviewNotice(null)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"><X className="w-6 h-6" /></button>
            <h3 className="text-lg font-bold mb-2">Preview</h3>
            <div className={`p-4 rounded-xl border ${previewNotice.urgent ? 'border-red-200 bg-red-50' : 'border-gray-200'}`}>
              <div className="flex items-center gap-2 mb-2">
                <Bell className={`w-4 h-4 ${previewNotice.urgent ? 'text-red-600' : 'text-blue-600'}`} />
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${typeColors[previewNotice.type]}`}>{previewNotice.type}</span>
                {previewNotice.urgent && <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-red-100 text-red-700 uppercase">Urgent</span>}
              </div>
              <h4 className="font-bold">{previewNotice.title}</h4>
              <p className="text-sm text-gray-600 mt-2">{previewNotice.body}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
