'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth-context';
import { db } from '@/lib/firebase';
import { collection, addDoc, updateDoc, deleteDoc, doc, query, orderBy, onSnapshot, serverTimestamp } from 'firebase/firestore';
import { Plus, Pencil, Trash2, X } from 'lucide-react';

const COLLECTION = process.env.NEXT_PUBLIC_COACHPAGE_COLLECTION || "coachpage_tenants";

export default function SubjectsPage() {
  const { user } = useAuth();
  const tenantId = user?.uid || "demo-tenant-id";
  const [subjects, setSubjects] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<any>({
    subject_name: '', description: '', courses: [], order: 0, active: true
  });

  useEffect(() => {
    const q = query(collection(db, COLLECTION, tenantId, "subjects"), orderBy("order", "asc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setSubjects(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });
    return () => unsubscribe();
  }, [tenantId]);

  const handleChange = (field: string, value: any) => setFormData((prev: any) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = { ...formData, updated_at: serverTimestamp() };
      if (editingId) await updateDoc(doc(db, COLLECTION, tenantId, "subjects", editingId), data);
      else await addDoc(collection(db, COLLECTION, tenantId, "subjects"), { ...data, created_at: serverTimestamp() });
      setShowForm(false); setEditingId(null); resetForm();
    } catch (error) { console.error("Error saving subject:", error); }
  };

  const resetForm = () => setFormData({ subject_name: '', description: '', courses: [], order: 0, active: true });
  const handleEdit = (subject: any) => { setFormData(subject); setEditingId(subject.id); setShowForm(true); };
  const handleDelete = async (id: string) => { if (confirm("Delete this subject?")) await deleteDoc(doc(db, COLLECTION, tenantId, "subjects", id)); };
  const toggleActive = async (id: string, current: boolean) => { await updateDoc(doc(db, COLLECTION, tenantId, "subjects", id), { active: !current }); };

  const toggleCourse = (course: string) => {
    setFormData((prev: any) => {
      const courses = prev.courses.includes(course) ? prev.courses.filter((c: string) => c !== course) : [...prev.courses, course];
      return { ...prev, courses };
    });
  };

  if (loading) return <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-900"></div></div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Subjects Manager</h1>
        <button onClick={() => { resetForm(); setEditingId(null); setShowForm(true); }} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-700"><Plus className="w-4 h-4" /> Add Subject</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {subjects.map((subject) => (
          <div key={subject.id} className={`bg-white p-5 rounded-2xl shadow-sm border ${subject.active ? 'border-gray-100' : 'border-gray-200 opacity-50'}`}>
            <div className="flex justify-between items-start mb-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-white font-bold text-xl">{subject.subject_name?.charAt(0)}</div>
              <div className="flex gap-1">
                <button onClick={() => handleEdit(subject)} className="p-1.5 text-gray-400 hover:text-blue-600"><Pencil className="w-4 h-4" /></button>
                <button onClick={() => handleDelete(subject.id)} className="p-1.5 text-gray-400 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
            <h3 className="font-bold text-gray-900">{subject.subject_name}</h3>
            <p className="text-xs text-gray-500 mt-1 line-clamp-2">{subject.description}</p>
            <div className="flex flex-wrap gap-1 mt-3">
              {subject.courses?.map((c: string) => <span key={c} className="bg-blue-50 text-blue-700 text-[10px] px-2 py-0.5 rounded font-medium">{c}</span>)}
            </div>
            <button onClick={() => toggleActive(subject.id, subject.active)} className={`mt-3 text-[10px] font-bold px-2 py-0.5 rounded ${subject.active ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}>{subject.active ? 'Active' : 'Inactive'}</button>
          </div>
        ))}
      </div>

      {subjects.length === 0 && (
        <div className="bg-white p-12 rounded-2xl shadow-sm border border-gray-100 text-center text-gray-400">
          <p className="font-medium">No subjects added yet</p>
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg p-6 relative">
            <button onClick={() => setShowForm(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"><X className="w-6 h-6" /></button>
            <h2 className="text-xl font-bold mb-4">{editingId ? 'Edit Subject' : 'Add Subject'}</h2>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div><label className="block text-sm font-bold text-gray-700 mb-1">Subject Name *</label><input required className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={formData.subject_name} onChange={(e) => handleChange('subject_name', e.target.value)} /></div>
              <div><label className="block text-sm font-bold text-gray-700 mb-1">Description</label><textarea rows={3} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={formData.description} onChange={(e) => handleChange('description', e.target.value)}></textarea></div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Courses</label>
                <div className="flex flex-wrap gap-2">
                  {['NEET', 'JEE Mains', 'MHT-CET', '10th Board', '12th Board', 'Foundation'].map(course => (
                    <button key={course} type="button" onClick={() => toggleCourse(course)} className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${formData.courses.includes(course) ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>{course}</button>
                  ))}
                </div>
              </div>
              <div className="flex items-center gap-2"><input type="checkbox" id="active" checked={formData.active} onChange={(e) => handleChange('active', e.target.checked)} /><label htmlFor="active" className="text-sm font-bold text-gray-700">Active</label></div>
              <div className="pt-3 flex justify-end gap-3 border-t">
                <button type="button" onClick={() => setShowForm(false)} className="px-6 py-2 border rounded-lg font-bold text-gray-600 hover:bg-gray-50">Cancel</button>
                <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700">{editingId ? 'Update' : 'Create'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
