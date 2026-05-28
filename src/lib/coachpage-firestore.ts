import { 
  collection, 
  doc, 
  getDoc, 
  getDocs, 
  query, 
  where, 
  orderBy, 
  limit,
  addDoc,
  updateDoc,
  serverTimestamp,
  Timestamp
} from "firebase/firestore";
import { db } from "./firebase";

const COLLECTION = process.env.NEXT_PUBLIC_COACHPAGE_COLLECTION || "coachpage_tenants";

export async function getCoachTenantBySlug(slug: string) {
  const q = query(collection(db, COLLECTION), where("tenant_slug", "==", slug), limit(1));
  const querySnapshot = await getDocs(q);
  if (querySnapshot.empty) return null;
  const tenantDoc = querySnapshot.docs[0];
  return { id: tenantDoc.id, ...tenantDoc.data() };
}

export async function getTenantProfile(tenantId: string) {
  const docRef = doc(db, COLLECTION, tenantId, "profile", "main");
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    return docSnap.data();
  }
  return null;
}

export async function getTenantSubCollection(tenantId: string, subCollection: string, orderField = "order") {
  const q = query(
    collection(db, COLLECTION, tenantId, subCollection),
    orderBy(orderField, "asc")
  );
  const querySnapshot = await getDocs(q);
  return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

export async function submitEnquiry(tenantId: string, enquiryData: any) {
  const colRef = collection(db, COLLECTION, tenantId, "enquiries");
  return await addDoc(colRef, {
    ...enquiryData,
    status: "new",
    created_at: serverTimestamp(),
    whatsapp_sent: false
  });
}

export async function getTenantYoutubeVideos(tenantId: string) {
  const docRef = doc(db, COLLECTION, tenantId, "youtube_videos", "main");
  const docSnap = await getDoc(docRef);
  if (docSnap.exists()) {
    const data = docSnap.data();
    return data.show_on_website ? (data.videos || []) : [];
  }
  return [];
}
