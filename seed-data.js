const admin = require('firebase-admin');
const fs = require('fs');
const path = require('path');
const os = require('os');

const projectId = 'coachpage-saas';
const configPath = path.join(os.homedir(), '.config', 'configstore', 'firebase-tools.json');

let accessToken;
try {
  const config = JSON.parse(fs.readFileSync(configPath, 'utf8'));
  accessToken = config.tokens.access_token;
} catch (e) {
  console.error('Error reading Firebase CLI config:', e.message);
  process.exit(1);
}

admin.initializeApp({
  credential: {
    getAccessToken: () => Promise.resolve({
      expires_in: 3600,
      access_token: accessToken
    })
  },
  projectId: projectId
});

const db = admin.firestore();
const COLLECTION = 'coachpage_tenants';
const tenantId = 'demo-tenant-id';

async function seed() {
  console.log('Starting seed for project:', projectId);

  await db.collection(COLLECTION).doc(tenantId).set({
    tenant_slug: "demo-institute",
    status: "active",
    product: "coachpage",
    created_at: admin.firestore.FieldValue.serverTimestamp(),
    plan: "professional",
  });

  await db.collection(COLLECTION).doc(tenantId).collection('profile').doc('main').set({
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
  });

  const batches = [
    {
      batch_name: "NEET 2026 — Morning Batch",
      course_type: "NEET",
      standard: "11th + 12th Combined",
      subjects: ["Physics", "Chemistry", "Biology"],
      start_date: "2026-06-15",
      timing: "6:30 AM – 9:00 AM",
      total_seats: 40,
      seats_filled: 28,
      seats_available: 12,
      status: "admissions_open",
      highlight: true,
      order: 1
    }
  ];

  const batchesRef = db.collection(COLLECTION).doc(tenantId).collection('batches');
  const batchesSnapshot = await batchesRef.get();
  const batchPromises = batchesSnapshot.docs.map(doc => doc.ref.delete());
  await Promise.all(batchPromises);

  for (const batch of batches) {
    await batchesRef.add(batch);
  }

  console.log('Seed completed successfully!');
}

seed().catch(err => {
  console.error('Seed failed:', err);
  process.exit(1);
});
