import { v2 as cloudinary } from 'cloudinary';
import { CLOUDINARY } from '../constants/index.js';
import * as fs from 'node:fs/promises';

cloudinary.config({
  secure: true,
  cloud_name: CLOUDINARY.CLOUD_NAME,
  api_key: CLOUDINARY.API_KEY,
  api_secret: CLOUDINARY.API_SECRET,
});

export const uploadToCloudinary = async (filePath) => {
  const response = await cloudinary.uploader.upload(filePath);
  await fs.unlink(filePath);
  return response.secure_url;
};
