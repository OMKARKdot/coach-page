'use client';

import { Phone, MessageSquare } from 'lucide-react';
import { formatDate } from '@/lib/utils';

interface EnquiryTableProps {
  enquiries: any[];
  onUpdateStatus: (id: string, status: string) => void;
  instituteName?: string;
}

const statusColors: Record<string, string> = {
  new: 'bg-blue-100 text-blue-700',
  contacted: 'bg-yellow-100 text-yellow-700',
  interested: 'bg-purple-100 text-purple-700',
  admitted: 'bg-green-100 text-green-700',
  not_interested: 'bg-red-100 text-red-700',
};

export default function EnquiryTable({ enquiries, onUpdateStatus, instituteName = 'the coaching institute' }: EnquiryTableProps) {
  const getStatusOptions = () => (
    <>
      <option value="new">New</option>
      <option value="contacted">Contacted</option>
      <option value="interested">Interested</option>
      <option value="admitted">Admitted</option>
      <option value="not_interested">Not Interested</option>
    </>
  );

  const cleanPhone = (phone: string) => phone.replace(/[^0-9]/g, '');

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-left">
          <thead className="bg-gray-50 border-b">
            <tr>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Student / Parent</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Contact</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Interested In</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Status</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Date</th>
              <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y text-sm">
            {enquiries.map((enquiry) => (
              <tr key={enquiry.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">
                  <p className="font-bold text-gray-900">{enquiry.student_name}</p>
                  <p className="text-xs text-gray-500">Parent: {enquiry.parent_name}</p>
                </td>
                <td className="px-6 py-4">
                  <div className="flex flex-col gap-1">
                    <a href={`tel:${enquiry.phone}`} className="flex items-center gap-1 text-blue-600 hover:underline">
                      <Phone className="w-3 h-3" /> {enquiry.phone}
                    </a>
                    {enquiry.email && <p className="text-xs text-gray-500">{enquiry.email}</p>}
                  </div>
                </td>
                <td className="px-6 py-4">
                  <p className="font-medium text-gray-700">{enquiry.interested_in || 'General Inquiry'}</p>
                  <p className="text-[10px] text-gray-400 uppercase">{enquiry.standard} • {enquiry.preferred_batch}</p>
                </td>
                <td className="px-6 py-4">
                  <select 
                    value={enquiry.status}
                    onChange={(e) => onUpdateStatus(enquiry.id, e.target.value)}
                    className={`text-[10px] font-bold px-2 py-1 rounded uppercase outline-none border-none cursor-pointer ${statusColors[enquiry.status] || 'bg-gray-100 text-gray-700'}`}
                  >
                    {getStatusOptions()}
                  </select>
                </td>
                <td className="px-6 py-4 text-gray-500 text-xs">
                  {formatDate(enquiry.created_at)}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <a 
                      href={`https://wa.me/${cleanPhone(enquiry.phone)}?text=Hello ${enquiry.student_name}, this is from ${instituteName}.`}
                      target="_blank"
                      className="p-2 text-green-600 hover:bg-green-50 rounded-lg transition-colors"
                    >
                      <MessageSquare className="w-4 h-4" />
                    </a>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {enquiries.length === 0 && (
          <div className="py-20 text-center text-gray-400">No enquiries received yet.</div>
        )}
      </div>
    </div>
  );
}
