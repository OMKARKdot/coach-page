const { initializeApp } = require('firebase/app');
const { 
  getFirestore, collection, doc, setDoc, addDoc, deleteDoc, getDocs, query, where 
} = require('firebase/firestore');

// Firebase config from .env.local
const firebaseConfig = {
  apiKey: "AIzaSyBYIkMLe1ylkK-s93U1TIKu_63yF0cVVzk",
  authDomain: "coachpage-saas.firebaseapp.com",
  projectId: "coachpage-saas",
  storageBucket: "coachpage-saas.firebasestorage.app",
  messagingSenderId: "347382953337",
  appId: "1:347382953337:web:0f182576ae9923ebb7eba8"
};

const COLLECTION = 'coachpage_tenants';
const tenantId = 'demo-tenant-id';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function clearCollection(collectionPath) {
  const q = query(collection(db, ...collectionPath.split('/')));
  const snapshot = await getDocs(q);
  const deletes = snapshot.docs.map(d => deleteDoc(d.ref));
  await Promise.all(deletes);
  console.log(`  Cleared ${deletes.length} docs from ${collectionPath}`);
}

async function seed() {
  console.log('Starting comprehensive seed...\n');

  // Clear existing data
  await clearCollection(`${COLLECTION}/${tenantId}/profile`);
  await clearCollection(`${COLLECTION}/${tenantId}/batches`);
  await clearCollection(`${COLLECTION}/${tenantId}/results`);
  await clearCollection(`${COLLECTION}/${tenantId}/faculty`);
  await clearCollection(`${COLLECTION}/${tenantId}/notices`);
  await clearCollection(`${COLLECTION}/${tenantId}/subjects`);
  await clearCollection(`${COLLECTION}/${tenantId}/gallery`);
  await clearCollection(`${COLLECTION}/${tenantId}/fees`);
  await clearCollection(`${COLLECTION}/${tenantId}/testimonials`);
  await clearCollection(`${COLLECTION}/${tenantId}/enquiries`);

  // Tenant root
  await setDoc(doc(db, COLLECTION, tenantId), {
    tenant_slug: "demo-institute",
    status: "active",
    product: "coachpage",
    plan: "professional",
    created_at: new Date(),
  });
  console.log('  Tenant root document created');

  // Profile
  await setDoc(doc(db, COLLECTION, tenantId, "profile", "main"), {
    institute_name: "Bright Star Academy",
    tagline: "Aurangabad's Most Trusted NEET/JEE Coaching Since 2012",
    logo_url: "https://via.placeholder.com/200x200?text=BSA+Logo",
    banner_image_url: "https://images.unsplash.com/photo-1523050853063-bd80e295ce7f?auto=format&fit=crop&q=80",
    institute_type: "NEET/JEE",
    established_year: 2012,
    total_students_trained: 2400,
    about: "Bright Star Academy has been producing top NEET and JEE rankers from Aurangabad for over a decade. Our mission is to provide quality education at affordable prices with dedicated faculty and personalized attention.",
    achievements: [
      "AIR 142 in NEET 2024 - Ravi Deshmukh",
      "85% selection rate in MHT-CET 2024",
      "500+ selections in NEET 2024",
      "120+ selections in JEE Main 2024"
    ],
    address: "N-6 CIDCO, Chh. Sambhaji Nagar, Maharashtra 431003",
    map_embed_url: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d15007.472718105574!2d75.361994!3d19.880496!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bdb986f32e29329%3A0x6b801a2d6a782a93!2sCIDCO%2C%20Aurangabad%2C%20Maharashtra!5e0!3m2!1sen!2sin!4v1716890000000!5m2!1sen!2sin",
    phone: "+91 240 234 0000",
    whatsapp_number: "+91 93700 00000",
    email: "info@brightstaracademy.in",
    website: "www.brightstaracademy.in",
    updated_at: new Date(),
  });
  console.log('  Profile seeded');

  // Batches
  const batches = [
    { batch_name: "NEET 2026 - Morning Batch", course_type: "NEET", standard: "11th + 12th Combined", subjects: ["Physics", "Chemistry", "Biology"], start_date: "2026-06-15", timing: "6:30 AM - 9:00 AM", total_seats: 40, seats_filled: 28, status: "admissions_open", highlight: true, order: 1 },
    { batch_name: "JEE Main 2026 - Evening Batch", course_type: "JEE", standard: "12th + Dropper", subjects: ["Physics", "Chemistry", "Mathematics"], start_date: "2026-07-01", timing: "4:00 PM - 6:30 PM", total_seats: 35, seats_filled: 20, status: "admissions_open", highlight: true, order: 2 },
    { batch_name: "Foundation 11th", course_type: "Foundation", standard: "11th", subjects: ["Physics", "Chemistry", "Mathematics/Biology"], start_date: "2026-04-01", timing: "9:00 AM - 11:30 AM", total_seats: 50, seats_filled: 45, status: "ongoing", highlight: false, order: 3 },
    { batch_name: "MHT-CET Crash Course", course_type: "MHT-CET", standard: "12th + Dropper", subjects: ["Physics", "Chemistry", "Mathematics"], start_date: "2026-02-15", timing: "8:00 AM - 11:00 AM", total_seats: 60, seats_filled: 55, status: "ongoing", highlight: false, order: 4 },
  ];
  const batchesRef = collection(db, COLLECTION, tenantId, "batches");
  for (const b of batches) await addDoc(batchesRef, b);
  console.log(`  ${batches.length} batches seeded`);

  // Results
  const results = [
    { student_name: "Ravi Deshmukh", exam: "NEET 2024", rank: "AIR 142", score: 685, percentile: 99.97, year: 2024, photo_url: "", highlight: true, course: "NEET 2024", order: 1 },
    { student_name: "Priya Sharma", exam: "NEET 2024", rank: "AIR 312", score: 665, percentile: 99.93, year: 2024, photo_url: "", highlight: true, course: "NEET 2024", order: 2 },
    { student_name: "Akash Patil", exam: "JEE Main 2024", rank: "98.7 Percentile", score: 0, percentile: 98.7, year: 2024, photo_url: "", highlight: false, course: "JEE 2024", order: 3 },
    { student_name: "Sneha Kulkarni", exam: "MHT-CET 2024", rank: "99.2 Percentile", score: 0, percentile: 99.2, year: 2024, photo_url: "", highlight: true, course: "MHT-CET 2024", order: 4 },
    { student_name: "Rohan Jadhav", exam: "NEET 2024", rank: "AIR 890", score: 630, percentile: 99.7, year: 2024, photo_url: "", highlight: false, course: "NEET 2024", order: 5 },
    { student_name: "Anita Gaikwad", exam: "JEE Main 2024", rank: "96.5 Percentile", score: 0, percentile: 96.5, year: 2024, photo_url: "", highlight: false, course: "JEE 2024", order: 6 },
    { student_name: "Vikram Shinde", exam: "NEET 2023", rank: "AIR 256", score: 672, percentile: 99.95, year: 2023, photo_url: "", highlight: true, course: "NEET 2023", order: 7 },
    { student_name: "Pooja Desai", exam: "NEET 2023", rank: "AIR 445", score: 650, percentile: 99.88, year: 2023, photo_url: "", highlight: false, course: "NEET 2023", order: 8 },
  ];
  const resultsRef = collection(db, COLLECTION, tenantId, "results");
  for (const r of results) await addDoc(resultsRef, r);
  console.log(`  ${results.length} results seeded`);

  // Faculty
  const faculty = [
    { name: "Dr. Suresh Mehta", subject: "Physics", qualification: "Ph.D. Physics, IIT Bombay", experience: 15, photo_url: "", bio: "Former IIT professor with 15+ years of coaching experience. Known for simplifying complex physics concepts.", specialties: ["Mechanics", "Optics", "Electromagnetism"], order: 1 },
    { name: "Mrs. Kavita Joshi", subject: "Chemistry", qualification: "M.Sc. Chemistry, Pune University", experience: 12, photo_url: "", bio: "Expert in Organic and Inorganic Chemistry with a unique teaching methodology.", specialties: ["Organic Chemistry", "Inorganic Chemistry"], order: 2 },
    { name: "Mr. Rajesh Agrawal", subject: "Mathematics", qualification: "M.Tech, BITS Pilani", experience: 10, photo_url: "", bio: "Mathematics wizard who has produced 50+ JEE Advanced qualifiers.", specialties: ["Calculus", "Algebra", "Coordinate Geometry"], order: 3 },
    { name: "Dr. Nita Kulkarni", subject: "Biology", qualification: "Ph.D. Botany, Mumbai University", experience: 8, photo_url: "", bio: "Passionate about making Biology engaging through practical examples and visual learning.", specialties: ["Zoology", "Botany", "Human Physiology"], order: 4 },
  ];
  const facultyRef = collection(db, COLLECTION, tenantId, "faculty");
  for (const f of faculty) await addDoc(facultyRef, f);
  console.log(`  ${faculty.length} faculty seeded`);

  // Notices
  const notices = [
    { title: "NEET 2026 Batch Admissions Open!", content: "New batch starting from June 15, 2026. Limited seats available. Register now to get 10% early bird discount.", type: "admission", urgency: "high", start_date: "2026-05-01", end_date: "2026-06-30", show_on_website: true, order: 1 },
    { title: "Summer Crash Course for MHT-CET", content: "Intensive 3-month crash course starting April 15. Daily tests, previous year papers analysis, and doubt clearing sessions included.", type: "announcement", urgency: "medium", start_date: "2026-03-15", end_date: "2026-04-30", show_on_website: true, order: 2 },
    { title: "Holiday Notice - Eid", content: "The institute will remain closed on Eid day. Regular classes will resume the next day.", type: "holiday", urgency: "low", start_date: "2026-04-10", end_date: "2026-04-10", show_on_website: true, order: 3 },
    { title: "Weekly Test Results Declared", content: "Weekly test results for NEET Batch A are now available. Students can collect their scorecards from the office.", type: "exam", urgency: "medium", start_date: "2026-05-20", end_date: "2026-05-25", show_on_website: false, order: 4 },
  ];
  const noticesRef = collection(db, COLLECTION, tenantId, "notices");
  for (const n of notices) await addDoc(noticesRef, n);
  console.log(`  ${notices.length} notices seeded`);

  // Subjects
  const subjects = [
    { name: "NEET - Physics", course_type: "NEET", standard: "11th + 12th Combined", description: "Complete NEET Physics covering Mechanics, Thermodynamics, Optics, Electromagnetism, and Modern Physics.", topics: ["Mechanics", "Thermodynamics", "Optics", "Electromagnetism", "Modern Physics"], duration_months: 24, order: 1 },
    { name: "NEET - Chemistry", course_type: "NEET", standard: "11th + 12th Combined", description: "Comprehensive Chemistry course with equal focus on Physical, Organic, and Inorganic Chemistry.", topics: ["Physical Chemistry", "Organic Chemistry", "Inorganic Chemistry"], duration_months: 24, order: 2 },
    { name: "NEET - Biology", course_type: "NEET", standard: "11th + 12th Combined", description: "Detailed Biology covering Botany and Zoology with NCERT-based approach and additional reference material.", topics: ["Botany", "Zoology", "Human Physiology", "Genetics", "Ecology"], duration_months: 24, order: 3 },
    { name: "JEE - Mathematics", course_type: "JEE", standard: "12th + Dropper", description: "Advanced Mathematics for JEE Main and Advanced covering all topics with problem-solving approach.", topics: ["Calculus", "Algebra", "Coordinate Geometry", "Trigonometry", "Probability"], duration_months: 18, order: 4 },
  ];
  const subjectsRef = collection(db, COLLECTION, tenantId, "subjects");
  for (const s of subjects) await addDoc(subjectsRef, s);
  console.log(`  ${subjects.length} subjects seeded`);

  // Gallery
  const gallery = [
    { image_url: "https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&q=80&w=800", caption: "Modern Classroom with Smart Boards", category: "classroom", order: 1 },
    { image_url: "https://images.unsplash.com/photo-1523050854055-165695f9a597?auto=format&fit=crop&q=80&w=800", caption: "Students Celebrating NEET Results", category: "result_celebration", order: 2 },
    { image_url: "https://images.unsplash.com/photo-1562774053-701939374585?auto=format&fit=crop&q=80&w=800", caption: "Campus View - Main Building", category: "facility", order: 3 },
    { image_url: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&q=80&w=800", caption: "Interactive Teaching Session", category: "classroom", order: 4 },
    { image_url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&q=80&w=800", caption: "Annual Day Celebration 2024", category: "event", order: 5 },
    { image_url: "https://images.unsplash.com/photo-1577896851231-70ef18881754?auto=format&fit=crop&q=80&w=800", caption: "Library and Study Hall", category: "facility", order: 6 },
  ];
  const galleryRef = collection(db, COLLECTION, tenantId, "gallery");
  for (const g of gallery) await addDoc(galleryRef, g);
  console.log(`  ${gallery.length} gallery images seeded`);

  // Fees
  const fees = [
    { course_name: "NEET 2026 (2-Year Programme)", fee_type: "monthly", amount: 4500, total_programme_fee: 90000, includes: ["Study Material", "Weekly Tests", "Doubt Sessions", "Performance Reports"], excludes: ["Registration Fee", "Hostel"], scholarship_available: true, scholarship_note: "Up to 100% scholarship based on entrance test", show_on_website: true, order: 1 },
    { course_name: "JEE Main 2026 (1-Year Programme)", fee_type: "monthly", amount: 5000, total_programme_fee: 60000, includes: ["Study Material", "Daily Tests", "Doubt Sessions", "Mock Exams"], excludes: ["Registration Fee", "Hostel"], scholarship_available: true, scholarship_note: "Up to 50% scholarship for JEE qualifiers", show_on_website: true, order: 2 },
    { course_name: "Foundation 11th (2-Year Programme)", fee_type: "monthly", amount: 3500, total_programme_fee: 70000, includes: ["Study Material", "Weekly Tests", "Parent Meetings"], excludes: ["Registration Fee"], scholarship_available: false, scholarship_note: "", show_on_website: true, order: 3 },
    { course_name: "MHT-CET Crash Course", fee_type: "one-time", amount: 15000, total_programme_fee: 15000, includes: ["Crash Course Material", "Daily Tests", "Previous Year Papers"], excludes: ["Hostel"], scholarship_available: false, scholarship_note: "", show_on_website: true, order: 4 },
  ];
  const feesRef = collection(db, COLLECTION, tenantId, "fees");
  for (const f of fees) await addDoc(feesRef, f);
  console.log(`  ${fees.length} fee entries seeded`);

  // Testimonials
  const testimonials = [
    { student_name: "Ravi Deshmukh", standard: "NEET 2024 Batch", photo_url: "", text: "Bright Star Academy changed my life. The faculty's dedication and the structured study plan helped me achieve AIR 142 in NEET. I am forever grateful!", rating: 5, published: true },
    { student_name: "Priya Sharma", standard: "NEET 2024 Batch", photo_url: "", text: "The doubt clearing sessions were incredibly helpful. Teachers were always available and the test series was on par with actual NEET difficulty.", rating: 5, published: true },
    { student_name: "Akash Patil", standard: "JEE 2024 Batch", photo_url: "", text: "Best coaching in Aurangabad for JEE preparation. The problem-solving approach and regular mock tests built my confidence.", rating: 4, published: true },
    { student_name: "Parent of Sneha Kulkarni", standard: "MHT-CET 2024", photo_url: "", text: "As a parent, I appreciated the regular progress reports and parent-teacher meetings. The institute truly cares about each student.", rating: 5, published: true },
  ];
  const testimonialsRef = collection(db, COLLECTION, tenantId, "testimonials");
  for (const t of testimonials) await addDoc(testimonialsRef, t);
  console.log(`  ${testimonials.length} testimonials seeded`);

  // YouTube Videos (single doc with array)
  await setDoc(doc(db, COLLECTION, tenantId, "youtube_videos", "main"), {
    videos: [
      { title: "Bright Star Academy - Virtual Tour", youtube_id: "dQw4w9WgXcQ", thumbnail_url: "https://img.youtube.com/vi/dQw4w9WgXcQ/mqdefault.jpg", order: 1 },
      { title: "NEET 2024 - Topper Interview: Ravi Deshmukh (AIR 142)", youtube_id: "jNQXAC9IVRw", thumbnail_url: "https://img.youtube.com/vi/jNQXAC9IVRw/mqdefault.jpg", order: 2 },
      { title: "Physics: How to Crack NEET in 6 Months", youtube_id: "y6120QOlsfU", thumbnail_url: "https://img.youtube.com/vi/y6120QOlsfU/mqdefault.jpg", order: 3 },
    ],
    show_on_website: true,
    updated_at: new Date(),
  });
  console.log('  YouTube videos seeded');

  // Enquiries
  const enquiries = [
    { student_name: "Amit Kulkarni", phone: "+91 98765 43210", email: "amit@example.com", standard: "12th", interested_in: "NEET 2026", source: "website", status: "new", notes: "", follow_up_date: "2026-05-30", created_at: new Date(Date.now() - 86400000) },
    { student_name: "Meena Desai", phone: "+91 98765 43211", email: "meena@example.com", standard: "Dropper", interested_in: "JEE Main 2026", source: "walk-in", status: "contacted", notes: "Interested in scholarship test", follow_up_date: "2026-06-01", created_at: new Date(Date.now() - 172800000) },
    { student_name: "Sahil Patil", phone: "+91 98765 43212", email: "sahil@example.com", standard: "11th", interested_in: "Foundation 11th", source: "referral", status: "admitted", notes: "Admitted to Foundation batch", follow_up_date: "", created_at: new Date(Date.now() - 259200000) },
    { student_name: "Kavita Shinde", phone: "+91 98765 43213", email: "", standard: "12th", interested_in: "MHT-CET Crash Course", source: "website", status: "new", notes: "", follow_up_date: "2026-05-29", created_at: new Date(Date.now() - 3600000) },
  ];
  const enquiriesRef = collection(db, COLLECTION, tenantId, "enquiries");
  for (const e of enquiries) await addDoc(enquiriesRef, e);
  console.log(`  ${enquiries.length} enquiries seeded`);

  console.log('\nSeed completed successfully! All data is now in Firestore.');
  console.log('\nLogin with: Academy@gmail.com / 12345678');
  console.log('Dashboard: http://localhost:3000/coach-admin');
}

seed().catch(err => {
  console.error('Seed failed:', err);
  process.exit(1);
});
