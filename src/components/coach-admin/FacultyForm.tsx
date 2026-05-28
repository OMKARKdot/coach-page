'use client';

import { useState } from 'react';
import { X } from 'lucide-react';

interface FacultyFormProps {
  formData: any;
  editingId: string | null;
  onClose: () => void;
  onSubmit: (e: React.FormEvent) => void;
  onChange: (field: string, value: any) => void;
}

export default function FacultyForm({ formData, editingId, onClose, onSubmit, onChange }: FacultyFormProps) {
  const addQualification = () => {
    const quals = [...(formData.qualification || []), ''];
    onChange('qualification', quals);
  };

  const updateQualification = (index: number, value: string) => {
    const quals = [...formData.qualification];
    quals[index] = value;
    onChange('qualification', quals);
  };

  const removeQualification = (index: number) => {
    const quals = formData.qualification.filter((_: string, i: number) => i !== index);
    onChange('qualification', quals);
  };

  const addSubject = () => {
    const subs = [...(formData.subjects || []), ''];
    onChange('subjects', subs);
  };

  const updateSubject = (index: number, value: string) => {
    const subs = [...formData.subjects];
    subs[index] = value;
    onChange('subjects', subs);
  };

  const removeSubject = (index: number) => {
    const subs = formData.subjects.filter((_: string, i: number) => i !== index);
    onChange('subjects', subs);
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto p-8 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-gray-600">
          <X className="w-6 h-6" />
        </button>
        <h2 className="text-xl font-bold mb-6">{editingId ? 'Edit Faculty' : 'Add Faculty'}</h2>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Name</label>
            <input 
              required
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              value={formData.name}
              onChange={(e) => onChange('name', e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Designation</label>
            <input 
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              value={formData.designation}
              onChange={(e) => onChange('designation', e.target.value)}
              placeholder="e.g. Physics HOD"
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Photo URL</label>
            <input 
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              value={formData.photo_url}
              onChange={(e) => onChange('photo_url', e.target.value)}
              placeholder="https://storage.googleapis.com/..."
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Experience (Years)</label>
            <input 
              type="number"
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              value={formData.experience_years}
              onChange={(e) => onChange('experience_years', parseInt(e.target.value))}
            />
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Qualifications</label>
            {formData.qualification?.map((qual: string, index: number) => (
              <div key={index} className="flex gap-2 mb-2">
                <input 
                  className="flex-grow px-3 py-1.5 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  value={qual}
                  onChange={(e) => updateQualification(index, e.target.value)}
                  placeholder="e.g. M.Sc. Physics"
                />
                <button type="button" onClick={() => removeQualification(index)} className="text-red-500 text-sm">✕</button>
              </div>
            ))}
            <button type="button" onClick={addQualification} className="text-blue-600 text-sm font-bold">+ Add Qualification</button>
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-2">Subjects</label>
            {formData.subjects?.map((sub: string, index: number) => (
              <div key={index} className="flex gap-2 mb-2">
                <input 
                  className="flex-grow px-3 py-1.5 border rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none"
                  value={sub}
                  onChange={(e) => updateSubject(index, e.target.value)}
                  placeholder="e.g. Physics"
                />
                <button type="button" onClick={() => removeSubject(index)} className="text-red-500 text-sm">✕</button>
              </div>
            ))}
            <button type="button" onClick={addSubject} className="text-blue-600 text-sm font-bold">+ Add Subject</button>
          </div>
          <div>
            <label className="block text-sm font-bold text-gray-700 mb-1">Bio</label>
            <textarea 
              rows={3}
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              value={formData.bio}
              onChange={(e) => onChange('bio', e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <input 
              type="checkbox"
              id="active"
              checked={formData.active}
              onChange={(e) => onChange('active', e.target.checked)}
            />
            <label htmlFor="active" className="text-sm font-bold text-gray-700">Active</label>
          </div>
          <div className="flex justify-end gap-3 pt-4">
            <button type="button" onClick={onClose} className="px-6 py-2 border rounded-lg font-bold text-gray-600 hover:bg-gray-50">Cancel</button>
            <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-lg font-bold hover:bg-blue-700">
              {editingId ? 'Update Faculty' : 'Save Faculty'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
