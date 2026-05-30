"use client";

import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { doc, setDoc, serverTimestamp } from "firebase/firestore";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Building2, ArrowLeft } from "lucide-react";

const COLLECTION = process.env.NEXT_PUBLIC_COACHPAGE_COLLECTION || "coachpage_tenants";

export default function RegisterPage() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    email: "",
    password: "",
    institute_name: "",
    institute_type: "",
    tagline: "",
    phone: "",
    address: "",
    established_year: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const update = (field: string, value: string) => setForm(prev => ({ ...prev, [field]: value }));

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const cred = await createUserWithEmailAndPassword(auth, form.email, form.password);
      const tenantId = cred.user.uid;
      const slug = form.institute_name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

      await setDoc(doc(db, COLLECTION, tenantId), {
        tenant_slug: slug,
        status: "active",
        product: "coachpage",
        plan: "professional",
        created_at: serverTimestamp(),
      });

      await setDoc(doc(db, COLLECTION, tenantId, "profile", "main"), {
        institute_name: form.institute_name,
        institute_type: form.institute_type,
        tagline: form.tagline,
        phone: form.phone,
        address: form.address,
        established_year: form.established_year ? parseInt(form.established_year) : null,
        banner_image_url: "",
        logo_url: "",
        total_students_trained: 0,
        about: "",
        achievements: [],
        map_embed_url: "",
        email: form.email,
        created_at: serverTimestamp(),
      });

      router.push("/coach-admin/dashboard");
    } catch (err: any) {
      setError(err.message || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full space-y-8 bg-white p-10 rounded-2xl shadow-xl border border-gray-100">
        <div>
          <Link href="/" className="inline-flex items-center gap-1.5 text-sm text-gray-500 hover:text-blue-600 mb-6 transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back to Home
          </Link>
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-blue-100 p-2.5 rounded-xl">
              <Building2 className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <h2 className="text-2xl font-extrabold text-gray-900">Register Your Institute</h2>
              <p className="text-sm text-gray-500">Set up your coaching institute on CoachPage</p>
            </div>
          </div>
        </div>

        {/* Steps Indicator */}
        <div className="flex items-center gap-2 text-xs font-medium">
          <div className={`px-3 py-1.5 rounded-full ${step === 1 ? "bg-blue-600 text-white" : "bg-blue-100 text-blue-700"}`}>Account</div>
          <div className="h-px flex-1 bg-gray-200" />
          <div className={`px-3 py-1.5 rounded-full ${step === 2 ? "bg-blue-600 text-white" : "bg-gray-100 text-gray-400"}`}>Institute</div>
        </div>

        <form onSubmit={handleRegister} className="space-y-5">
          {error && (
            <div className="bg-red-50 text-red-600 p-3 rounded-lg text-sm font-medium">{error}</div>
          )}

          {step === 1 && (
            <>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Email Address</label>
                <input
                  type="email" required
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                  placeholder="admin@yourinstitute.com"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">Password</label>
                <input
                  type="password" required minLength={6}
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                  placeholder="Min 6 characters"
                  value={form.password}
                  onChange={(e) => update("password", e.target.value)}
                />
              </div>
              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => router.push("/coach-admin")} className="flex-1 py-2.5 border border-gray-300 text-gray-700 rounded-xl font-medium text-sm hover:bg-gray-50 transition-colors">
                  Cancel
                </button>
                <button type="button" onClick={() => setStep(2)} className="flex-1 py-2.5 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 transition-colors">
                  Next
                </button>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-1">Institute Name</label>
                  <input
                    type="text" required
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                    placeholder="e.g. Bright Star Academy"
                    value={form.institute_name}
                    onChange={(e) => update("institute_name", e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Institute Type</label>
                  <select
                    required
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm bg-white"
                    value={form.institute_type}
                    onChange={(e) => update("institute_type", e.target.value)}
                  >
                    <option value="">Select type</option>
                    <option value="NEET/JEE">NEET/JEE</option>
                    <option value="Engineering">Engineering</option>
                    <option value="Medical">Medical</option>
                    <option value="Commerce">Commerce</option>
                    <option value="Foundation">Foundation</option>
                    <option value="Skill Course">Skill Course</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Est. Year</label>
                  <input
                    type="number"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                    placeholder="e.g. 2012"
                    value={form.established_year}
                    onChange={(e) => update("established_year", e.target.value)}
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm font-bold text-gray-700 mb-1">Tagline</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                    placeholder="e.g. Aurangabad's Most Trusted NEET/JEE Coaching"
                    value={form.tagline}
                    onChange={(e) => update("tagline", e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Phone</label>
                  <input
                    type="tel"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                    placeholder="+91 240 234 0000"
                    value={form.phone}
                    onChange={(e) => update("phone", e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Address</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none text-sm"
                    placeholder="e.g. N-6 CIDCO, Chh. Sambhaji Nagar"
                    value={form.address}
                    onChange={(e) => update("address", e.target.value)}
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-2">
                <button type="button" onClick={() => setStep(1)} className="flex-1 py-2.5 border border-gray-300 text-gray-700 rounded-xl font-medium text-sm hover:bg-gray-50 transition-colors">
                  Back
                </button>
                <button
                  type="submit" disabled={loading}
                  className="flex-1 py-2.5 bg-blue-600 text-white rounded-xl font-bold text-sm hover:bg-blue-700 disabled:bg-blue-400 transition-colors"
                >
                  {loading ? "Creating..." : "Create Account"}
                </button>
              </div>
            </>
          )}
        </form>

        <p className="text-center text-xs text-gray-400">
          Already registered?{" "}
          <Link href="/coach-admin" className="text-blue-600 font-bold hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
