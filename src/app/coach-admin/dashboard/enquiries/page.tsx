'use client';

import { useState, useEffect, useMemo } from 'react';
import { useAuth } from '@/lib/auth-context';
import { db } from '@/lib/firebase';
import { 
  collection, 
  updateDoc, 
  doc, 
  query, 
  orderBy,
  onSnapshot,
  serverTimestamp
} from 'firebase/firestore';
import { Phone, MessageSquare, Download, Search, Calendar, X } from 'lucide-react';
import { formatDate } from '@/lib/utils';

const COLLECTION = process.env.NEXT_PUBLIC_COACHPAGE_COLLECTION || "coachpage_tenants";

export default function EnquiriesPage() {
  const { user } = useAuth();
  const tenantId = user?.uid || "demo-tenant-id";
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEnquiry, setSelectedEnquiry] = useState<any>(null);
  const [notes, setNotes] = useState('');
  const [followUpDate, setFollowUpDate] = useState('');

  useEffect(() => {
    const q = query(collection(db, COLLECTION, tenantId, "enquiries"), orderBy("created_at", "desc"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      setEnquiries(querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
      setLoading(false);
    });
    return () => unsubscribe();
  }, [tenantId]);

  const updateStatus = async (id: string, newStatus: string) => {
    try {
      await updateDoc(doc(db, COLLECTION, tenantId, "enquiries", id), {
        status: newStatus,
        updated_at: serverTimestamp()
      });
    } catch (error) {
      console.error("Error updating enquiry status:", error);
    }
  };

  const saveNotes = async () => {
    if (!selectedEnquiry) return;
    try {
      await updateDoc(doc(db, COLLECTION, tenantId, "enquiries", selectedEnquiry.id), {
        notes: notes,
        updated_at: serverTimestamp()
      });
      setSelectedEnquiry({ ...selectedEnquiry, notes });
    } catch (error) {
      console.error("Error saving notes:", error);
    }
  };

  const saveFollowUp = async () => {
    if (!selectedEnquiry || !followUpDate) return;
    try {
      await updateDoc(doc(db, COLLECTION, tenantId, "enquiries", selectedEnquiry.id), {
        followed_up_at: new Date(followUpDate),
        updated_at: serverTimestamp()
      });
      setSelectedEnquiry({ ...selectedEnquiry, followed_up_at: new Date(followUpDate) });
    } catch (error) {
      console.error("Error saving follow-up:", error);
    }
  };

  const exportCSV = () => {
    const headers = ['Student Name', 'Parent', 'Phone', 'Email', 'Standard', 'Interested In', 'Batch', 'City', 'Status', 'Date', 'Notes'];
    const rows = filteredEnquiries.map(e => [
      e.student_name, e.parent_name, e.phone, e.email || '', e.standard, e.interested_in, e.preferred_batch, e.city, e.status, formatDate(e.created_at), e.notes || ''
    ]);
    const csv = [headers.join(','), ...rows.map(r => r.map(v => `"${v || ''}"`).join(','))].join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `enquiries_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
  };

  const filteredEnquiries = useMemo(() => {
    return enquiries.filter(e => {
      const matchStatus = filterStatus === 'all' || e.status === filterStatus;
      const matchSearch = searchQuery === '' || 
        e.student_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        e.phone?.includes(searchQuery) ||
        e.interested_in?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchStatus && matchSearch;
    });
  }, [enquiries, filterStatus, searchQuery]);

  const stats = useMemo(() => {
    const total = enquiries.length;
    const newCount = enquiries.filter(e => e.status === 'new').length;
    const contacted = enquiries.filter(e => e.status === 'contacted').length;
    const interested = enquiries.filter(e => e.status === 'interested').length;
    const admitted = enquiries.filter(e => e.status === 'admitted').length;
    const notInterested = enquiries.filter(e => e.status === 'not_interested').length;
    const conversionRate = total > 0 ? Math.round((admitted / total) * 100) : 0;
    return { total, newCount, contacted, interested, admitted, notInterested, conversionRate };
  }, [enquiries]);

  const statusColors: Record<string, string> = {
    new: 'bg-blue-100 text-blue-700',
    contacted: 'bg-yellow-100 text-yellow-700',
    interested: 'bg-purple-100 text-purple-700',
    admitted: 'bg-green-100 text-green-700',
    not_interested: 'bg-red-100 text-red-700',
  };

  if (loading) return <div className="flex items-center justify-center h-64"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-900"></div></div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Enquiries & Leads</h1>
        <button onClick={exportCSV} className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-green-700">
          <Download className="w-4 h-4" /> Export CSV
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {[
          { label: 'Total Leads', value: stats.total, color: 'text-gray-900' },
          { label: 'New', value: stats.newCount, color: 'text-blue-600' },
          { label: 'Contacted', value: stats.contacted, color: 'text-yellow-600' },
          { label: 'Interested', value: stats.interested, color: 'text-purple-600' },
          { label: 'Admitted', value: stats.admitted, color: 'text-green-600' },
          { label: 'Conversion', value: `${stats.conversionRate}%`, color: 'text-blue-600' },
        ].map(stat => (
          <div key={stat.label} className="bg-white p-4 rounded-xl border border-gray-100 text-center">
            <p className={`text-2xl font-bold ${stat.color}`}>{stat.value}</p>
            <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="flex gap-3 flex-wrap items-center">
        {['all', 'new', 'contacted', 'interested', 'admitted', 'not_interested'].map(status => (
          <button
            key={status}
            onClick={() => setFilterStatus(status)}
            className={`px-3 py-1.5 rounded-full text-xs font-bold transition-colors ${
              filterStatus === status 
                ? statusColors[status] 
                : 'bg-white text-gray-500 border border-gray-200 hover:bg-gray-50'
            }`}
          >
            {status === 'all' ? 'All' : status.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
            {status === 'all' ? ` (${stats.total})` : ` (${enquiries.filter(e => e.status === status).length})`}
          </button>
        ))}
        <div className="flex-grow"></div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input 
            className="pl-10 pr-4 py-1.5 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none w-64"
            placeholder="Search by name, phone, course..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="px-6 py-3 text-xs font-bold text-gray-500 uppercase">Student</th>
                <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase">Contact</th>
                <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase">Interested In</th>
                <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase">Status</th>
                <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase">Date</th>
                <th className="px-4 py-3 text-xs font-bold text-gray-500 uppercase text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y text-sm">
              {filteredEnquiries.map((enquiry) => (
                <tr key={enquiry.id} className="hover:bg-gray-50 cursor-pointer" onClick={() => { setSelectedEnquiry(enquiry); setNotes(enquiry.notes || ''); setFollowUpDate(enquiry.followed_up_at ? new Date(enquiry.followed_up_at.seconds * 1000).toISOString().split('T')[0] : ''); }}>
                  <td className="px-6 py-3">
                    <p className="font-bold text-gray-900">{enquiry.student_name}</p>
                    <p className="text-xs text-gray-500">Parent: {enquiry.parent_name}</p>
                  </td>
                  <td className="px-4 py-3">
                    <a href={`tel:${enquiry.phone}`} className="flex items-center gap-1 text-blue-600 hover:underline text-xs" onClick={e => e.stopPropagation()}>
                      <Phone className="w-3 h-3" /> {enquiry.phone}
                    </a>
                    {enquiry.email && <p className="text-[10px] text-gray-400">{enquiry.email}</p>}
                  </td>
                  <td className="px-4 py-3">
                    <p className="font-medium text-gray-700 text-xs">{enquiry.interested_in || 'General'}</p>
                    <p className="text-[10px] text-gray-400">{enquiry.standard} • {enquiry.city}</p>
                  </td>
                  <td className="px-4 py-3">
                    <select 
                      value={enquiry.status || 'new'}
                      onChange={(e) => { e.stopPropagation(); updateStatus(enquiry.id, e.target.value); }}
                      className={`text-[10px] font-bold px-2 py-1 rounded uppercase outline-none border-none cursor-pointer ${statusColors[enquiry.status] || 'bg-gray-100 text-gray-700'}`}
                    >
                      <option value="new">New</option>
                      <option value="contacted">Contacted</option>
                      <option value="interested">Interested</option>
                      <option value="admitted">Admitted</option>
                      <option value="not_interested">Not Interested</option>
                    </select>
                  </td>
                  <td className="px-4 py-3 text-gray-500 text-xs">{formatDate(enquiry.created_at)}</td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-1" onClick={e => e.stopPropagation()}>
                      <a href={`https://wa.me/${enquiry.phone.replace(/[^0-9]/g, '')}?text=Hello ${enquiry.student_name}, regarding your enquiry at our institute.`} target="_blank" className="p-1.5 text-green-600 hover:bg-green-50 rounded-lg transition-colors">
                        <MessageSquare className="w-4 h-4" />
                      </a>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {filteredEnquiries.length === 0 && (
            <div className="py-16 text-center text-gray-400">
              <p className="font-medium">No enquiries found</p>
              <p className="text-sm mt-1">Enquiries submitted via your website will appear here</p>
            </div>
          )}
        </div>
      </div>

      {selectedEnquiry && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-6 relative">
            <button onClick={() => setSelectedEnquiry(null)} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"><X className="w-6 h-6" /></button>
            <h2 className="text-xl font-bold mb-4">Enquiry Details</h2>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div><p className="text-xs text-gray-500">Student</p><p className="font-bold">{selectedEnquiry.student_name}</p></div>
                <div><p className="text-xs text-gray-500">Parent</p><p className="font-bold">{selectedEnquiry.parent_name}</p></div>
                <div><p className="text-xs text-gray-500">Phone</p><a href={`tel:${selectedEnquiry.phone}`} className="text-blue-600 font-medium">{selectedEnquiry.phone}</a></div>
                <div><p className="text-xs text-gray-500">Email</p><p className="font-medium">{selectedEnquiry.email || 'N/A'}</p></div>
                <div><p className="text-xs text-gray-500">Standard</p><p className="font-medium">{selectedEnquiry.standard}</p></div>
                <div><p className="text-xs text-gray-500">Interested In</p><p className="font-medium">{selectedEnquiry.interested_in || 'General'}</p></div>
                <div><p className="text-xs text-gray-500">City</p><p className="font-medium">{selectedEnquiry.city || 'N/A'}</p></div>
                <div><p className="text-xs text-gray-500">Date</p><p className="font-medium">{formatDate(selectedEnquiry.created_at)}</p></div>
              </div>
              {selectedEnquiry.message && (
                <div><p className="text-xs text-gray-500">Message</p><p className="text-sm text-gray-700 bg-gray-50 p-3 rounded-lg">{selectedEnquiry.message}</p></div>
              )}
              <div>
                <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-1">
                  <Calendar className="w-4 h-4" /> Follow-up Date
                </label>
                <div className="flex gap-2">
                  <input type="date" className="flex-grow px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" value={followUpDate} onChange={(e) => setFollowUpDate(e.target.value)} />
                  <button onClick={saveFollowUp} className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-bold hover:bg-blue-700">Set</button>
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Notes</label>
                <textarea rows={3} className="w-full px-3 py-2 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Add follow-up notes..."></textarea>
                <button onClick={saveNotes} className="mt-2 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg text-sm font-bold hover:bg-gray-200">Save Notes</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
