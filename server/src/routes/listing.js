import express from 'express';

import{
  createListing,
  getAllListings,
  getOneListing,
  updateListing,
  deleteListing,
  getMyListings
} from '../controllers/listingController.js';

import {protect} from '../middlewares/auth.js';
import requireRole from '../middlewares/requireRole.js';

const router = express.Router();

router.post('/',protect,requireRole('landlord'),createListing);
router.get('/',getAllListings);
router.get('/:id',getOneListing);
router.patch('/:id',protect, requireRole('landlord'), updateListing);
router.delete('/:id',protect,requireRole('landlord'),deleteListing);
router.get('/mine', protect, requireRole('landlord'), getMyListings) 

export default router;