'use client';

import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  UserCircle, 
  Users, 
  MessageSquare, 
  Trophy, 
  Users2, 
  BookOpen, 
  Bell, 
  Image as ImageIcon, 
  Wallet,
  Video, 
  Star,
  Receipt,
  LogOut
} from 'lucide-react';
import { auth } from '@/lib/firebase';
import { signOut } from 'firebase/auth';

const menuItems = [
  { name: 'Dashboard', icon: LayoutDashboard, href: '/coach-admin/dashboard' },
  { name: 'Profile', icon: UserCircle, href: '/coach-admin/dashboard/profile' },
  { name: 'Batches', icon: Users, href: '/coach-admin/dashboard/batches' },
  { name: 'Enquiries', icon: MessageSquare, href: '/coach-admin/dashboard/enquiries' },
  { name: 'Results', icon: Trophy, href: '/coach-admin/dashboard/results' },
  { name: 'Faculty', icon: Users2, href: '/coach-admin/dashboard/faculty' },
  { name: 'Subjects', icon: BookOpen, href: '/coach-admin/dashboard/subjects' },
  { name: 'Notices', icon: Bell, href: '/coach-admin/dashboard/notices' },
  { name: 'Gallery', icon: ImageIcon, href: '/coach-admin/dashboard/gallery' },
  { name: 'Fees', icon: Wallet, href: '/coach-admin/dashboard/fees' },
  { name: 'YouTube', icon: Video, href: '/coach-admin/dashboard/youtube' },
  { name: 'Testimonials', icon: Star, href: '/coach-admin/dashboard/testimonials' },
  { name: 'Billing', icon: Receipt, href: '/coach-admin/dashboard/billing' },
];

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, loading } = useAuth();
  const router = useRouter();
  const isDemoAuth = typeof window !== 'undefined' && sessionStorage.getItem('demoAuth') === 'true';

  useEffect(() => {
    if (!loading && !user && !isDemoAuth) {
      router.push('/coach-admin');
    }
  }, [user, loading, router, isDemoAuth]);

  if (loading || (!user && !isDemoAuth)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900"></div>
      </div>
    );
  }

  const handleLogout = () => {
    if (isDemoAuth) {
      sessionStorage.removeItem('demoAuth');
    } else {
      signOut(auth);
    }
    router.push('/coach-admin');
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-blue-900 text-white flex-shrink-0 hidden lg:flex flex-col">
        <div className="p-6">
          <h1 className="text-2xl font-bold italic tracking-wider">CoachPage</h1>
          <p className="text-blue-300 text-xs">Institute Admin</p>
        </div>
        
        <nav className="flex-grow py-4 overflow-y-auto">
          {menuItems.map((item) => (
            <Link 
              key={item.name} 
              href={item.href}
              className="flex items-center px-6 py-3 text-blue-100 hover:bg-blue-800 hover:text-white transition-colors"
            >
              <item.icon className="w-5 h-5 mr-3" />
              <span className="text-sm font-medium">{item.name}</span>
            </Link>
          ))}
        </nav>
        
        <div className="p-4 border-t border-blue-800">
          <button 
            onClick={handleLogout}
            className="flex items-center px-4 py-2 w-full text-blue-100 hover:text-white transition-colors"
          >
            <LogOut className="w-5 h-5 mr-3" />
            <span className="text-sm font-medium">Logout</span>
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-grow flex flex-col min-w-0">
        <header className="bg-white h-16 border-b flex items-center justify-between px-8">
          <h2 className="text-xl font-bold text-gray-800">Admin Dashboard</h2>
          <div className="flex items-center gap-4">
             <div className="bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
               <span className="text-xs font-bold text-blue-700 uppercase">Professional Plan</span>
             </div>
             <div className="w-8 h-8 bg-gray-200 rounded-full"></div>
          </div>
        </header>
        
        <main className="flex-grow p-8 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
