import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

process.env.DOTENV_CONFIG_PATH = '../../backend/.env';
dotenv.config();
console.log(process.env.CLOUD_NAME);

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.API_KEY,
  api_secret: process.env.API_SECRET,
});

export default cloudinary;

const opts = {
    overwrite: true,
    invalidate: true,
    resource_type: "auto",
  };

  export function Cloudinaryupload(images) {
    console.log(images);
    return new Promise((resolve, reject) => {
      const uploadPromises = [];
  
      for (const image of images) {
        uploadPromises.push(
          new Promise((resolve, reject) => {
            cloudinary.uploader.upload(image, (error, result) => {
              if (result && result.secure_url) {
                resolve(result);
              } else {
                reject(error);
              }
            });
          })
        );
      }
  
      Promise.all(uploadPromises)
        .then(resolve)
        .catch(reject);
    });
  }