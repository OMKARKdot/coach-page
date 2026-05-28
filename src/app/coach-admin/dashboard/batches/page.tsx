'use client';

import { useState, useEffect, useCallback } from 'react';
import { useAuth } from '@/lib/auth-context';
import { db } from '@/lib/firebase';
import { 
  collection, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  orderBy,
  onSnapshot,
  serverTimestamp 
} from 'firebase/firestore';
import { Plus, Pencil, Trash2, X, Eye, EyeOff, ArrowUp, ArrowDown } from 'lucide-react';

const COLLECTION = process.env.NEXT_PUBLIC_COACHPAGE_COLLECTION || "coachpage_tenants";

export default function BatchesPage() {
  const { user } = useAuth();
  const tenantId = user?.uid || "demo-tenant-id";
  const [batches, setBatches] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState('all');
  const [formData, setFormData] = useState<any>({
    batch_name: '',
    course_type: 'NEET',
    standard: '11th + 12th Combined',
    subjects: [],
    start_date: '',
    duration: '1 Year',
    timing: '',
    days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
    total_seats: 40,
    seats_filled: 0,
    fee_per_month: 0,
    total_fee: 0,
    fee_includes: [],
    medium: 'English',
    status: 'admissions_open',
    highlight: false,
    order: 0
  });
  const [subjectInput, setSubjectInput] = useState('');
  const [feeIncludeInput, setFeeIncludeInput] = useState('');

  useEffect(() => {
    const q = query(collection(db, COLLECTION, tenantId, "batches"), orderBy("order", "asc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setBatches(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });
    return () => unsubscribe();
  }, [tenantId]);

  const handleChange = (field: string, value: any) => {
    setFormData((prev: any) => ({ ...prev, [field]: value }));
  };

  const addSubject = () => {
    if (subjectInput.trim()) {
      handleChange('subjects', [...(formData.subjects || []), subjectInput.trim()]);
      setSubjectInput('');
    }
  };

  const removeSubject = (index: number) => {
    handleChange('subjects', formData.subjects.filter((_: string, i: number) => i !== index));
  };

  const addFeeInclude = () => {
    if (feeIncludeInput.trim()) {
      handleChange('fee_includes', [...(formData.fee_includes || []), feeIncludeInput.trim()]);
      setFeeIncludeInput('');
    }
  };

  const removeFeeInclude = (index: number) => {
    handleChange('fee_includes', formData.fee_includes.filter((_: string, i: number) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = {
        ...formData,
        seats_available: formData.total_seats - formData.seats_filled,
        updated_at: serverTimestamp(),
      };
      if (editingId) {
        await updateDoc(doc(db, COLLECTION, tenantId, "batches", editingId), data);
      } else {
        await addDoc(collection(db, COLLECTION, tenantId, "batches"), {
          ...data,
          created_at: serverTimestamp(),
        });
      }
      setShowForm(false);
      setEditingId(null);
      resetForm();
    } catch (error) {
      console.error("Error saving batch:", error);
      alert("Error saving batch. Please try again.");
    }
  };

  const resetForm = () => {
    setFormData({
      batch_name: '',
      course_type: 'NEET',
      standard: '11th + 12th Combined',
      subjects: [],
      start_date: '',
      duration: '1 Year',
      timing: '',
      days: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
      total_seats: 40,
      seats_filled: 0,
      fee_per_month: 0,
      total_fee: 0,
      fee_includes: [],
      medium: 'English',
      status: 'admissions_open',
      highlight: false,
      order: 0
    });
    setSubjectInput('');
    setFeeIncludeInput('');
  };

  const handleEdit = (batch: any) => {
    setFormData(batch);
    setEditingId(batch.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this batch?")) return;
    try {
      await deleteDoc(doc(db, COLLECTION, tenantId, "batches", id));
    } catch (error) {
      console.error("Error deleting batch:", error);
    }
  };

  const toggleStatus = async (batch: any) => {
    const newStatus = batch.status === 'admissions_open' ? 'admissions_closed' : 'admissions_open';
    try {
      await updateDoc(doc(db, COLLECTION, tenantId, "batches", batch.id), { status: newStatus });
    } catch (error) {
      console.error("Error updating status:", error);
    }
  };

  const moveBatch = async (index: number, direction: 'up' | 'down') => {
    const newBatches = [...batches];
    const targetIndex = direction === 'up' ? index - 1 : index + 1;
    if (targetIndex < 0 || targetIndex >= newBatches.length) return;
    [newBatches[index], newBatches[targetIndex]] = [newBatches[targetIndex], newBatches[index]];
    try {
      await Promise.all(newBatches.map((batch, i) =>
        updateDoc(doc(db, COLLECTION, tenantId, "batches", batch.id), { order: i })
      ));
    } catch (error) {
      console.error("Error reordering:", error);
    }
  };

  const filteredBatches = filterStatus === 'all' ? batches : batches.filter(b => b.status === filterStatus);

  const statusColors: Record<string, string> = {
    admissions_open: 'bg-green-100 text-green-700',
    admissions_closed: 'bg-red-100 text-red-700',
    ongoing: 'bg-blue-100 text-blue-700',
    completed: 'bg-gray-100 text-gray-700',
    upcoming: 'bg-yellow-100 text-yellow-700',
  };

  if (loading) return <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-900"></div></div>;

  const stats = {
    total: batches.length,
    open: batches.filter(b => b.status === 'admissions_open').length,
    seatsFilled: batches.reduce((sum, b) => sum + (b.seats_filled || 0), 0),
    seatsTotal: batches.reduce((sum, b) => sum + (b.total_seats || 0), 0),
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Batch Manager</h1>
        <button 
          onClick={() => { resetForm(); setEditingId(null); setShowForm(true); }}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-700"
        >
          <Plus className="w-4 h-4" />
          Add New Batch
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-xl border border-gray-100">
          <p className="text-sm text-gray-500">Total Batches</p>
          <p className="text-2xl font-bold">{stats.total}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-100">
          <p className="text-sm text-gray-500">Admissions Open</p>
          <p className="text-2xl font-bold text-green-600">{stats.open}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-100">
          <p className="text-sm text-gray-500">Seats Filled</p>
          <p className="text-2xl font-bold">{stats.seatsFilled}/{stats.seatsTotal}</p>
        </div>
        <div className="bg-white p-4 rounded-xl border border-gray-100">
          <p className="text-sm text-gray-500">Occupancy Rate</p>
          <p className="text-2xl font-bold">{stats.seatsTotal > 0 ? Math.round((stats.seatsFilled / stats.seatsTotal) * 100) : 0}%</p>
        </div>
      </div>

      <div className="flex gap-2 flex-wrap">
        {['all', 'admissions_open', 'admissions_closed', 'ongoing', 'upcoming'].map(status => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`px-4 py-2 rounded-lg text-sm font-bold transition-colors ${
              filterStatus === status 
                ? 'bg-blue-600 text-white' 
                : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            {status === 'all' ? 'All' : status.replace('_', ' ').replace(/\b\w/g, (l: string) => l.toUpperCase())}
            {status === 'all' ? ` (${batches.length})` : ` (${batches.filter(b => b.status === status).length})`}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase w-8"></th>
              <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase">Batch</th>
              <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase">Course</th>
              <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase">Timing</th>
              <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase">Seats</th>
              <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase">Fee</th>
              <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase">Status</th>
              <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y">
            {filteredBatches.map((batch, index) => {
              const percentage = batch.total_seats > 0 ? (batch.seats_filled / batch.total_seats) * 100 : 0;
              return (
                <tr key={batch.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3">
                    <div className="flex flex-col gap-0.5">
                      <button onClick={() => moveBatch(index, 'up')} disabled={index === 0} className="p-0.5 text-gray-400 hover:text-blue-600 disabled:opacity-20"><ArrowUp className="w-3 h-3" /></button>
                      <button onClick={() => moveBatch(index, 'down')} disabled={index === filteredBatches.length - 1} className="p-0.5 text-gray-400 hover:text-blue-600 disabled:opacity-20"><ArrowDown className="w-3 h-3" /></button>
                    </div>
                  </td>
                  <td className="px-6 py-3">
                    <div className="flex items-center gap-2">
                      {batch.highlight && <span className="text-yellow-500">★</span>}
                      <div>
                        <p className="font-bold text-gray-900 text-sm">{batch.batch_name}</p>
                        <p className="text-xs text-gray-500">{batch.standard}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-xs bg-blue-50 text-blue-700 px-2 py-1 rounded font-medium">{batch.course_type}</span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {batch.subjects?.slice(0, 2).map((s: string) => (
                        <span key={s} className="text-[10px] bg-gray-100 text-gray-600 px-1.5 py-0.5 rounded">{s}</span>
                      ))}
                      {batch.subjects?.length > 2 && <span className="text-[10px] text-gray-400">+{batch.subjects.length - 2}</span>}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs text-gray-600">
                    {batch.timing || 'Not set'}
                    {batch.duration && <p className="text-[10px] text-gray-400">{batch.duration}</p>}
                  </td>
                  <td className="px-4 py-3">
                    <div className="w-full">
                      <div className="flex justify-between text-xs mb-1">
                        <span className="font-bold">{batch.seats_filled}/{batch.total_seats}</span>
                        <span className="text-gray-400">{batch.seats_available ?? (batch.total_seats - batch.seats_filled)} left</span>
                      </div>
                      <div className="w-full bg-gray-100 h-1.5 rounded-full">
                        <div 
                          className={`h-1.5 rounded-full ${percentage > 80 ? 'bg-red-500' : percentage > 50 ? 'bg-yellow-500' : 'bg-green-500'}`} 
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-xs">
                    {batch.total_fee ? (
                      <div>
                        <p className="font-bold">₹{batch.total_fee.toLocaleString()}</p>
                        {batch.fee_per_month && <p className="text-gray-400">₹{batch.fee_per_month}/mo</p>}
                      </div>
                    ) : <span className="text-gray-400">Not set</span>}
                  </td>
                  <td className="px-4 py-3">
                    <button 
                      onClick={() => toggleStatus(batch)}
                      className={`text-[10px] font-bold px-2 py-1 rounded uppercase cursor-pointer transition-colors ${statusColors[batch.status] || 'bg-gray-100 text-gray-700'}`}
                    >
                      {batch.status?.replace('_', ' ')}
                    </button>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-1">
                      <button onClick={() => handleEdit(batch)} className="p-1.5 text-gray-400 hover:text-blue-600 transition-colors rounded hover:bg-blue-50">
                        <Pencil className="w-4 h-4" />
                      </button>
                      <button onClick={() => handleDelete(batch.id)} className="p-1.5 text-gray-400 hover:text-red-600 transition-colors rounded hover:bg-red-50">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
        {filteredBatches.length === 0 && (
          <div className="py-16 text-center text-gray-400">
            <p className="font-medium">No batches found</p>
            <p className="text-sm mt-1">Click &quot;Add New Batch&quot; to create one</p>
          </div>
        )}
      </div>

      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 relative">
            <button onClick={() => setShowForm(false)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
              <X className="w-6 h-6" />
            </button>
            <h2 className="text-xl font-bold mb-6">{editingId ? 'Edit Batch' : 'Add New Batch'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-1">Batch Name *</label>
                  <input required className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={formData.batch_name} onChange={(e) => handleChange('batch_name', e.target.value)} placeholder="e.g. NEET 2026 Morning Batch" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Course Type</label>
                  <select className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={formData.course_type} onChange={(e) => handleChange('course_type', e.target.value)}>
                    <option>NEET</option><option>JEE</option><option>MHT-CET</option><option>10th Board</option><option>12th Board</option><option>Foundation</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Standard</label>
                  <input className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={formData.standard} onChange={(e) => handleChange('standard', e.target.value)} placeholder="e.g. 11th + 12th Combined" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Start Date</label>
                  <input type="date" className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={formData.start_date} onChange={(e) => handleChange('start_date', e.target.value)} />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Duration</label>
                  <input className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={formData.duration} onChange={(e) => handleChange('duration', e.target.value)} placeholder="e.g. 1 Year" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Timing</label>
                  <input className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={formData.timing} onChange={(e) => handleChange('timing', e.target.value)} placeholder="e.g. 6:30 AM - 9:00 AM" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Medium</label>
                  <select className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={formData.medium} onChange={(e) => handleChange('medium', e.target.value)}>
                    <option>English</option><option>Marathi</option><option>Marathi + English</option><option>Hindi</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Total Seats</label>
                  <input type="number" className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={formData.total_seats} onChange={(e) => handleChange('total_seats', parseInt(e.target.value) || 0)} />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Seats Filled</label>
                  <input type="number" className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={formData.seats_filled} onChange={(e) => handleChange('seats_filled', parseInt(e.target.value) || 0)} />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Fee per Month (₹)</label>
                  <input type="number" className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={formData.fee_per_month} onChange={(e) => handleChange('fee_per_month', parseInt(e.target.value) || 0)} />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Total Fee (₹)</label>
                  <input type="number" className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={formData.total_fee} onChange={(e) => handleChange('total_fee', parseInt(e.target.value) || 0)} />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-1">Status</label>
                  <select className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none" value={formData.status} onChange={(e) => handleChange('status', e.target.value)}>
                    <option value="admissions_open">Admissions Open</option>
                    <option value="admissions_closed">Admissions Closed</option>
                    <option value="ongoing">Ongoing</option>
                    <option value="completed">Completed</option>
                    <option value="upcoming">Upcoming</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-1">Subjects</label>
                  <div className="flex gap-2">
                    <input className="flex-grow px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm" value={subjectInput} onChange={(e) => setSubjectInput(e.target.value)} placeholder="Add subject and press + " onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addSubject())} />
                    <button type="button" onClick={addSubject} className="px-3 py-2 bg-blue-100 text-blue-600 rounded-lg font-bold hover:bg-blue-200">+</button>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {formData.subjects?.map((s: string, i: number) => (
                      <span key={i} className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded flex items-center gap-1">{s}<button type="button" onClick={() => removeSubject(i)} className="text-blue-400 hover:text-red-500">×</button></span>
                    ))}
                  </div>
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-1">Fee Includes</label>
                  <div className="flex gap-2">
                    <input className="flex-grow px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none text-sm" value={feeIncludeInput} onChange={(e) => setFeeIncludeInput(e.target.value)} placeholder="e.g. Study material" onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addFeeInclude())} />
                    <button type="button" onClick={addFeeInclude} className="px-3 py-2 bg-green-100 text-green-600 rounded-lg font-bold hover:bg-green-200">+</button>
                  </div>
                  <div className="flex flex-wrap gap-1 mt-2">
                    {formData.fee_includes?.map((item: string, i: number) => (
                      <span key={i} className="bg-green-50 text-green-700 text-xs px-2 py-1 rounded flex items-center gap-1">{item}<button type="button" onClick={() => removeFeeInclude(i)} className="text-green-400 hover:text-red-500">×</button></span>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2"><input type="checkbox" checked={formData.highlight} onChange={(e) => handleChange('highlight', e.target.checked)} /><span className="text-sm font-bold text-gray-700">★ Highlight as Featured</span></label>
              </div>
              <div className="pt-4 flex justify-end gap-3 border-t">
                <button type="button" onClick={() => setShowForm(false)} className="px-6 py-2 border rounded-lg font-bold text-gray-600 hover:bg-gray-50">Cancel</button>
                <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700">{editingId ? 'Update Batch' : 'Create Batch'}</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
