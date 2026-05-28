'use client';

import { useState } from 'react';
import { X, Star } from 'lucide-react';

interface ResultFormProps {
  formData: any;
  editingId: string | null;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  onChange: (field: string, value: any) => void;
}

export default function ResultForm({ formData, editingId, onClose, onSubmit, onChange }: ResultFormProps) {
  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-8 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          <X className="w-6 h-6" />
        </button>
        <h2 className="text-xl font-bold mb-6">{editingId ? 'Edit Result' : 'Add Topper Result'}</h2>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-sm font-bold text-gray-700 mb-1">Student Name</label>
              <input 
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                value={formData.student_name}
                onChange={(e) => onChange('student_name', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Exam</label>
              <select 
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                value={formData.exam}
                onChange={(e) => onChange('exam', e.target.value)}
              >
                <option>NEET 2025</option>
                <option>NEET 2024</option>
                <option>JEE Mains 2025</option>
                <option>JEE Advanced 2025</option>
                <option>MHT-CET 2025</option>
                <option>10th Board 2025</option>
                <option>12th Board 2025</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Year</label>
              <input 
                type="number"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                value={formData.year}
                onChange={(e) => onChange('year', parseInt(e.target.value))}
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Score (e.g. 685/720)</label>
              <input 
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                value={formData.score}
                onChange={(e) => onChange('score', e.target.value)}
              />
            </div>
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-1">Rank (e.g. AIR 312)</label>
              <input 
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                value={formData.rank}
                onChange={(e) => onChange('rank', e.target.value)}
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-bold text-gray-700 mb-1">College Admitted To</label>
              <input 
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                value={formData.college_admitted}
                onChange={(e) => onChange('college_admitted', e.target.value)}
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-bold text-gray-700 mb-1">Batch Year</label>
              <input 
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                value={formData.batch_year}
                onChange={(e) => onChange('batch_year', e.target.value)}
                placeholder="e.g. 2023-2025"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-sm font-bold text-gray-700 mb-1">Student Testimonial (Optional)</label>
              <textarea 
                rows={3}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
                value={formData.testimonial}
                onChange={(e) => onChange('testimonial', e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <input 
              type="checkbox"
              id="highlight"
              checked={formData.highlight}
              onChange={(e) => onChange('highlight', e.target.checked)}
            />
            <label htmlFor="highlight" className="text-sm font-bold text-gray-700 flex items-center gap-1">
              <Star className="w-4 h-4 text-yellow-500" />
              Highlight as Featured Topper
            </label>
          </div>

          <div className="pt-4 flex justify-end gap-3">
            <button type="button" onClick={onClose} className="px-6 py-2 border rounded-lg font-bold text-gray-600 hover:bg-gray-50">Cancel</button>
            <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700">
              {editingId ? 'Update Result' : 'Save Result'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
