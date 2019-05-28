const express = require('express');
const { isLoggedIn } = require('../middlewares')
const router = express.Router();
const User = require('../models/User')
const parser = require('../configs/Cloudinary')
const Picture = require('../models/Picture')

router.get('/profile', isLoggedIn, (req, res, next) => {
  res.json({
    //secret: 42,
    user: req.user
  });
});

// This route finds the first user, takes the file from the request with the key 'picture' and save the 'pictureUrl'
router.post('/first-user/pictures', parser.single('picture'), (req, res, next) => {
  console.log("what the file >>>>>>>>>>> ", req.file);
  // console.log("what the body +++++++++++ ", req.body, "======================= ", req.data);
  
  // User.findOneAndUpdate({}, { pictureUrl: req.file.url })
  //   .then(() => {
  //     res.json({
  //       success: true,
  //       pictureUrl: req.file.url
  //     })
  //   })
  
  Picture.create( { imageURL: req.file.url }).then(result=>{
    console.log('saved pic',result)
    res.json({saved:result})
  }).catch(err=>console.error(err)) 
});


router.post('/updatePhoto', (req, res, next) => {
  console.log("the info when updated the picture................ ", req.body)
  Picture.findById(req.body.imageInfo._id)
  .then(thePic => {
    thePic.description = req.body.description
    thePic.save()
    .then(updatedPic => {
      res.json({thePhoto: updatedPic})
    })
    .catch(err => console.log(err))
  })
  .catch(err => console.log(err))
})



module.exports = router;
