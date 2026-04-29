//post - /api/upload

export const uploadImages = (req,res)=>{
  if(!req.files ||req.files.length == 0){
    return res.status(400).json({message: 'No images uploaded'});
  }

const urls = req.files.map(file.path);

res.status(200).json({urls});

}