import Wishlist from '../models/Wishlist.js';
import mongoose from 'mongoose';

//post - /api/wishlist/:roomId
export const addToWishlist = async(req,res,next)=>{
  try{

    if(!mongoose.Types.ObjectId.isValid(req.params.roomId)){
      return res.status(400).json({message: 'Invalid room Id'});
    }

    await Wishlist.create({
      tenantId: req.user._id,
      roomId: req.params.roomId,
    })

    res.status(201).json({message: 'Room saved to wishlist'});

  }
  catch(error){
    if(error.code == 11000){
      return res.status(400).json({message: 'Already in wishlist'});
    }
    next(error);
  }
}

//delete /api/wishlist/:roomId
export const removeFromWishlist = async(req,res,next)=>{
  try{
    if (!mongoose.Types.ObjectId.isValid(req.params.roomId)) {
      return res.status(400).json({ message: 'Invalid room ID' })
    }

    await Wishlist.findOneAndDelete({
      tenantId: req.user._id,
      roomId: req.params.roomId,
    })

    res.json({message: 'Room removed form the wishlist'});

  }
  catch(error){
    next(error);
  }
}


//get /api/wishlist
export const getWishlist = async(req,res,next)=>{
  try{
    const wishlist = await Wishlist.find({tenantId: req.user._id}).populate('roomId');

    res.json(wishlist);
  }
  catch(error){
    next(error);
  }
}