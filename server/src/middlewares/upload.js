import cloudinary from '../config/cloudinary.js'
import {CloudinaryStorage} from 'multer-storage-cloudinary';
import multer from 'multer';


const storage = new CloudinaryStorage({
  cloudinary,
  params:{
    folder: 'roomfinder',
    allowed_formats: ['jpg', 'jpeg', 'png', 'webp'],
  }
});

const upload = multer({storage});

export default upload;