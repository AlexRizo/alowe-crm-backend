import cloudinary from "../helpers/cloudinary.js";
// import path from "path";

export const cloudinaryUpload = async (file) => {
    // const fileExtension = path.extname(file.name);
    // const mediaExt = ['.png', '.jpg', '.jpeg', '.gif', '.svg', '.webp', '.mp4', '.mov', '.avi', '.mp3'];

    const { secure_url } = await cloudinary.uploader.upload(file.tempFilePath, { resource_type: 'auto', folder: 'journal' });

    return secure_url;
};