import mongoose from 'mongoose';
import Room from '../models/Room.js';

//post - /api/listings
export const createListing = async (req,res,next) =>{
  try{
    const {title, description, price, location, type ,images} = req.body;
    
    const room = await Room.create(
      {
        title, 
        description,
        price,
        location,
        type,
        images,
        landlordId: req.user._id,
      }
    );

    res.status(201).json(room);

  }

  catch(error){
    next(error);
  }
}


//get - /api/listings
export const getAllListings = async(req,res,next)=>{
  try{
    const rooms = await Room.find({isAvailable:true});
    res.json(rooms);
  }
  catch(error){
    next(error);
  }
}

//get -/api/listings/:id
export const getOneListing = async(req,res,next)=>{
  try{

    if(!mongoose.Types.ObjectId.isValid(req.params.id)){
      return res.status(400).json({message: 'Invalid ID'})  
    }

    const room = await Room.findById(req.params.id);

    if(!room){
      return res.status(404).json({message: 'Room not found'});
    }

    res.json(room);
  }
  catch(error){
    next(error);
  }
  }


//patch - /api/listings/:id
export const updateListing = async(req,res,next)=>{
  try{

    if(!mongoose.Types.ObjectId.isValid(req.params.id)){
      return res.status(400).json({message:'Invalid Id'})
    }

    const room = await Room.findById(req.params.id);
     
    if(!room){
      return res.status(404).json({message:'Room not found'});
    }

  if (!room.landlordId.equals(req.user._id)) {
    return res.status(403).json({ message: 'Not your listing' })
  }
  
  const allowedFields = ['title','description','price','location','type','images','isAvailable'];

  const updates = {};

  allowedFields.forEach((field)=>{
    if(req.body[field] !== undefined) updates[field] = req.body[field]
  });

  const updated = await Room.findByIdAndUpdate(req.params.id, updates, {
    new:true,
  });

  res.json(updated);

  }
  catch(error){
    next(error);
  }
}


//delete - /api/listings:id

export const deleteListing = async(req,res,next) =>{
  try{
    
    if(!mongoose.Types.ObjectId.isValid(req.params.id)){
      return res.status(400).json({message: 'Invalid Id'});
    }

    const room = await Room.findById(req.params.id);

    if(!room){
      return res.status(404).json({message: 'Room not found!'});
    }

    if(room.landlordId.toString() !== req.user._id.toString()){
      return res.status(403).json({
        message: 'Not your listing'
      });
    }

    await room.deleteOne();

    res.json({message: 'Listing deleted!'});

  }
  catch(error){
    next(error);
  }
}
