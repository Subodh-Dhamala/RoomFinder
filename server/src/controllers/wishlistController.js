import * as wishlistService from '../services/wishlist.service.js';

//post - /api/wishlist/:roomId
export const addToWishlist = async(req,res,next)=>{
  try{

    await wishlistService.addToWishlist(req.user._id,req.params.roomId);
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

    await wishlistService.removeFromWishlist(req.user._id,req.params.roomId);
    res.json({message: 'Room removed form the wishlist'});
  }
  catch(error){
    next(error);
  }
}


//get /api/wishlist
export const getWishlist = async(req,res,next)=>{
  try{
    const wishlist = await wishlistService.getWishlist(req.user._id);
    res.json(wishlist);
  }
  catch(error){
    next(error);
  }
}