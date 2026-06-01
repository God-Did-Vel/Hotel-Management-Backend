import { v2 as cloudinary } from "cloudinary";
import dotenv from "dotenv";

dotenv.config();

let isCloudinaryConfigured = false;

if (
  (process.env.CLOUDINARY_CLOUD_NAME || process.env.CLOUDINARY_NAME) &&
  (process.env.CLOUDINARY_API_KEY || process.env.CLOUDINARY_KEY) &&
  (process.env.CLOUDINARY_API_SECRET || process.env.CLOUDINARY_SECRET)
) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
    api_key: process.env.CLOUDINARY_API_KEY!,
    api_secret: process.env.CLOUDINARY_API_SECRET!,
  });

  isCloudinaryConfigured = true;
  console.log("✅ Cloudinary initialized successfully");
} else {
  console.warn(
    "⚠️ Cloudinary environment variables are missing. Falling back to local storage.",
  );
}

export { cloudinary, isCloudinaryConfigured };

/**
 * Uploads a file buffer to Cloudinary.
 * Returns the secure URL of the uploaded image, or null if Cloudinary is not configured.
 */
export const uploadToCloudinary = async (
  fileBuffer: Buffer,
  folder: string = "hotel_management",
): Promise<string | null> => {
  if (!isCloudinaryConfigured) {
    return null;
  }

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: "auto",
      },
      (error, result) => {
        if (error) {
          console.error("Cloudinary upload error:", error);
          reject(error);
        } else {
          const url = result?.secure_url || null;
          if (url && url.includes("/upload/")) {
            resolve(url.replace("/upload/", "/upload/f_auto,q_auto/"));
          } else {
            resolve(url);
          }
        }
      },
    );
    uploadStream.end(fileBuffer);
  });
};
