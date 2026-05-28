import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from 'firebase/storage';
import { app } from './firebase';

const storage = getStorage(app);

const COLLECTION = process.env.NEXT_PUBLIC_COACHPAGE_COLLECTION || 'coachpage_tenants';

export async function uploadImage(tenantId: string, category: string, file: File): Promise<string> {
  const timestamp = Date.now();
  const fileName = `${category}/${timestamp}_${file.name}`;
  const storageRef = ref(storage, `${COLLECTION}/${tenantId}/${fileName}`);
  
  const snapshot = await uploadBytes(storageRef, file);
  const downloadURL = await getDownloadURL(snapshot.ref);
  
  return downloadURL;
}

export async function uploadLogo(tenantId: string, file: File): Promise<string> {
  return uploadImage(tenantId, 'logos', file);
}

export async function uploadBanner(tenantId: string, file: File): Promise<string> {
  return uploadImage(tenantId, 'banners', file);
}

export async function uploadGalleryImage(tenantId: string, file: File): Promise<string> {
  return uploadImage(tenantId, 'gallery', file);
}

export async function uploadFacultyPhoto(tenantId: string, file: File): Promise<string> {
  return uploadImage(tenantId, 'faculty', file);
}

export async function uploadResultPhoto(tenantId: string, file: File): Promise<string> {
  return uploadImage(tenantId, 'results', file);
}

export async function deleteImage(url: string): Promise<void> {
  try {
    const imageRef = ref(storage, url);
    await deleteObject(imageRef);
  } catch (error) {
    console.error('Error deleting image:', error);
  }
}

export function getImagePath(tenantId: string, category: string, fileName: string): string {
  return `${COLLECTION}/${tenantId}/${category}/${fileName}`;
}
