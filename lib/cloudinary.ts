// Cloudinary configuration and upload utilities

export interface CloudinaryUploadResult {
  secure_url: string;
  public_id: string;
  format: string;
  bytes: number;
  width: number;
  height: number;
}

export async function uploadToCloudinary(file: File): Promise<CloudinaryUploadResult> {
  // Create FormData for Cloudinary upload
  const formData = new FormData();
  formData.append('file', file);
  formData.append('upload_preset', 'ml_default'); // You may need to configure this in Cloudinary
  formData.append('folder', 'projects');

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${process.env.CLOUDINARY_CLOUD_NAME}/image/upload`,
      {
        method: 'POST',
        body: formData,
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(`Cloudinary upload failed: ${error.message || 'Unknown error'}`);
    }

    const result = await response.json();
    return {
      secure_url: result.secure_url,
      public_id: result.public_id,
      format: result.format,
      bytes: result.bytes,
      width: result.width,
      height: result.height,
    };
  } catch {
    throw new Error('Failed to upload image to Cloudinary');
  }
}
