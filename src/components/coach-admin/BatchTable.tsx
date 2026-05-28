'use client';

import { Pencil, Trash2 } from 'lucide-react';

interface BatchTableProps {
  batches: any[];
  onEdit: (batch: any) => void;
  onDelete: (id: string) => void;
}

export default function BatchTable({ batches, onEdit, onDelete }: BatchTableProps) {
  const statusColors: Record<string, string> = {
    admissions_open: 'bg-green-100 text-green-700',
    admissions_closed: 'bg-red-100 text-red-700',
    ongoing: 'bg-blue-100 text-blue-700',
    completed: 'bg-gray-100 text-gray-700',
    upcoming: 'bg-yellow-100 text-yellow-700',
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
      <table className="w-full text-left">
        <thead className="bg-gray-50 border-b">
          <tr>
            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Batch Name</th>
            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Course</th>
            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Timing</th>
            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Seats</th>
            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase">Status</th>
            <th className="px-6 py-4 text-xs font-bold text-gray-500 uppercase text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y">
          {batches.map((batch) => (
            <tr key={batch.id} className="hover:bg-gray-50">
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  {batch.highlight && <span className="text-yellow-500">★</span>}
                  <div>
                    <p className="font-bold text-gray-900">{batch.batch_name}</p>
                    <p className="text-xs text-gray-500">{batch.start_date}</p>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4">
                <span className="text-sm text-gray-600">{batch.course_type} ({batch.standard})</span>
              </td>
              <td className="px-6 py-4">
                <span className="text-sm text-gray-600">{batch.timing}</span>
              </td>
              <td className="px-6 py-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-bold">{batch.seats_filled} / {batch.total_seats}</span>
                  <div className="w-20 bg-gray-100 h-1.5 rounded-full">
                    <div 
                      className={`h-1.5 rounded-full ${
                        (batch.seats_filled / batch.total_seats) > 0.8 
                          ? 'bg-red-500' 
                          : (batch.seats_filled / batch.total_seats) > 0.5 
                            ? 'bg-yellow-500' 
                            : 'bg-green-500'
                      }`} 
                      style={{ width: `${(batch.seats_filled / batch.total_seats) * 100}%` }}
                    />
                  </div>
                </div>
                <span className="text-[10px] text-gray-400">{batch.seats_available ?? (batch.total_seats - batch.seats_filled)} available</span>
              </td>
              <td className="px-6 py-4">
                <span className={`text-[10px] font-bold px-2 py-1 rounded uppercase ${statusColors[batch.status] || 'bg-gray-100 text-gray-700'}`}>
                  {batch.status?.replace('_', ' ')}
                </span>
              </td>
              <td className="px-6 py-4 text-right">
                <div className="flex justify-end gap-2">
                  <button onClick={() => onEdit(batch)} className="p-2 text-gray-400 hover:text-blue-600 transition-colors">
                    <Pencil className="w-4 h-4" />
                  </button>
                  <button onClick={() => onDelete(batch.id)} className="p-2 text-gray-400 hover:text-red-600 transition-colors">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {batches.length === 0 && (
        <div className="py-20 text-center text-gray-400">No batches added yet.</div>
      )}
    </div>
  );
}
