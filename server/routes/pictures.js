const express = require('express');
const Picture = require('../models/Picture');
const Album = require('../models/Album');

const router = express.Router();

// Route to get all pictures
router.get('/', (req, res, next) => {
  Picture.find()
    .then(pictures => {
      res.json(pictures);
    })
    .catch(err => next(err))
});

// Route to add a picture
router.post('/', (req, res, next) => {
  let {description } = req.body
  console.log("the info prior to saving the picture ------------ ", req.body);
  Picture.create({description, comment })
    .then(picture => {
      console.log("show me the picture >>>>>>>>> ", picture);
      res.json({
        success: true,
        picture
      });
    })
    .catch(err => next(err))
});


// save new picture and then add it to the album it belongs to
router.post('/getPics/:albumId', (req, res, next) => {
  console.log("the info prior to adding the picture to album ------------ ", req.body);
    Album.findById(req.params.albumId).populate('pictures')
    .then(theAlbum => {
      console.log("show me the album >>>>>>>>> ", theAlbum);
      res.json({
        success: true,
        theAlbum
      });
    })
    .catch(err => {
      res.status(400).json(err)
        })
});


router.delete('/deletePic/:pictureId', (req, res, next) => {
  console.log("IN HERER", req.params )
  Picture.findByIdAndRemove(req.params.pictureId)
    .then((result) => {
      res.json(result)
    })
    .catch(err => {
      next(err);
    });
})

module.exports = router;
