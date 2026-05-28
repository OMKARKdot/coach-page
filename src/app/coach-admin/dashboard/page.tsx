'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth-context';
import { db } from '@/lib/firebase';
import { 
  collection, 
  getDocs, 
  doc, 
  query, 
  orderBy,
  limit,
  where,
  onSnapshot
} from 'firebase/firestore';
import Link from 'next/link';
import { MessageSquare, Users, TrendingUp, AlertTriangle, ChevronRight, Phone, MessageCircle } from 'lucide-react';

const COLLECTION = process.env.NEXT_PUBLIC_COACHPAGE_COLLECTION || "coachpage_tenants";

export default function DashboardPage() {
  const { user } = useAuth();
  const isDemoAuth = typeof window !== 'undefined' && sessionStorage.getItem('demoAuth') === 'true';
  const [enquiries, setEnquiries] = useState<any[]>([]);
  const [batches, setBatches] = useState<any[]>([]);
  const [stats, setStats] = useState({
    newEnquiries: 0,
    todayEnquiries: 0,
    activeBatches: 0,
    totalSeatsFilled: 0,
    totalSeats: 0,
    conversionRate: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const tenantId = user?.uid || "demo-tenant-id";

    const enquiriesQuery = query(
      collection(db, COLLECTION, tenantId, "enquiries"),
      orderBy("created_at", "desc"),
      limit(50)
    );

    const batchesQuery = query(
      collection(db, COLLECTION, tenantId, "batches"),
      where("status", "in", ["admissions_open", "ongoing"])
    );

    const unsubscribeEnquiries = onSnapshot(enquiriesQuery, (snapshot) => {
      const enquiryList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setEnquiries(enquiryList);

      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const todayCount = enquiryList.filter((e: any) => {
        const created = e.created_at?.toDate?.();
        return created && created >= today;
      }).length;

      const admitted = enquiryList.filter((e: any) => e.status === 'admitted').length;
      const conversionRate = enquiryList.length > 0 ? Math.round((admitted / enquiryList.length) * 100) : 0;

      setStats(prev => ({
        ...prev,
        newEnquiries: enquiryList.filter((e: any) => e.status === 'new').length,
        todayEnquiries: todayCount,
        conversionRate,
      }));
    });

    const unsubscribeBatches = onSnapshot(batchesQuery, (snapshot) => {
      const batchList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setBatches(batchList);

      const totalSeats = batchList.reduce((sum: number, b: any) => sum + (b.total_seats || 0), 0);
      const totalFilled = batchList.reduce((sum: number, b: any) => sum + (b.seats_filled || 0), 0);
      const seatsFilledPercentage = totalSeats > 0 ? Math.round((totalFilled / totalSeats) * 100) : 0;

      setStats(prev => ({
        ...prev,
        activeBatches: batchList.length,
        totalSeatsFilled: seatsFilledPercentage,
        totalSeats: totalSeats,
      }));

      setLoading(false);
    });

    return () => {
      unsubscribeEnquiries();
      unsubscribeBatches();
    };
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-900"></div>
      </div>
    );
  }

  const statCards = [
    { 
      name: 'New Enquiries', 
      value: stats.newEnquiries.toString(), 
      change: `+${stats.todayEnquiries} today`, 
      color: 'bg-blue-500',
      icon: MessageSquare,
      link: '/coach-admin/dashboard/enquiries'
    },
    { 
      name: 'Active Batches', 
      value: stats.activeBatches.toString(), 
      change: `${stats.totalSeats} total seats`, 
      color: 'bg-green-500',
      icon: Users,
      link: '/coach-admin/dashboard/batches'
    },
    { 
      name: 'Seats Filled', 
      value: `${stats.totalSeatsFilled}%`, 
      change: 'Avg across batches', 
      color: 'bg-orange-500',
      icon: TrendingUp,
      link: '/coach-admin/dashboard/batches'
    },
    { 
      name: 'Conversion Rate', 
      value: `${stats.conversionRate}%`, 
      change: 'Leads to admissions', 
      color: 'bg-purple-500',
      icon: TrendingUp,
      link: '/coach-admin/dashboard/enquiries'
    },
  ];

  return (
    <div className="space-y-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Link key={stat.name} href={stat.link} className="block group">
              <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100 hover:border-blue-200 hover:shadow-md transition-all">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm font-medium text-gray-500">{stat.name}</p>
                  <div className={`w-10 h-10 rounded-xl ${stat.color} flex items-center justify-center`}>
                    <Icon className="w-5 h-5 text-white" />
                  </div>
                </div>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                <p className="text-xs font-medium text-gray-400 mt-2">{stat.change}</p>
                <ChevronRight className="w-4 h-4 text-gray-300 mt-2 group-hover:text-blue-500 group-hover:translate-x-1 transition-all" />
              </div>
            </Link>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-900">Recent Enquiries</h3>
            <Link href="/coach-admin/dashboard/enquiries" className="text-blue-600 text-sm font-bold hover:underline">View All</Link>
          </div>
          <div className="space-y-4">
            {enquiries.slice(0, 5).map((enquiry) => (
              <div key={enquiry.id} className="flex items-center justify-between py-3 border-b last:border-0">
                <div>
                  <p className="font-bold text-gray-900 text-sm">{enquiry.student_name}</p>
                  <p className="text-xs text-gray-500">
                    {enquiry.interested_in || 'General'} • {enquiry.standard}
                  </p>
                </div>
                <div className="flex gap-1">
                  <a 
                    href={`tel:${enquiry.phone}`}
                    className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                  </a>
                  <a 
                    href={`https://wa.me/${enquiry.phone.replace(/[^0-9]/g, '')}`}
                    target="_blank"
                    className="p-2 text-gray-400 hover:text-green-600 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                  </a>
                </div>
              </div>
            ))}
            {enquiries.length === 0 && (
              <div className="py-12 text-center text-gray-400">
                <MessageSquare className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                <p>No enquiries yet.</p>
              </div>
            )}
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-gray-900">Batch Occupancy</h3>
            <Link href="/coach-admin/dashboard/batches" className="text-blue-600 text-sm font-bold hover:underline">Manage Batches</Link>
          </div>
          <div className="space-y-6">
            {batches.slice(0, 5).map((batch) => (
              <div key={batch.id}>
                <div className="flex justify-between text-sm mb-2">
                  <span className="font-medium text-gray-700">
                    {batch.highlight && <span className="text-yellow-500 mr-1">★</span>}
                    {batch.batch_name}
                  </span>
                  <span className="text-gray-500">{batch.seats_filled}/{batch.total_seats} Seats</span>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full transition-all ${
                      (batch.seats_filled / batch.total_seats) > 0.8 
                        ? 'bg-red-500' 
                        : (batch.seats_filled / batch.total_seats) > 0.5 
                          ? 'bg-yellow-500' 
                          : 'bg-green-500'
                    }`}
                    style={{ width: `${(batch.seats_filled / batch.total_seats) * 100}%` }}
                  />
                </div>
                <p className="text-[10px] text-gray-400 mt-1">{batch.seats_available ?? (batch.total_seats - batch.seats_filled)} seats remaining</p>
              </div>
            ))}
            {batches.length === 0 && (
              <div className="py-12 text-center text-gray-400">
                <Users className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                <p>No active batches. Add your first batch!</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {stats.newEnquiries > 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex items-center gap-3">
          <AlertTriangle className="w-5 h-5 text-yellow-600 shrink-0" />
          <p className="text-sm text-yellow-700 font-medium">
            You have <strong>{stats.newEnquiries} new enquiry{stats.newEnquiries > 1 ? 's' : ''}</strong> waiting to be contacted. 
            <Link href="/coach-admin/dashboard/enquiries" className="underline ml-1">Follow up now →</Link>
          </p>
        </div>
      )}
    </div>
  );
}
