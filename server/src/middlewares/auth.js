import { ClerkExpressRequireAuth, clerkClient } from '@clerk/clerk-sdk-node';
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
        const clerkUser = await clerkClient.users.getUser(clerkId);
        const email = clerkUser.primaryEmailAddress?.emailAddress;

        if (!email) {
          return res.status(400).json({ message: 'Your Clerk account has no email address' });
        }

        const name = [clerkUser.firstName, clerkUser.lastName]
          .filter(Boolean)
          .join(' ')
          .trim();

        const createdUser = await User.findOneAndUpdate(
          { clerkId },
          {
            clerkId,
            email,
            name,
            avatar: clerkUser.imageUrl ? { url: clerkUser.imageUrl } : undefined,
          },
          { upsert: true, new: true, setDefaultsOnInsert: true }
        );

        req.user = createdUser;
        return next();
      }

      req.user = user;
      next();
    } catch (err) {
      next(err);
    }
  },

]