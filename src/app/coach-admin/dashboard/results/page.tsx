'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth-context';
import { db } from '@/lib/firebase';
import { 
  collection, addDoc, updateDoc, deleteDoc, doc, query, orderBy, onSnapshot, serverTimestamp 
} from 'firebase/firestore';
import { Plus, Pencil, Trash2, X, Star, Filter } from 'lucide-react';

const COLLECTION = process.env.NEXT_PUBLIC_COACHPAGE_COLLECTION || "coachpage_tenants";

export default function ResultsPage() {
  const { user } = useAuth();
  const tenantId = user?.uid || "demo-tenant-id";
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [yearFilter, setYearFilter] = useState('all');
  const [formData, setFormData] = useState<any>({
    student_name: '',
    photo_url: '',
    exam: 'NEET 2025',
    score: '',
    rank: '',
    college_admitted: '',
    batch_year: '2023-2025',
    testimonial: '',
    year: 2025,
    highlight: true,
    order: 0
  });

  useEffect(() => {
    const q = query(collection(db, COLLECTION, tenantId, "results"), orderBy("year", "desc"), orderBy("order", "asc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setResults(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });
    return () => unsubscribe();
  }, [tenantId]);

  const handleChange = (field: string, value: any) => setFormData((prev: any) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = { ...formData, updated_at: serverTimestamp() };
      if (editingId) {
        await updateDoc(doc(db, COLLECTION, tenantId, "results", editingId), data);
      } else {
        await addDoc(collection(db, COLLECTION, tenantId, "results"), { ...data, created_at: serverTimestamp() });
      }
      setShowForm(false);
      setEditingId(null);
      resetForm();
    } catch (error) {
      console.error("Error saving result:", error);
    }
  };

  const resetForm = () => setFormData({ student_name: '', photo_url: '', exam: 'NEET 2025', score: '', rank: '', college_admitted: '', batch_year: '2023-2025', testimonial: '', year: 2025, highlight: true, order: 0 });

  const handleEdit = (result: any) => { setFormData(result); setEditingId(result.id); setShowForm(true); };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this result?")) return;
    await deleteDoc(doc(db, COLLECTION, tenantId, "results", id));
  };

  const toggleHighlight = async (id: string, current: boolean) => {
    await updateDoc(doc(db, COLLECTION, tenantId, "results", id), { highlight: !current });
  };

  const filteredResults = yearFilter === 'all' ? results : results.filter(r => r.year.toString() === yearFilter);
  const years = Array.from(new Set(results.map(r => r.year))).sort((a, b) => b - a);

  const stats = {
    total: results.length,
    highlighted: results.filter(r => r.highlight).length,
    bestRank: results.filter(r => r.rank).length > 0 ? results.filter(r => r.rank).sort((a, b) => {
      const rankA = parseInt(a.rank.replace(/\D/g, '')) || 99999;
      const rankB = parseInt(b.rank.replace(/\D/g, '')) || 99999;
      return rankA - rankB;
    })[0]?.rank : 'N/A',
  };

  if (loading) return <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-900"></div></div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Results Manager</h1>
        <button onClick={() => { resetForm(); setEditingId(null); setShowForm(true); }} className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-700">
          <Plus className="w-4 h-4" /> Add Topper Result
        </button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-white p-4 rounded-xl border border-gray-100 text-center">
          <p className="text-2xl font-bold">{stats.total}</p><p className="text-xs text-gray-500">Total Results</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-100 text-center">
          <p className="text-2xl font-bold text-yellow-600">{stats.highlighted}</p><p className="text-xs text-gray-500">Featured Toppers</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-100 text-center">
          <p className="text-2xl font-bold text-green-600">{stats.bestRank}</p><p className="text-xs text-gray-500">Best Rank</p>
        </div>
      </div>

      <div className="flex gap-2 items-center">
        <Filter className="w-4 h-4 text-gray-400" />
        <button onClick={() => setYearFilter('all')} className={`px-3 py-1 rounded-full text-xs font-bold ${yearFilter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'}`}>All Years</button>
        {years.map(year => (
          <button key={year} onClick={() => setYearFilter(year.toString())} className={`px-3 py-1 rounded-full text-xs font-bold ${yearFilter === year.toString() ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-600'}`}>{year}</button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredResults.map((result) => (
          <div key={result.id} className={`bg-white p-4 rounded-2xl shadow-sm border ${result.highlight ? 'border-yellow-200 bg-yellow-50/10' : 'border-gray-100'}`}>
            <div className="flex gap-4">
              <div className="w-16 h-16 rounded-full overflow-hidden shrink-0 border-2 border-gray-100 bg-gray-100">
                {result.photo_url ? <img src={result.photo_url} alt={result.student_name} className="w-full h-full object-cover" /> : <div className="w-full h-full flex items-center justify-center text-gray-400 text-xl font-bold">{result.student_name?.charAt(0)}</div>}
              </div>
              <div className="flex-grow">
                <div className="flex justify-between items-start">
                  <h3 className="font-bold text-gray-900">{result.student_name}</h3>
                  <div className="flex gap-1">
                    <button onClick={() => toggleHighlight(result.id, result.highlight)} className={`p-1 rounded ${result.highlight ? 'text-yellow-500' : 'text-gray-300'}`}><Star className={`w-4 h-4 ${result.highlight ? 'fill-current' : ''}`} /></button>
                    <button onClick={() => handleEdit(result)} className="p-1 text-gray-400 hover:text-blue-600"><Pencil className="w-3 h-3" /></button>
                    <button onClick={() => handleDelete(result.id)} className="p-1 text-gray-400 hover:text-red-600"><Trash2 className="w-3 h-3" /></button>
                  </div>
                </div>
                <p className="text-blue-600 font-bold text-sm">{result.score}</p>
                <p className="text-xs text-gray-500">{result.exam} • {result.rank}</p>
                <p className="text-[10px] text-gray-400 mt-1">{result.college_admitted}</p>
                {result.testimonial && <p className="text-[10px] text-gray-400 mt-2 italic line-clamp-2">&ldquo;{result.testimonial}&rdquo;</p>}
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredResults.length === 0 && (
        <div className="bg-white p-12 rounded-2xl shadow-sm border border-gray-100 text-center text-gray-400">
          <Star className="w-12 h-12 mx-auto mb-3 text-gray-300" />
          <p className="font-medium">No results found</p>
          <p className="text-sm mt-1">Add your toppers to build trust with parents</p>
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 relative">
            <button onClick={() => setShowForm(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"><X className="w-6 h-6" /></button>
            <h2 className="text-xl font-bold mb-4">{editingId ? 'Edit Result' : 'Add Topper Result'}</h2>
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div className="col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-1">Student Name *</label>
                  <input required className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={formData.student_name} onChange={(e) => handleChange('student_name', e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Exam</label>
                  <select className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={formData.exam} onChange={(e) => handleChange('exam', e.target.value)}>
                    <option>NEET 2025</option><option>NEET 2024</option><option>JEE Mains 2025</option><option>JEE Advanced 2025</option><option>MHT-CET 2025</option><option>10th Board 2025</option><option>12th Board 2025</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Year</label>
                  <input type="number" className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={formData.year} onChange={(e) => handleChange('year', parseInt(e.target.value))} />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Score</label>
                  <input className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={formData.score} onChange={(e) => handleChange('score', e.target.value)} placeholder="685/720" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Rank</label>
                  <input className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={formData.rank} onChange={(e) => handleChange('rank', e.target.value)} placeholder="AIR 312" />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-1">College Admitted To</label>
                  <input className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={formData.college_admitted} onChange={(e) => handleChange('college_admitted', e.target.value)} />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-1">Student Testimonial</label>
                  <textarea rows={2} className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={formData.testimonial} onChange={(e) => handleChange('testimonial', e.target.value)}></textarea>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="highlight" checked={formData.highlight} onChange={(e) => handleChange('highlight', e.target.checked)} />
                <label htmlFor="highlight" className="text-sm font-bold text-gray-700 flex items-center gap-1"><Star className="w-4 h-4 text-yellow-500" /> Featured Topper</label>
              </div>
              <div className="pt-3 flex justify-end gap-3 border-t">
                <button type="button" onClick={() => setShowForm(false)} className="px-6 py-2 border rounded-lg font-bold text-gray-600 hover:bg-gray-50">Cancel</button>
                <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700">{editingId ? 'Update' : 'Save Result'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
