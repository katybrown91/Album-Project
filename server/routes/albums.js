const express = require('express');
const passport = require('passport');
const router = express.Router();
const axios = require('axios');
const Album = require('../models/Album')
const { isLoggedIn } = require('../middlewares')


router.post('/create', (req, res, next) => {
  

  if(req.body.titleInput === "") {
    User.findById(req.user._id).populate("albums")
    .then(user => {
      data = {
        pageTitle: `${userFromDb.username}'s albums`,
        useralbums: userFromDb.albums,
        errorMessage: "Fields with * are required"
      };
      
      res.render('/client/src/components/pages/Albums/album/useralbum', data);
    })
    .catch(err => {
      next(err);
    });
  } else {
    const newPlaylist = new Playlist({
      userId: { type: mongoose.Schema.Types.ObjectId, ref:'User' },
  title: String,
  imageURL : String,
  description: String
},
{
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at'
  }
    });

    newAlbum.save()
    .then(newAlbum => {
      req.user.albums.push(newAlbum._id);
      req.user.save()
      .then(() => {
        res.redirect(`/user/albums/${req.user.username}`);
      })
      .catch(err => {
        next(err);
      });
    })
    .catch(err =>  {
      next(err);
    });
  }
});


router.get('/details/:albumId', (req, res, next) => {
  Album.findById(req.params.albumId)
  .then(album => {
    data = {
      album: album,
      pageTitle: album.title
    };
    res.render('album/details', data);
  })
  .catch(err => {
    next(err);
  });
});



// router.delete('/delete/:albumId', (req, res, next) => {
//   req.user.albums.pull(req.params.albumId);
//   req.user.save()
//   .then(updatedUser => {
//     Album.findByIdAndRemove(req.params.albumId)
//     .then(() => {
//       res.redirect(`/user/albums/${req.user.username}`);
//     })
//     .catch(err => {
//       next(err);
//     });
//   })
//   .catch(err => {
//     next(err);
//   });
// });

router.delete('/delete/:albumId', (req, res, next) => {
  Album.findByIdAndRemove(req.params.albumId)
    .then((result) => {
      //res.redirect(`/user/albums/${req.user.username}`);
      res.json(result)
    })
    .catch(err => {
      next(err);
    });
})
router.get("/viewAlbums", isLoggedIn, (req, res, next) =>{
  //console.log("view albums", req.user)
  Album.find({userId:req.user._id}).then(Albums=>{
    res.json({Albums})
  })
})


router.get("/viewAlbumDetails/:id", isLoggedIn, (req, res, next) =>{
  //console.log("view albums", req.user)
  Album.findById(req.params.id).populate('pictures').then(AlbumDetails=>{
    res.json({AlbumDetails})
  })
})

//http://localhost:5000/api/newalbum

router.post('/newalbum', isLoggedIn, (req, res, next) => {

  let album = req.body;
  album.userId = req.user._id;  //attach user id to album 
  Album.create(album).then(response=>{
    res.json({response:response})
  })
})

/*router.delete('/albums/:id', isLoggedIn, function(req, res, next) => {

  Album.findByIdAndRemove({_id: req.params.id}).then(function(Album))
  res.send(Album)
  
  })  */

  /*router.post("/delete-album/:id", isLoggedIn, (req, res, next)=>{
    console.log("Bye", req.session.currentUser, req.params, req.params.id)
    Album.findById(req.session.Album._id).then(Album=>{ //found myself and my friendList 
      let index = Album.indexOf(req.params.id)
      Album.splice(index,1)
      Album.save(function(err){
        if(!err){
          res.redirect('back')
        }
      })
    }).catch(err=>console.log(err))
  }); */

  


module.exports = router


