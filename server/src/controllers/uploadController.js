//post - /api/upload

export const uploadImages = (req,res)=>{
  if(!req.files ||req.files.length == 0){
    return res.status(400).json({message: 'No images uploaded'});
  }

  const images = req.files.map((file) => ({
    url: file.path,
    public_id: file.filename,
  })
  )

res.status(200).json({images});

}