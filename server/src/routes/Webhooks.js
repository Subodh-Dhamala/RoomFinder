import express, { application } from 'express';
import { clerkWebhook } from '../controllers/webhookController';

const router = express.Router();

//no auth middleware needed, clerk calls this directly
router.post('/clerk',express.raw({type:'application/json'}),clerkWebhook);

export default router;