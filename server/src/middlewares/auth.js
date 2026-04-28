import {ClerkExpressRequireAuth} from '@clerk/clerk-sdk-node';
import User from '../models/User.js';

export const protect = [
  
  //first, verify clerk token
  ClerkExpressRequireAuth(),

  //later, find user in db and attach to req.user
  async (req,res,next) =>{
    try{

      const clerkId = req.auth.userId;

      const user = await User.findOne({clerkId});

      if(!user){
        return res.status(404).json({message: 'User not found in DB!'});
      }

      req.user = user;
      next();
    }
    
    catch(err){
      next(err);
    }
  },

]