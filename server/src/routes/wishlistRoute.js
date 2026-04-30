import express from 'express';
import {addToWishlist,removeFromWishlist,getWishlist} from '../controllers/wishlistController.js';
import {protect} from '../middlewares/auth.js';
import requireRole from '../middlewares/requireRole.js';

const router = express.Router();

router.post('/:roomId',protect,requireRole('tenant'),addToWishlist);
router.delete('/:roomId',protect,requireRole('tenant'),removeFromWishlist);
router.get('/',protect,requireRole('tenant'),getWishlist);

export default router;
