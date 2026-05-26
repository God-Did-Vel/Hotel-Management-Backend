import { v2 as cloudinary } from 'cloudinary';
declare let isCloudinaryConfigured: boolean;
export { cloudinary, isCloudinaryConfigured };
/**
 * Uploads a file buffer to Cloudinary.
 * Returns the secure URL of the uploaded image, or null if Cloudinary is not configured.
 */
export declare const uploadToCloudinary: (fileBuffer: Buffer, folder?: string) => Promise<string | null>;
//# sourceMappingURL=cloudinary.d.ts.map