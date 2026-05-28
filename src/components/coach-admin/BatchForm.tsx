'use client';

import { X } from 'lucide-react';

interface BatchFormProps {
  formData: any;
  editingId: string | null;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  onChange: (field: string, value: any) => void;
}

export default function BatchForm({ formData, editingId, onClose, onSubmit, onChange }: BatchFormProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-8 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          <X className="w-6 h-6" />
        </button>
        <h2 className="text-xl font-bold mb-6">{editingId ? 'Edit Batch' : 'Add New Batch'}</h2>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-sm font-bold text-gray-700 mb-1">Batch Name</label>
              <input 
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                value={formData.batch_name}
                onChange={(e) => onChange('batch_name', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Course Type</label>
              <select 
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                value={formData.course_type}
                onChange={(e) => onChange('course_type', e.target.value)}
              >
                <option>NEET</option>
                <option>JEE</option>
                <option>MHT-CET</option>
                <option>10th Board</option>
                <option>12th Board</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Standard</label>
              <input 
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                value={formData.standard}
                onChange={(e) => onChange('standard', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Start Date</label>
              <input 
                type="date"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                value={formData.start_date}
                onChange={(e) => onChange('start_date', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Timing</label>
              <input 
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                value={formData.timing}
                onChange={(e) => onChange('timing', e.target.value)}
                placeholder="e.g. 6:30 AM - 9:00 AM"
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Total Seats</label>
              <input 
                type="number"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                value={formData.total_seats}
                onChange={(e) => onChange('total_seats', parseInt(e.target.value))}
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Seats Filled</label>
              <input 
                type="number"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                value={formData.seats_filled}
                onChange={(e) => onChange('seats_filled', parseInt(e.target.value))}
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Fee per Month (₹)</label>
              <input 
                type="number"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                value={formData.fee_per_month || 0}
                onChange={(e) => onChange('fee_per_month', parseInt(e.target.value))}
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Total Fee (₹)</label>
              <input 
                type="number"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                value={formData.total_fee || 0}
                onChange={(e) => onChange('total_fee', parseInt(e.target.value))}
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-bold text-gray-700 mb-1">Status</label>
              <select 
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                value={formData.status}
                onChange={(e) => onChange('status', e.target.value)}
              >
                <option value="admissions_open">Admissions Open</option>
                <option value="admissions_closed">Admissions Closed</option>
                <option value="ongoing">Ongoing</option>
                <option value="completed">Completed</option>
                <option value="upcoming">Upcoming</option>
              </select>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2">
              <input 
                type="checkbox"
                checked={formData.highlight}
                onChange={(e) => onChange('highlight', e.target.checked)}
              />
              <span className="text-sm font-bold text-gray-700">Highlight as Featured</span>
            </label>
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <button type="button" onClick={onClose} className="px-6 py-2 border rounded-lg font-bold text-gray-600 hover:bg-gray-50">Cancel</button>
            <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700">
              {editingId ? 'Update Batch' : 'Create Batch'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
