import { v2 as cloudinary } from "cloudinary";
import cloudinaryConfig from "./config.mjs";
import streamifier from "streamifier";


cloudinary.config(cloudinaryConfig);
// Function to upload stream to Cloudinary
export const uploadStream = (buffer, options) => {
  return new Promise((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      options,
      (error, result) => {
        if (result) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    );
    streamifier.createReadStream(buffer).pipe(stream);
  });
};
