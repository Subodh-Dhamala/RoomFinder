import {v2 as cloudinary} from 'cloudinary';
import {CloudinaryStorage} from 'multer-storage-cloudinary';
import multer from 'multer';

cloudinary.config({
  cloudname: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

const storage = new CloudinaryStorage({
  cloudinary,
  params:{
    folder: 'roomfinder',
    allowed_formats: ['jpg','jpeg','png'],
  }
});

const upload = multer({storage});

export default upload;