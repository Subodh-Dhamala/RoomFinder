import * as roomService from '../services/room.service.js';

//post - /api/listings
export const createListing = async (req,res,next) =>{
  try{

    const room = await roomService.createRoom(req.body, req.user._id);
    res.status(201).json(room);

  }
  catch(error){
    next(error);
  }
}


//get - /api/listings
export const getAllListings = async (req, res, next) => {
  try {
    const result = await roomService.getAllRooms(req.query);
    res.json(result);
  } catch (error) {
    next(error);
  }
};

//get -/api/listings/:id
export const getOneListing = async(req,res,next)=>{
  try{

    const room = await roomService.getRoomById(req.params.id);
    res.json(room);
  }
  catch(error){
    next(error);
  }
  }


//patch - /api/listings/:id
export const updateListing = async(req,res,next)=>{
  try{
    const room = await roomService.updateRoom(req.params.id,req.body,req.user._id);
    res.json(room);
  }
  catch(error){
    next(error);
  }
}

//delete - /api/listings/:id
export const deleteListing = async(req,res,next) =>{
  try{

    await roomService.deleteRoom(req.params.id, req.user._id);
    res.json({message: 'Listing deleted!'});

  }
  catch(error){
    next(error);
  }
}
