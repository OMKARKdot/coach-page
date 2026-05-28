'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth-context';
import { db } from '@/lib/firebase';
import { 
  collection, 
  getDocs, 
  addDoc, 
  updateDoc, 
  deleteDoc, 
  doc, 
  query, 
  orderBy,
  serverTimestamp 
} from 'firebase/firestore';
import { Plus, Pencil, Trash2, X, Star } from 'lucide-react';

const COLLECTION = process.env.NEXT_PUBLIC_COACHPAGE_COLLECTION || "coachpage_tenants";

export default function TestimonialsPage() {
  const { user } = useAuth();
  const isDemoAuth = typeof window !== 'undefined' && sessionStorage.getItem('demoAuth') === 'true';
  const [testimonials, setTestimonials] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<any>({
    student_name: '',
    standard: '',
    photo_url: '',
    text: '',
    rating: 5,
    published: true
  });

  const fetchTestimonials = async () => {
    const tenantId = user?.uid || "demo-tenant-id";
    const q = query(collection(db, COLLECTION, tenantId, "testimonials"), orderBy("created_at", "desc"));
    const querySnapshot = await getDocs(q);
    setTestimonials(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    setLoading(false);
  };

  useEffect(() => {
    fetchTestimonials();
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const tenantId = user?.uid || "demo-tenant-id";
    try {
      if (editingId) {
        await updateDoc(doc(db, COLLECTION, tenantId, "testimonials", editingId), {
          ...formData,
          updated_at: serverTimestamp()
        });
      } else {
        await addDoc(collection(db, COLLECTION, tenantId, "testimonials"), {
          ...formData,
          created_at: serverTimestamp()
        });
      }
      setShowForm(false);
      setEditingId(null);
      resetForm();
      fetchTestimonials();
    } catch (error) {
      console.error("Error saving testimonial:", error);
    }
  };

  const resetForm = () => {
    setFormData({
      student_name: '',
      standard: '',
      photo_url: '',
      text: '',
      rating: 5,
      published: true
    });
  };

  const handleEdit = (testimonial: any) => {
    setFormData(testimonial);
    setEditingId(testimonial.id);
    setShowForm(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this testimonial?")) return;
    const tenantId = user?.uid || "demo-tenant-id";
    try {
      await deleteDoc(doc(db, COLLECTION, tenantId, "testimonials", id));
      fetchTestimonials();
    } catch (error) {
      console.error("Error deleting testimonial:", error);
    }
  };

  const togglePublished = async (id: string, current: boolean) => {
    const tenantId = user?.uid || "demo-tenant-id";
    await updateDoc(doc(db, COLLECTION, tenantId, "testimonials", id), {
      published: !current
    });
    fetchTestimonials();
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
        <p className="text-sm text-yellow-700 font-medium">
          These are manually added by you. Do not add fake testimonials. 
          Only add genuine feedback from real students.
        </p>
      </div>

      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Testimonials Manager</h1>
        <button 
          onClick={() => { resetForm(); setEditingId(null); setShowForm(true); }}
          className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-700"
        >
          <Plus className="w-4 h-4" />
          Add Testimonial
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {testimonials.map((testimonial) => (
          <div key={testimonial.id} className={`bg-white p-6 rounded-2xl shadow-sm border ${testimonial.published ? 'border-gray-100' : 'border-gray-200 opacity-60'}`}>
            <div className="flex justify-between items-start mb-4">
              <div className="flex gap-3">
                <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center font-bold text-blue-600">
                  {testimonial.student_name?.charAt(0) || '?'}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">{testimonial.student_name}</h3>
                  <p className="text-xs text-gray-500">{testimonial.standard}</p>
                </div>
              </div>
              <div className="flex gap-1">
                <button 
                  onClick={() => togglePublished(testimonial.id, testimonial.published)}
                  className={`p-2 rounded-lg text-xs font-bold ${testimonial.published ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-500'}`}
                >
                  {testimonial.published ? 'Published' : 'Hidden'}
                </button>
                <button onClick={() => handleEdit(testimonial)} className="p-2 text-gray-400 hover:text-blue-600"><Pencil className="w-4 h-4" /></button>
                <button onClick={() => handleDelete(testimonial.id)} className="p-2 text-gray-400 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
              </div>
            </div>
            <div className="flex gap-1 mb-3">
              {[1, 2, 3, 4, 5].map(star => (
                <Star 
                  key={star} 
                  className={`w-4 h-4 ${star <= testimonial.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'}`} 
                />
              ))}
            </div>
            <p className="text-sm text-gray-600 italic leading-relaxed">&ldquo;{testimonial.text}&rdquo;</p>
          </div>
        ))}
      </div>

      {testimonials.length === 0 && (
        <div className="bg-white p-12 rounded-2xl shadow-sm border border-gray-100 text-center text-gray-400">
          No testimonials added yet. Click &quot;Add Testimonial&quot; to get started.
        </div>
      )}

      {showForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-8 relative">
            <button 
              onClick={() => setShowForm(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-6 h-6" />
            </button>
            <h2 className="text-xl font-bold mb-6">{editingId ? 'Edit Testimonial' : 'Add Testimonial'}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Student Name</label>
                  <input 
                    required
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    value={formData.student_name}
                    onChange={(e) => setFormData({...formData, student_name: e.target.value})}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Standard / Batch</label>
                  <input 
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                    value={formData.standard}
                    onChange={(e) => setFormData({...formData, standard: e.target.value})}
                    placeholder="e.g. NEET 2024 Qualifier"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Rating</label>
                <div className="flex gap-2">
                  {[1, 2, 3, 4, 5].map(star => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setFormData({...formData, rating: star})}
                      className="p-1"
                    >
                      <Star 
                        className={`w-6 h-6 ${star <= formData.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-200'}`} 
                      />
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Testimonial Text</label>
                <textarea 
                  rows={4}
                  required
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                  value={formData.text}
                  onChange={(e) => setFormData({...formData, text: e.target.value})}
                ></textarea>
              </div>
              <div className="flex items-center gap-2">
                <input 
                  type="checkbox"
                  id="published"
                  checked={formData.published}
                  onChange={(e) => setFormData({...formData, published: e.target.checked})}
                />
                <label htmlFor="published" className="text-sm font-bold text-gray-700">Published</label>
              </div>
              <div className="pt-4 flex justify-end gap-3">
                <button type="button" onClick={() => setShowForm(false)} className="px-6 py-2 border rounded-lg font-bold text-gray-600 hover:bg-gray-50">Cancel</button>
                <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700">Save Testimonial</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
