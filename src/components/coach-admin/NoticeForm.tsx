'use client';

import { useState } from 'react';
import { X } from 'lucide-react';

interface NoticeFormProps {
  formData: any;
  editingId: string | null;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  onChange: (field: string, value: any) => void;
}

export default function NoticeForm({ formData, editingId, onClose, onSubmit, onChange }: NoticeFormProps) {
  const typeColors: Record<string, string> = {
    admission: 'bg-green-100 text-green-700',
    result: 'bg-blue-100 text-blue-700',
    holiday: 'bg-purple-100 text-purple-700',
    exam: 'bg-orange-100 text-orange-700',
    general: 'bg-gray-100 text-gray-700',
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg p-8 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          <X className="w-6 h-6" />
        </button>
        <h2 className="text-xl font-bold mb-6">{editingId ? 'Edit Notice' : 'Add Notice'}</h2>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Title</label>
            <input 
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              value={formData.title}
              onChange={(e) => onChange('title', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Type</label>
            <div className="flex flex-wrap gap-2">
              {Object.keys(typeColors).map(type => (
                <button
                  key={type}
                  type="button"
                  onClick={() => onChange('type', type)}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition-colors ${
                    formData.type === type ? typeColors[type] : 'bg-gray-100 text-gray-600'
                  }`}
                >
                  {type.charAt(0).toUpperCase() + type.slice(1)}
                </button>
              ))}
            </div>
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Body / Message</label>
            <textarea 
              rows={4}
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              value={formData.body}
              onChange={(e) => onChange('body', e.target.value)}
            />
          </div>
          <div className="flex items-center gap-4">
            <label className="flex items-center gap-2">
              <input 
                type="checkbox"
                checked={formData.urgent}
                onChange={(e) => onChange('urgent', e.target.checked)}
              />
              <span className="text-sm font-bold text-gray-700">Urgent (Shows in Ticker)</span>
            </label>
            <label className="flex items-center gap-2">
              <input 
                type="checkbox"
                checked={formData.published}
                onChange={(e) => onChange('published', e.target.checked)}
              />
              <span className="text-sm font-bold text-gray-700">Published</span>
            </label>
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Expiry Date (Optional)</label>
            <input 
              type="date"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              value={formData.expires_at || ''}
              onChange={(e) => onChange('expires_at', e.target.value)}
            />
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button type="button" onClick={onClose} className="px-6 py-2 border rounded-lg font-bold text-gray-600 hover:bg-gray-50">Cancel</button>
            <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700">
              {editingId ? 'Update Notice' : 'Post Notice'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
