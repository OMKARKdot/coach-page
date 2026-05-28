'use client';

import { Plus, Minus } from 'lucide-react';

interface SeatCounterProps {
  filled: number;
  total: number;
  onChange: (filled: number) => void;
}

export default function SeatCounter({ filled, total, onChange }: SeatCounterProps) {
  const percentage = total > 0 ? (filled / total) * 100 : 0;
  
  const increment = () => {
    if (filled < total) onChange(filled + 1);
  };

  const decrement = () => {
    if (filled > 0) onChange(filled - 1);
  };

  return (
    <div className="space-y-2">
      <div className="flex items-center gap-3">
        <button 
          onClick={decrement}
          disabled={filled === 0}
          className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <Minus className="w-4 h-4" />
        </button>
        <div className="text-center">
          <span className="text-lg font-bold text-gray-900">{filled}</span>
          <span className="text-sm text-gray-400"> / {total}</span>
        </div>
        <button 
          onClick={increment}
          disabled={filled >= total}
          className="w-8 h-8 rounded-lg border border-gray-200 flex items-center justify-center hover:bg-gray-50 disabled:opacity-30 disabled:cursor-not-allowed"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-2">
        <div 
          className={`h-2 rounded-full transition-all ${
            percentage > 80 ? 'bg-red-500' : percentage > 50 ? 'bg-yellow-500' : 'bg-green-500'
          }`} 
          style={{ width: `${percentage}%` }}
        />
      </div>
      <p className="text-[10px] text-gray-400 text-center">{total - filled} seats remaining</p>
    </div>
  );
}
