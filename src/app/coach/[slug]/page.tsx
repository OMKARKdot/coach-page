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
import NoticesTicker from "@/components/coach-public/NoticesTicker";
import TabsContainer from "@/components/coach-public/TabsContainer";
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
  },
  {
    id: "demo-batch-2",
    batch_name: "JEE Advanced 2026 — Evening Batch",
    course_type: "JEE",
    standard: "11th + 12th Combined",
    subjects: ["Physics", "Chemistry", "Mathematics"],
    start_date: "2026-06-20",
    timing: "4:00 PM — 7:00 PM",
    total_seats: 35,
    seats_filled: 20,
    seats_available: 15,
    status: "admissions_open",
    highlight: true,
    order: 2
  },
  {
    id: "demo-batch-3",
    batch_name: "MHT-CET 2026 — Weekend Batch",
    course_type: "MHT-CET",
    standard: "12th",
    subjects: ["Physics", "Chemistry", "Mathematics"],
    start_date: "2026-07-01",
    timing: "8:00 AM — 2:00 PM",
    total_seats: 50,
    seats_filled: 15,
    seats_available: 35,
    status: "admissions_open",
    highlight: false,
    order: 3
  },
  {
    id: "demo-batch-4",
    batch_name: "NEET Dropper 2026 — Intensive",
    course_type: "NEET",
    standard: "Dropper",
    subjects: ["Physics", "Chemistry", "Biology"],
    start_date: "2026-08-01",
    timing: "7:00 AM — 12:00 PM",
    total_seats: 30,
    seats_filled: 22,
    seats_available: 8,
    status: "closing_soon",
    highlight: true,
    order: 4
  },
];

const demoResults = [
  { id: "demo-result-1", student_name: "Ravi Deshmukh", rank: "AIR 142", exam: "NEET 2024", score: 720, percentile: 99.98, highlight: true },
  { id: "demo-result-2", student_name: "Priya Sharma", rank: "AIR 285", exam: "JEE Advanced 2024", score: 345, percentile: 98.7, highlight: true },
  { id: "demo-result-3", student_name: "Amit Patil", rank: "99.8 %ile", exam: "MHT-CET 2024", score: 199, percentile: 99.8, highlight: true },
  { id: "demo-result-4", student_name: "Sneha Joshi", rank: "AIR 450", exam: "NEET 2024", score: 695, percentile: 99.5, highlight: true },
  { id: "demo-result-5", student_name: "Rohit Kale", rank: "AIR 189", exam: "JEE Advanced 2023", score: 332, percentile: 99.2, highlight: false },
  { id: "demo-result-6", student_name: "Kavya Deshmukh", rank: "99.6 %ile", exam: "MHT-CET 2023", score: 195, percentile: 99.6, highlight: false },
];

const demoFaculty = [
  { id: "demo-fac-1", name: "Dr. Suresh Kulkarni", subject: "Physics", qualification: "Ph.D. (Physics), IIT Bombay", experience: "18", specialties: ["Electrodynamics", "Mechanics"] },
  { id: "demo-fac-2", name: "Prof. Meera Joshi", subject: "Chemistry", qualification: "M.Sc. (Chemistry), Gold Medalist", experience: "12", specialties: ["Organic Chemistry", "Physical Chemistry"] },
  { id: "demo-fac-3", name: "Mr. Aniket Deshmukh", subject: "Mathematics", qualification: "B.Tech (IIT Delhi)", experience: "8", specialties: ["Calculus", "Algebra"] },
  { id: "demo-fac-4", name: "Dr. Pallavi Patil", subject: "Biology", qualification: "MBBS, M.D.", experience: "10", specialties: ["Human Physiology", "Genetics"] },
  { id: "demo-fac-5", name: "Mr. Vikram Jadhav", subject: "Physics", qualification: "M.Sc. (Physics), University Topper", experience: "6", specialties: ["Optics", "Modern Physics"] },
  { id: "demo-fac-6", name: "Mrs. Sunita Gupta", subject: "Chemistry", qualification: "Ph.D. (Chemistry), NCL Pune", experience: "15", specialties: ["Inorganic Chemistry", "Thermodynamics"] },
  { id: "demo-fac-7", name: "Mr. Rajesh More", subject: "Mathematics", qualification: "M.Sc. (Mathematics)", experience: "9", specialties: ["Coordinate Geometry", "Trigonometry"] },
  { id: "demo-fac-8", name: "Dr. Aishwarya Kale", subject: "Biology", qualification: "Ph.D. (Zoology)", experience: "7", specialties: ["Ecology", "Cell Biology"] },
];

const demoFees = [
  { id: "demo-fee-1", course_name: "NEET Comprehensive", amount: 125000, fee_type: "year", show_on_website: true, includes: ["All subjects included", "Weekly mock tests", "Doubt sessions", "Study material", "Personal mentoring"], total_programme_fee: 250000, scholarship_available: true, scholarship_note: "Up to 25% scholarship for NEET top 5000 rankers" },
  { id: "demo-fee-2", course_name: "JEE Advanced", amount: 110000, fee_type: "year", show_on_website: true, includes: ["Physics, Chemistry, Maths", "Weekly mock tests", "Doubt sessions", "Study material"], total_programme_fee: 220000, scholarship_available: false, scholarship_note: "" },
  { id: "demo-fee-3", course_name: "MHT-CET Crash", amount: 45000, fee_type: "one-time", show_on_website: true, includes: ["Intensive revision", "Daily practice tests", "Topic-wise quizzes", "Study material"], total_programme_fee: 45000, scholarship_available: false, scholarship_note: "" },
  { id: "demo-fee-4", course_name: "NEET Dropper", amount: 85000, fee_type: "year", show_on_website: true, includes: ["Complete syllabus coverage", "Daily tests", "Personal mentoring", "Study material"], total_programme_fee: 85000, scholarship_available: true, scholarship_note: "Merit-based scholarship for previous year NEET scorers" },
  { id: "demo-fee-5", course_name: "Foundation (9-10)", amount: 35000, fee_type: "year", show_on_website: true, includes: ["Maths & Science", "Concept building", "Weekly assessments", "Study material"], total_programme_fee: 35000, scholarship_available: false, scholarship_note: "" },
  { id: "demo-fee-6", course_name: "JEE Dropper", amount: 75000, fee_type: "year", show_on_website: true, includes: ["Full syllabus coverage", "Mock test series", "Doubt sessions", "Study material"], total_programme_fee: 75000, scholarship_available: false, scholarship_note: "" },
];

const demoTestimonials = [
  { id: "demo-test-1", student_name: "Rajesh Pawar", text: "The coaching here transformed my preparation. The faculty is incredibly supportive and the study material is top-notch. I secured AIR 142 in NEET 2024!", rating: 5, standard: "NEET 2024", published: true },
  { id: "demo-test-2", student_name: "Ananya Gupta", text: "Best decision I ever made! The structured batch system and regular mock tests helped me crack JEE Advanced with a good rank. Now at IIT Bombay.", rating: 5, standard: "JEE Advanced 2024", published: true },
  { id: "demo-test-3", student_name: "Soham Kulkarni", text: "Excellent coaching institute with experienced teachers. The doubt sessions and personalized attention helped me improve my weak areas significantly.", rating: 5, standard: "MHT-CET 2024", published: true },
  { id: "demo-test-4", student_name: "Neha Jadhav", text: "I joined the crash course and was amazed by the quality of teaching. The daily practice tests were extremely helpful for my preparation.", rating: 5, standard: "NEET 2024", published: true },
  { id: "demo-test-5", student_name: "Aditya More", text: "The faculty here genuinely cares about each student. They went above and beyond to help me understand complex concepts. Grateful for this institute.", rating: 5, standard: "JEE Advanced 2023", published: true },
  { id: "demo-test-6", student_name: "Pooja Deshmukh", text: "A fantastic learning environment with great infrastructure. The weekend batch was perfect for my schedule and the results speak for themselves.", rating: 4, standard: "MHT-CET 2023", published: true },
];

const demoGallery = [
  { id: "demo-gal-1", image_url: "https://images.unsplash.com/photo-1523050853063-bd80e295ce7f?auto=format&fit=crop&q=80&w=600&h=400", caption: "Main Campus Building", category: "campus" },
  { id: "demo-gal-2", image_url: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=600&h=400", caption: "Smart Classroom", category: "classroom" },
  { id: "demo-gal-3", image_url: "https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&q=80&w=600&h=400", caption: "Well-stocked Library", category: "library" },
  { id: "demo-gal-4", image_url: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=80&w=600&h=400", caption: "Dedicated Study Hall", category: "study" },
  { id: "demo-gal-5", image_url: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?auto=format&fit=crop&q=80&w=600&h=400", caption: "State-of-the-art Science Lab", category: "lab" },
  { id: "demo-gal-6", image_url: "https://images.unsplash.com/photo-1571260899304-425eee4c7efc?auto=format&fit=crop&q=80&w=600&h=400", caption: "Annual Award Ceremony", category: "event" },
  { id: "demo-gal-7", image_url: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935?auto=format&fit=crop&q=80&w=600&h=400", caption: "Computer Lab", category: "lab" },
  { id: "demo-gal-8", image_url: "https://images.unsplash.com/photo-1529543544282-ea994407a271?auto=format&fit=crop&q=80&w=600&h=400", caption: "Annual Sports Day", category: "event" },
  { id: "demo-gal-9", image_url: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&q=80&w=600&h=400", caption: "Tech Workshop", category: "event" },
];

const demoNotices = [
  { id: "demo-notice-1", title: "Admissions Open for NEET 2026 Batch — Limited Seats Available!", show_on_website: true, type: "admission", urgency: "high" },
  { id: "demo-notice-2", title: "Free Demo Class on Sunday — Register Now!", show_on_website: true, type: "admission", urgency: "high" },
  { id: "demo-notice-3", title: "MHT-CET 2026 Crash Course Starting July 1st", show_on_website: true, type: "general", urgency: "medium" },
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
    const results = demoResults;
    const faculty = demoFaculty;
    const notices = demoNotices;
    const testimonials = demoTestimonials;
    const gallery = demoGallery;
    const fees = demoFees;
    const tenantId = tenant!.id;

    return (
      <TabsContainer
        home={
          <>
            <HeroSection profile={profile} />
            <NoticesTicker notices={notices} />
            <AboutSection profile={profile} />
            <YouTubeSection youtubeVideos={[]} />
            <EnquiryForm tenantId={tenantId} batches={batches} />
          </>
        }
        batches={<BatchesSection batches={batches} />}
        results={<ResultsSection results={results} />}
        faculty={<FacultySection faculty={faculty} />}
        fees={<FeeSection fees={fees} />}
        testimonials={<TestimonialsSection testimonials={testimonials} />}
        gallery={<GallerySection images={gallery} />}
        contact={<ContactSection profile={profile} />}
      />
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
    <TabsContainer
      home={
        <>
          <HeroSection profile={profile} />
          <NoticesTicker notices={notices} />
          <AboutSection profile={profile} />
          <YouTubeSection youtubeVideos={youtubeVideos} />
          <EnquiryForm tenantId={tenant.id} batches={batches} />
        </>
      }
      batches={<BatchesSection batches={batches} />}
      results={<ResultsSection results={results} />}
      faculty={<FacultySection faculty={faculty} />}
      fees={<FeeSection fees={fees} />}
      testimonials={<TestimonialsSection testimonials={testimonials} />}
      gallery={<GallerySection images={gallery} />}
      contact={<ContactSection profile={profile} />}
    />
  );
}
