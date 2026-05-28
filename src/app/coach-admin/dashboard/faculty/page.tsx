'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth-context';
import { db } from '@/lib/firebase';
import { 
  collection, addDoc, updateDoc, deleteDoc, doc, query, orderBy, onSnapshot, serverTimestamp 
} from 'firebase/firestore';
import { Plus, Pencil, Trash2, X, ArrowUp, ArrowDown } from 'lucide-react';

const COLLECTION = process.env.NEXT_PUBLIC_COACHPAGE_COLLECTION || "coachpage_tenants";

export default function FacultyPage() {
  const { user } = useAuth();
  const tenantId = user?.uid || "demo-tenant-id";
  const [faculty, setFaculty] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<any>({
    name: '', photo_url: '', designation: '', qualification: [], experience_years: 0,
    subjects: [], courses_taught: [], bio: '', achievements: [], order: 0, active: true
  });
  const [qualInput, setQualInput] = useState('');
  const [subjectInput, setSubjectInput] = useState('');

  useEffect(() => {
    const q = query(collection(db, COLLECTION, tenantId, "faculty"), orderBy("order", "asc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setFaculty(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });
    return () => unsubscribe();
  }, [tenantId]);

  const handleChange = (field: string, value: any) => setFormData((prev: any) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = { ...formData, updated_at: serverTimestamp() };
      if (editingId) await updateDoc(doc(db, COLLECTION, tenantId, "faculty", editingId), data);
      else await addDoc(collection(db, COLLECTION, tenantId, "faculty"), { ...data, created_at: serverTimestamp() });
      setShowForm(false); setEditingId(null); resetForm();
    } catch (error) { console.error("Error saving faculty:", error); }
  };

  const resetForm = () => setFormData({ name: '', photo_url: '', designation: '', qualification: [], experience_years: 0, subjects: [], courses_taught: [], bio: '', achievements: [], order: 0, active: true });

  const handleEdit = (member: any) => { setFormData(member); setEditingId(member.id); setShowForm(true); };
  const handleDelete = async (id: string) => { if (confirm("Delete this faculty member?")) await deleteDoc(doc(db, COLLECTION, tenantId, "faculty", id)); };
  const toggleActive = async (id: string, current: boolean) => { await updateDoc(doc(db, COLLECTION, tenantId, "faculty", id), { active: !current }); };

  const moveMember = async (index: number, dir: 'up' | 'down') => {
    const arr = [...faculty]; const target = dir === 'up' ? index - 1 : index + 1;
    if (target < 0 || target >= arr.length) return;
    [arr[index], arr[target]] = [arr[target], arr[index]];
    await Promise.all(arr.map((m, i) => updateDoc(doc(db, COLLECTION, tenantId, "faculty", m.id), { order: i })));
  };

  if (loading) return <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-900"></div></div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Faculty Manager</h1>
        <button onClick={() => { resetForm(); setEditingId(null); setShowForm(true); }} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-700"><Plus className="w-4 h-4" /> Add Faculty</button>
      </div>

      <p className="text-sm text-gray-500">{faculty.filter(f => f.active).length} active • {faculty.length} total</p>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {faculty.map((member, index) => (
          <div key={member.id} className={`bg-white p-5 rounded-2xl shadow-sm border ${member.active ? 'border-gray-100' : 'border-gray-200 opacity-50'}`}>
            <div className="flex justify-between mb-3">
              <div className="flex gap-3">
                <div className="w-14 h-14 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                  {member.photo_url ? <img src={member.photo_url} alt={member.name} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-gray-400 text-xl font-bold">{member.name?.charAt(0)}</div>}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{member.name}</h3>
                  <p className="text-blue-600 text-xs font-medium">{member.designation}</p>
                </div>
              </div>
              <div className="flex flex-col gap-0.5">
                <button onClick={() => moveMember(index, 'up')} disabled={index === 0} className="p-0.5 text-gray-400 hover:text-blue-600 disabled:opacity-20"><ArrowUp className="w-3 h-3" /></button>
                <button onClick={() => moveMember(index, 'down')} disabled={index === faculty.length - 1} className="p-0.5 text-gray-400 hover:text-blue-600 disabled:opacity-20"><ArrowDown className="w-3 h-3" /></button>
              </div>
            </div>
            <div className="flex items-center gap-2 text-xs text-gray-500 mb-2">
              <span>{member.experience_years} yrs exp</span>
              <span>•</span>
              <span>{member.qualification?.[0]}</span>
            </div>
            <div className="flex flex-wrap gap-1 mb-3">
              {member.subjects?.map((s: string) => <span key={s} className="bg-gray-100 text-gray-600 text-[10px] px-2 py-0.5 rounded">{s}</span>)}
            </div>
            <div className="flex justify-between items-center">
              <button onClick={() => toggleActive(member.id, member.active)} className={`text-[10px] font-bold px-2 py-0.5 rounded ${member.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>{member.active ? 'Active' : 'Inactive'}</button>
              <div className="flex gap-1">
                <button onClick={() => handleEdit(member)} className="p-1.5 text-gray-400 hover:text-blue-600"><Pencil className="w-4 h-4" /></button>
                <button onClick={() => handleDelete(member.id)} className="p-1.5 text-gray-400 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {faculty.length === 0 && (
        <div className="bg-white p-12 rounded-2xl shadow-sm border border-gray-100 text-center text-gray-400">
          <p className="font-medium">No faculty added yet</p>
          <p className="text-sm mt-1">Showcase your teaching team to build trust</p>
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 relative">
            <button onClick={() => setShowForm(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"><X className="w-6 h-6" /></button>
            <h2 className="text-xl font-bold mb-4">{editingId ? 'Edit Faculty' : 'Add Faculty'}</h2>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2"><label className="block text-sm font-bold text-gray-700 mb-1">Name *</label><input required className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={formData.name} onChange={(e) => handleChange('name', e.target.value)} /></div>
                <div><label className="block text-sm font-bold text-gray-700 mb-1">Designation</label><input className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={formData.designation} onChange={(e) => handleChange('designation', e.target.value)} placeholder="Physics HOD" /></div>
                <div><label className="block text-sm font-bold text-gray-700 mb-1">Experience (Years)</label><input type="number" className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={formData.experience_years} onChange={(e) => handleChange('experience_years', parseInt(e.target.value) || 0)} /></div>
                <div className="col-span-2"><label className="block text-sm font-bold text-gray-700 mb-1">Photo URL</label><input className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={formData.photo_url} onChange={(e) => handleChange('photo_url', e.target.value)} /></div>
                <div className="col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-1">Qualifications</label>
                  <div className="flex gap-2"><input className="flex-grow px-3 py-2 border rounded-lg text-sm outline-none" value={qualInput} onChange={(e) => setQualInput(e.target.value)} placeholder="e.g. M.Sc. Physics" onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleChange('qualification', [...formData.qualification, qualInput]), setQualInput(''))} /><button type="button" onClick={() => { if (qualInput) { handleChange('qualification', [...formData.qualification, qualInput]); setQualInput(''); } }} className="px-3 bg-blue-100 text-blue-600 rounded-lg font-bold">+</button></div>
                  <div className="flex flex-wrap gap-1 mt-1">{formData.qualification?.map((q: string, i: number) => <span key={i} className="bg-blue-50 text-blue-700 text-xs px-2 py-0.5 rounded">{q}<button type="button" onClick={() => handleChange('qualification', formData.qualification.filter((_: string, j: number) => j !== i))} className="ml-1 text-blue-400">×</button></span>)}</div>
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-1">Subjects</label>
                  <div className="flex gap-2"><input className="flex-grow px-3 py-2 border rounded-lg text-sm outline-none" value={subjectInput} onChange={(e) => setSubjectInput(e.target.value)} placeholder="e.g. Physics" onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleChange('subjects', [...formData.subjects, subjectInput]), setSubjectInput(''))} /><button type="button" onClick={() => { if (subjectInput) { handleChange('subjects', [...formData.subjects, subjectInput]); setSubjectInput(''); } }} className="px-3 bg-green-100 text-green-600 rounded-lg font-bold">+</button></div>
                  <div className="flex flex-wrap gap-1 mt-1">{formData.subjects?.map((s: string, i: number) => <span key={i} className="bg-green-50 text-green-700 text-xs px-2 py-0.5 rounded">{s}<button type="button" onClick={() => handleChange('subjects', formData.subjects.filter((_: string, j: number) => j !== i))} className="ml-1 text-green-400">×</button></span>)}</div>
                </div>
                <div className="col-span-2"><label className="block text-sm font-bold text-gray-700 mb-1">Bio</label><textarea rows={2} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={formData.bio} onChange={(e) => handleChange('bio', e.target.value)}></textarea></div>
              </div>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2"><input type="checkbox" checked={formData.active} onChange={(e) => handleChange('active', e.target.checked)} /><span className="text-sm font-bold text-gray-700">Active</span></label>
              </div>
              <div className="pt-3 flex justify-end gap-3 border-t">
                <button type="button" onClick={() => setShowForm(false)} className="px-6 py-2 border rounded-lg font-bold text-gray-600 hover:bg-gray-50">Cancel</button>
                <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700">{editingId ? 'Update' : 'Save Faculty'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
