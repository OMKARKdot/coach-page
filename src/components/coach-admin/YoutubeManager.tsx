'use client';

import { useState } from 'react';
import { Plus, Trash2, GripVertical, Play, Eye } from 'lucide-react';

interface YoutubeManagerProps {
  videos: any[];
  showOnWebsite: boolean;
  onToggleShow: () => void;
  onAdd: (title: string, url: string) => void;
  onDelete: (index: number) => void;
}

export default function YoutubeManager({ videos, showOnWebsite, onToggleShow, onAdd, onDelete }: YoutubeManagerProps) {
  const [newUrl, setNewUrl] = useState('');
  const [newTitle, setNewTitle] = useState('');

  const extractYoutubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const handleAdd = () => {
    if (!newUrl) return;
    const videoId = extractYoutubeId(newUrl);
    if (!videoId) {
      alert("Invalid YouTube URL. Please enter a valid YouTube link.");
      return;
    }
    onAdd(newTitle || 'Untitled Video', newUrl);
    setNewUrl('');
    setNewTitle('');
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-gray-900">Manage YouTube Videos</h3>
        <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
          <input 
            type="checkbox"
            checked={showOnWebsite}
            onChange={onToggleShow}
            className="w-4 h-4"
          />
          Show on website
        </label>
      </div>

      <div className="bg-white p-4 rounded-xl border border-gray-200">
        <div className="flex gap-3">
          <input 
            className="flex-grow px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            value={newUrl}
            onChange={(e) => setNewUrl(e.target.value)}
            placeholder="Paste YouTube URL..."
          />
          <input 
            className="w-48 px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Title"
          />
          <button 
            onClick={handleAdd}
            className="flex items-center gap-1 bg-blue-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-700"
          >
            <Plus className="w-4 h-4" />
            Add
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {videos.map((video, index) => (
          <div key={index} className="bg-white rounded-xl border border-gray-200 overflow-hidden">
            <div className="relative aspect-video bg-gray-100">
              <img 
                src={video.thumbnail_url || `https://img.youtube.com/vi/${video.youtube_id}/mqdefault.jpg`} 
                alt={video.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
                  <Play className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>
            <div className="p-3">
              <div className="flex justify-between items-start">
                <h4 className="font-bold text-gray-900 text-sm">{video.title}</h4>
                <button onClick={() => onDelete(index)} className="p-1 text-gray-400 hover:text-red-600"><Trash2 className="w-3 h-3" /></button>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <GripVertical className="w-3 h-3 text-gray-400" />
                <span className="text-[10px] text-gray-400">Order: {video.order}</span>
                <a 
                  href={`https://youtube.com/watch?v=${video.youtube_id}`} 
                  target="_blank"
                  className="ml-auto flex items-center gap-1 text-blue-600 text-[10px] font-bold hover:underline"
                >
                  <Eye className="w-3 h-3" />
                  View
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>

      {videos.length === 0 && (
        <div className="bg-white p-8 rounded-xl border border-gray-200 text-center text-gray-400">
          <Play className="w-10 h-10 mx-auto mb-3 text-gray-300" />
          <p className="font-medium">No YouTube videos added yet.</p>
          <p className="text-sm mt-1">Paste a YouTube URL above to add your first video.</p>
        </div>
      )}
    </div>
  );
}
