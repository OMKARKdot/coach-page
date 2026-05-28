import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-blue-900 text-white p-10 text-center">
      <h1 className="text-5xl font-black italic mb-6">CoachPage</h1>
      <p className="text-xl mb-12 max-w-lg">
        The complete SaaS platform for coaching institutes, private tuitions, and skill courses.
      </p>
      <div className="flex gap-4">
        <Link 
          href="/coach-admin" 
          className="bg-white text-blue-900 px-8 py-3 rounded-xl font-bold hover:bg-blue-50 transition-colors"
        >
          Admin Login
        </Link>
        <Link 
          href="/coach/demo-institute" 
          className="border-2 border-white text-white px-8 py-3 rounded-xl font-bold hover:bg-white/10 transition-colors"
        >
          View Demo
        </Link>
      </div>
      <p className="mt-20 text-blue-300 text-sm">
        Built by iCoded Automation Pvt. Ltd., Chh. Sambhaji Nagar
      </p>
    </div>
  );
}
