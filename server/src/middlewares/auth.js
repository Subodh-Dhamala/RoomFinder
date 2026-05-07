import { ClerkExpressRequireAuth } from '@clerk/clerk-sdk-node';
import User from '../models/User.js';

export const protect = [

  // first, verify clerk token
  (req, res, next) => {
    ClerkExpressRequireAuth()(req, res, (err) => {
      if (err) {
        return res.status(401).json({ message: 'Unauthorized' })
      }
      next()
    })
  },

  // later, find user in db and attach to req.user
  async (req, res, next) => {
    try {
      const clerkId = req.auth.userId;

      const user = await User.findOne({ clerkId });

      if (!user) {
        return res.status(404).json({ message: 'User not found in DB!' });
      }

      req.user = user;
      next();
    } catch (err) {
      next(err);
    }
  },

]