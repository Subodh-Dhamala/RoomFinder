import { v2 as cloudinary } from 'cloudinary'
import dotenv from 'dotenv'
import { fileURLToPath } from 'node:url'

dotenv.config({ path: fileURLToPath(new URL('../.env', import.meta.url)) })

const requiredConfig = {
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
}

const missingConfig = Object.entries(requiredConfig)
  .filter(([, value]) => !value)
  .map(([key]) => key)

if (missingConfig.length > 0) {
  throw new Error(`Missing Cloudinary configuration: ${missingConfig.join(', ')}`)
}

cloudinary.config(requiredConfig)

export default cloudinary