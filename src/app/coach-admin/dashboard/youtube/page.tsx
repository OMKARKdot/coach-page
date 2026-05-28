'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth-context';
import { db } from '@/lib/firebase';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { Plus, Trash2, GripVertical, Play, Eye } from 'lucide-react';

const COLLECTION = process.env.NEXT_PUBLIC_COACHPAGE_COLLECTION || "coachpage_tenants";

export default function YouTubePage() {
  const { user } = useAuth();
  const isDemoAuth = typeof window !== 'undefined' && sessionStorage.getItem('demoAuth') === 'true';
  const [videos, setVideos] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showOnWebsite, setShowOnWebsite] = useState(false);
  const [newVideoUrl, setNewVideoUrl] = useState('');
  const [newVideoTitle, setNewVideoTitle] = useState('');

  const fetchVideos = async () => {
    const tenantId = user?.uid || "demo-tenant-id";
    const docRef = doc(db, COLLECTION, tenantId, "youtube_videos", "main");
    const docSnap = await getDoc(docRef);
    if (docSnap.exists()) {
      const data = docSnap.data();
      setVideos(data.videos || []);
      setShowOnWebsite(data.show_on_website || false);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchVideos();
  }, [user]);

  const extractYoutubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const addVideo = async () => {
    if (!newVideoUrl) return;
    const videoId = extractYoutubeId(newVideoUrl);
    if (!videoId) {
      alert("Invalid YouTube URL");
      return;
    }
    const tenantId = user?.uid || "demo-tenant-id";
    const newVideo = {
      title: newVideoTitle || 'Untitled Video',
      youtube_id: videoId,
      thumbnail_url: `https://img.youtube.com/vi/${videoId}/mqdefault.jpg`,
      order: videos.length + 1
    };
    const updatedVideos = [...videos, newVideo];
    const docRef = doc(db, COLLECTION, tenantId, "youtube_videos", "main");
    await setDoc(docRef, {
      videos: updatedVideos,
      show_on_website: showOnWebsite,
      updated_at: serverTimestamp()
    }, { merge: true });
    setVideos(updatedVideos);
    setNewVideoUrl('');
    setNewVideoTitle('');
  };

  const deleteVideo = async (index: number) => {
    const tenantId = user?.uid || "demo-tenant-id";
    const updatedVideos = videos.filter((_, i) => i !== index);
    const docRef = doc(db, COLLECTION, tenantId, "youtube_videos", "main");
    await setDoc(docRef, {
      videos: updatedVideos,
      show_on_website: showOnWebsite,
      updated_at: serverTimestamp()
    }, { merge: true });
    setVideos(updatedVideos);
  };

  const toggleShowOnWebsite = async () => {
    const tenantId = user?.uid || "demo-tenant-id";
    const newValue = !showOnWebsite;
    const docRef = doc(db, COLLECTION, tenantId, "youtube_videos", "main");
    await setDoc(docRef, {
      videos,
      show_on_website: newValue,
      updated_at: serverTimestamp()
    }, { merge: true });
    setShowOnWebsite(newValue);
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">YouTube Videos Manager</h1>
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
            <input 
              type="checkbox"
              checked={showOnWebsite}
              onChange={toggleShowOnWebsite}
              className="w-4 h-4"
            />
            Show videos on website
          </label>
        </div>
      </div>

      <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Add New Video</h3>
        <div className="flex gap-4">
          <div className="flex-grow">
            <input 
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              value={newVideoUrl}
              onChange={(e) => setNewVideoUrl(e.target.value)}
              placeholder="Paste YouTube URL here..."
            />
          </div>
          <div className="w-64">
            <input 
              className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              value={newVideoTitle}
              onChange={(e) => setNewVideoTitle(e.target.value)}
              placeholder="Video title"
            />
          </div>
          <button 
            onClick={addVideo}
            className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg font-bold hover:bg-blue-700"
          >
            <Plus className="w-4 h-4" />
            Add
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {videos.map((video, index) => (
          <div key={index} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="relative aspect-video bg-gray-100">
              <img 
                src={video.thumbnail_url || `https://img.youtube.com/vi/${video.youtube_id}/mqdefault.jpg`} 
                alt={video.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
                  <Play className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
            <div className="p-4">
              <div className="flex justify-between items-start">
                <h3 className="font-bold text-gray-900 text-sm">{video.title}</h3>
                <button onClick={() => deleteVideo(index)} className="p-1 text-gray-400 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
              </div>
              <div className="flex items-center gap-1 mt-2 text-xs text-gray-400">
                <GripVertical className="w-3 h-3" />
                Order: {video.order}
              </div>
              <a 
                href={`https://youtube.com/watch?v=${video.youtube_id}`} 
                target="_blank"
                className="inline-flex items-center gap-1 mt-2 text-blue-600 text-xs font-bold hover:underline"
              >
                <Eye className="w-3 h-3" />
                View on YouTube
              </a>
            </div>
          </div>
        ))}
      </div>

      {videos.length === 0 && (
        <div className="bg-white p-12 rounded-2xl shadow-sm border border-gray-100 text-center text-gray-400">
          <Play className="w-12 h-12 mx-auto mb-4 text-gray-300" />
          <p className="font-medium">No YouTube videos added yet.</p>
          <p className="text-sm mt-1">Paste a YouTube URL above to add your first video.</p>
        </div>
      )}
    </div>
  );
}
