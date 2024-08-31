import multer from "multer";


const storage = multer.memoryStorage();
export const cloudinary_upload = multer({
  storage: storage,
});
