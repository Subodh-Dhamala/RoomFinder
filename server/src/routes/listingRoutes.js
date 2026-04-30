import express from 'express';

import{
  createListing,
  getAllListings,
  getOneListing,
  updateListing,
  deleteListing,
} from '../controllers/listingController.js';

import {protect} from '../middlewares/auth.js';
import requireRole from '../middlewares/requireRole.js';

const router = express.Router();

router.post('/',protect,requireRole('landlord'),createListing);
router.get('/',getAllListings);
router.get('/:id',getOneListing);
router.patch('/:id',protect, requireRole('landlord'), updateListing);
router.delete('/:id',protect,requireRole('landlord'),deleteListing);

export default router;