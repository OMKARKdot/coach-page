'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth-context';
import { db } from '@/lib/firebase';
import { collection, addDoc, updateDoc, deleteDoc, doc, query, orderBy, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { Plus, Pencil, Trash2, X, Eye, EyeOff } from 'lucide-react';

const COLLECTION = process.env.NEXT_PUBLIC_COACHPAGE_COLLECTION || "coachpage_tenants";

export default function FeesPage() {
  const { user } = useAuth();
  const tenantId = user?.uid || "demo-tenant-id";
  const [fees, setFees] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<any>({
    course_name: '', fee_type: 'monthly', amount: 0, total_programme_fee: 0,
    includes: [], excludes: [], scholarship_available: false, scholarship_note: '',
    show_on_website: true, order: 0
  });
  const [includeInput, setIncludeInput] = useState('');
  const [excludeInput, setExcludeInput] = useState('');

  useEffect(() => {
    const q = query(collection(db, COLLECTION, tenantId, "fees"), orderBy("order", "asc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setFees(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });
    return () => unsubscribe();
  }, [tenantId]);

  const handleChange = (field: string, value: any) => setFormData((prev: any) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) await updateDoc(doc(db, COLLECTION, tenantId, "fees", editingId), { ...formData, updated_at: serverTimestamp() });
      else await addDoc(collection(db, COLLECTION, tenantId, "fees"), { ...formData, created_at: serverTimestamp() });
      setShowForm(false); setEditingId(null); resetForm();
    } catch (error) { console.error("Error saving fee:", error); }
  };

  const resetForm = () => setFormData({ course_name: '', fee_type: 'monthly', amount: 0, total_programme_fee: 0, includes: [], excludes: [], scholarship_available: false, scholarship_note: '', show_on_website: true, order: 0 });
  const handleEdit = (fee: any) => { setFormData(fee); setEditingId(fee.id); setShowForm(true); };
  const handleDelete = async (id: string) => { if (confirm("Delete this fee entry?")) await deleteDoc(doc(db, COLLECTION, tenantId, "fees", id)); };
  const toggleVisibility = async (id: string, current: boolean) => { await updateDoc(doc(db, COLLECTION, tenantId, "fees", id), { show_on_website: !current }); };

  if (loading) return <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-900"></div></div>;

  return (
    <div className="space-y-6">
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
        <p className="text-sm text-blue-700 font-medium">💡 Fees are sensitive. You can choose to show or hide each fee entry. Only enabled entries appear on the website.</p>
      </div>

      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Fee Structure</h1>
        <button onClick={() => { resetForm(); setEditingId(null); setShowForm(true); }} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-700"><Plus className="w-4 h-4" /> Add Fee</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {fees.map((fee) => (
          <div key={fee.id} className={`bg-white p-5 rounded-2xl shadow-sm border ${fee.show_on_website ? 'border-gray-100' : 'border-gray-200 opacity-60'}`}>
            <div className="flex justify-between items-start mb-3">
              <div>
                <h3 className="font-bold text-gray-900">{fee.course_name}</h3>
                <p className="text-xs text-gray-500 capitalize">{fee.fee_type} fee</p>
              </div>
              <div className="flex gap-1">
                <button onClick={() => toggleVisibility(fee.id, fee.show_on_website)} className={`p-1.5 rounded-lg ${fee.show_on_website ? 'text-green-600 bg-green-50' : 'text-gray-400'}`}>{fee.show_on_website ? <Eye className="w-4 h-4" /> : <EyeOff className="w-4 h-4" />}</button>
                <button onClick={() => handleEdit(fee)} className="p-1.5 text-gray-400 hover:text-blue-600"><Pencil className="w-4 h-4" /></button>
                <button onClick={() => handleDelete(fee.id)} className="p-1.5 text-gray-400 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
            <div className="flex items-baseline gap-2 mb-3">
              <span className="text-2xl font-bold text-blue-600">₹{fee.amount?.toLocaleString('en-IN')}</span>
              <span className="text-sm text-gray-500">/{fee.fee_type}</span>
              {fee.total_programme_fee > 0 && <span className="text-sm text-gray-400 ml-auto">Total: ₹{fee.total_programme_fee.toLocaleString('en-IN')}</span>}
            </div>
            {fee.includes?.length > 0 && (
              <div className="mb-2">
                <p className="text-[10px] font-bold text-green-600 mb-1">Includes:</p>
                <div className="flex flex-wrap gap-1">{fee.includes.map((item: string) => <span key={item} className="bg-green-50 text-green-700 text-[10px] px-2 py-0.5 rounded">{item}</span>)}</div>
              </div>
            )}
            {fee.scholarship_available && <p className="text-xs text-purple-600 font-medium">🎓 {fee.scholarship_note}</p>}
          </div>
        ))}
      </div>

      {fees.length === 0 && (
        <div className="bg-white p-12 rounded-2xl shadow-sm border border-gray-100 text-center text-gray-400">
          <p className="font-medium">No fee entries added yet</p>
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 relative">
            <button onClick={() => setShowForm(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"><X className="w-6 h-6" /></button>
            <h2 className="text-xl font-bold mb-4">{editingId ? 'Edit Fee' : 'Add Fee Entry'}</h2>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2"><label className="block text-sm font-bold text-gray-700 mb-1">Course Name *</label><input required className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={formData.course_name} onChange={(e) => handleChange('course_name', e.target.value)} /></div>
                <div><label className="block text-sm font-bold text-gray-700 mb-1">Fee Type</label><select className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={formData.fee_type} onChange={(e) => handleChange('fee_type', e.target.value)}><option value="monthly">Monthly</option><option value="yearly">Yearly</option><option value="one-time">One-Time</option></select></div>
                <div><label className="block text-sm font-bold text-gray-700 mb-1">Amount (₹)</label><input type="number" className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={formData.amount} onChange={(e) => handleChange('amount', parseInt(e.target.value) || 0)} /></div>
                <div className="col-span-2"><label className="block text-sm font-bold text-gray-700 mb-1">Total Programme Fee (₹)</label><input type="number" className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={formData.total_programme_fee} onChange={(e) => handleChange('total_programme_fee', parseInt(e.target.value) || 0)} /></div>
                <div className="col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-1">Includes</label>
                  <div className="flex gap-2"><input className="flex-grow px-3 py-2 border rounded-lg text-sm outline-none" value={includeInput} onChange={(e) => setIncludeInput(e.target.value)} placeholder="e.g. Study material" onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleChange('includes', [...formData.includes, includeInput]), setIncludeInput(''))} /><button type="button" onClick={() => { if (includeInput) { handleChange('includes', [...formData.includes, includeInput]); setIncludeInput(''); } }} className="px-3 bg-green-100 text-green-600 rounded-lg font-bold">+</button></div>
                  <div className="flex flex-wrap gap-1 mt-1">{formData.includes?.map((item: string, i: number) => <span key={i} className="bg-green-50 text-green-700 text-xs px-2 py-0.5 rounded">{item}<button type="button" onClick={() => handleChange('includes', formData.includes.filter((_: string, j: number) => j !== i))} className="ml-1 text-green-400">×</button></span>)}</div>
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-1">Excludes</label>
                  <div className="flex gap-2"><input className="flex-grow px-3 py-2 border rounded-lg text-sm outline-none" value={excludeInput} onChange={(e) => setExcludeInput(e.target.value)} placeholder="e.g. Registration fee" onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleChange('excludes', [...formData.excludes, excludeInput]), setExcludeInput(''))} /><button type="button" onClick={() => { if (excludeInput) { handleChange('excludes', [...formData.excludes, excludeInput]); setExcludeInput(''); } }} className="px-3 bg-red-100 text-red-600 rounded-lg font-bold">+</button></div>
                  <div className="flex flex-wrap gap-1 mt-1">{formData.excludes?.map((item: string, i: number) => <span key={i} className="bg-red-50 text-red-700 text-xs px-2 py-0.5 rounded">{item}<button type="button" onClick={() => handleChange('excludes', formData.excludes.filter((_: string, j: number) => j !== i))} className="ml-1 text-red-400">×</button></span>)}</div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2"><input type="checkbox" checked={formData.scholarship_available} onChange={(e) => handleChange('scholarship_available', e.target.checked)} /><span className="text-sm font-bold text-gray-700">Scholarship Available</span></label>
                <label className="flex items-center gap-2"><input type="checkbox" checked={formData.show_on_website} onChange={(e) => handleChange('show_on_website', e.target.checked)} /><span className="text-sm font-bold text-gray-700">Show on Website</span></label>
              </div>
              {formData.scholarship_available && <div><label className="block text-sm font-bold text-gray-700 mb-1">Scholarship Note</label><input className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={formData.scholarship_note} onChange={(e) => handleChange('scholarship_note', e.target.value)} /></div>}
              <div className="pt-3 flex justify-end gap-3 border-t">
                <button type="button" onClick={() => setShowForm(false)} className="px-6 py-2 border rounded-lg font-bold text-gray-600 hover:bg-gray-50">Cancel</button>
                <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700">Save Fee</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
