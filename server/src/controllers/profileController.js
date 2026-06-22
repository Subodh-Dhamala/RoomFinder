import * as profileService from '../services/profile.service.js';

//get -api/profile
export const getProfile = async (req,res,next) =>{
  try{
    const result = await profileService.getProfile(req.user._id,req.user.role);
    res.json(result);
  }
  catch(error){
    next(error);
  }
}

//patch - /api/profile
export const updateProfile = async(req,res,next) =>{
  try{
    const updated = await profileService.updateProfile(req.user._id,req.body);
    res.json(updated);
  }
  catch(error){
    next(error);
  }
}

//patch -/api/profile/avatar
export const updateAvatar = async (req, res, next) => {
  try {
    const updated = await profileService.updateAvatar(req.user._id, req.body.avatar)
    res.json(updated)
  } catch (error) {
    next(error)
  }
}

//get -api/profile/:id
export const getPublicProfile = async (req, res, next) => {
  try {
    const user = await profileService.getPublicProfile(req.params.id)
    res.json(user)
  } catch (error) {
    next(error)
  }
}