const express = require('express');
const Picture = require('../models/Picture')

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

module.exports = router;
