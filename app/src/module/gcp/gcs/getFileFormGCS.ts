import { BUCKET_NAME, FILE_NAME, PROJECT_ID } from "@/constants";
import { Storage, File } from "@google-cloud/storage";

const bucketName = BUCKET_NAME;
const fileName = FILE_NAME;

/**
 * getFileFormGCS
 * @returns 
 */
export async function getFileFormGCS(): Promise<File> {
  const storage = new Storage({
    projectId: PROJECT_ID,
  });

  if (!bucketName || !fileName) {
    throw new Error('BUCKET_NAME and FILE_NAME must be set');
  }
  const bucket = storage.bucket(bucketName);
  const file = bucket.file(fileName);

  const [exists] = await file.exists();
  if (!exists) {
    throw new Error('File does not exist' + fileName);
  }

  return file;
}