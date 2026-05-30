import { 
  getCoachTenantBySlug, 
  getTenantProfile, 
  getTenantSubCollection,
  getTenantYoutubeVideos
} from "@/lib/coachpage-firestore";
import HeroSection from "@/components/coach-public/HeroSection";
import BatchesSection from "@/components/coach-public/BatchesSection";
import ResultsSection from "@/components/coach-public/ResultsSection";
import FacultySection from "@/components/coach-public/FacultySection";
import AboutSection from "@/components/coach-public/AboutSection";
import FeeSection from "@/components/coach-public/FeeSection";
import TestimonialsSection from "@/components/coach-public/TestimonialsSection";
import YouTubeSection from "@/components/coach-public/YouTubeSection";
import GallerySection from "@/components/coach-public/GallerySection";
import EnquiryForm from "@/components/coach-public/EnquiryForm";
import ContactSection from "@/components/coach-public/ContactSection";
import HamburgerNav from "@/components/coach-public/HamburgerNav";
import { notFound } from "next/navigation";

// ISR: Revalidate pages every 1 hour (admission season traffic optimization)
export const revalidate = 3600;

const demoProfile = {
  institute_name: "Bright Star Academy",
  tagline: "Aurangabad's Most Trusted NEET/JEE Coaching Since 2012",
  logo_url: "https://via.placeholder.com/200x200?text=BSA+Logo",
  banner_image_url: "https://images.unsplash.com/photo-1523050853063-bd80e295ce7f?auto=format&fit=crop&q=80",
  institute_type: "NEET/JEE",
  established_year: 2012,
  total_students_trained: 2400,
  about: "Bright Star Academy has been producing top NEET and JEE rankers from Aurangabad for over a decade.",
  achievements: [
    "AIR 142 in NEET 2024 — Ravi Deshmukh",
    "85% selection rate in MHT-CET 2024"
  ],
  address: "N-6 CIDCO, Chh. Sambhaji Nagar",
  map_embed_url: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15007.472718105574!2d75.361994!3d19.880496!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bdb986f32e29329%3A0x6b801a2d6a782a93!2sCIDCO%2C%20Aurangabad%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1716890000000!5m2!1sen!2sin",
  phone: "+91 240 234 0000",
  whatsapp_number: "+91 93700 00000",
  email: "info@brightstaracademy.in"
};

const demoBatches = [
  {
    id: "demo-batch-1",
    batch_name: "NEET 2026 — Morning Batch",
    course_type: "NEET",
    standard: "11th + 12th Combined",
    subjects: ["Physics", "Chemistry", "Biology"],
    start_date: "2026-06-15",
    timing: "6:30 AM — 9:00 AM",
    total_seats: 40,
    seats_filled: 28,
    seats_available: 12,
    status: "admissions_open",
    highlight: true,
    order: 1
  }
];

const tabs = [
  { label: "Home", slug: "" },
  { label: "Batches", slug: "batches" },
  { label: "Results", slug: "results" },
  { label: "Faculty", slug: "faculty" },
  { label: "Fees", slug: "fees" },
  { label: "Testimonials", slug: "testimonials" },
  { label: "Gallery", slug: "gallery" },
  { label: "Contact", slug: "contact" },
];

export default async function PublicPage({ params }: { params: { slug: string } }) {
  let tenant = await getCoachTenantBySlug(params.slug);
  
  if (params.slug === "demo-institute") {
    if (!tenant) {
      tenant = {
        id: "demo-tenant-id",
        tenant_slug: "demo-institute",
        status: "active",
        product: "coachpage",
        plan: "professional",
      } as any;
    }

    const profile = demoProfile;
    const batches = demoBatches;
    const results: any[] = [];
    const faculty: any[] = [];
    const notices: any[] = [];
    const testimonials: any[] = [];
    const gallery: any[] = [];
    const fees: any[] = [];
    const tenantId = tenant!.id;

    return (
      <>
        <HamburgerNav tabs={tabs} slug={params.slug} />
        <HeroSection profile={profile} />
        <AboutSection profile={profile} />
        <BatchesSection batches={batches} />
        <ResultsSection results={results} />
        <FacultySection faculty={faculty} />
        <FeeSection fees={fees} />
        <YouTubeSection youtubeVideos={[]} />
        <TestimonialsSection testimonials={testimonials} />
        <GallerySection images={gallery} />
        <EnquiryForm tenantId={tenantId} batches={batches} />
        <ContactSection profile={profile} />
      </>
    );
  }

  if (!tenant) {
    notFound();
  }

  const [
    profile,
    batches,
    results,
    faculty,
    notices,
    testimonials,
    gallery,
    fees,
    youtubeVideos,
  ] = await Promise.all([
    getTenantProfile(tenant.id),
    getTenantSubCollection(tenant.id, "batches"),
    getTenantSubCollection(tenant.id, "results"),
    getTenantSubCollection(tenant.id, "faculty"),
    getTenantSubCollection(tenant.id, "notices", "created_at"),
    getTenantSubCollection(tenant.id, "testimonials"),
    getTenantSubCollection(tenant.id, "gallery"),
    getTenantSubCollection(tenant.id, "fees"),
    getTenantYoutubeVideos(tenant.id),
  ]);

  return (
    <>
      <HeroSection profile={profile} />
      <AboutSection profile={profile} />
      <BatchesSection batches={batches} />
      <ResultsSection results={results} />
      <FacultySection faculty={faculty} />
      <FeeSection fees={fees} />
      <YouTubeSection youtubeVideos={youtubeVideos} />
      <TestimonialsSection testimonials={testimonials} />
      <GallerySection images={gallery} />
      <EnquiryForm tenantId={tenant.id} batches={batches} />
      <ContactSection profile={profile} />
    </>
  );
}
