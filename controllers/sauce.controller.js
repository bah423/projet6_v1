const config = require("../config/auth.config");
const db = require("../models");
const multer = require('multer');
const { sauce } = require("../models");
const Sauce = db.sauce;


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'public/images');
  },

  filename: (req, file, cb) => {
      cb(null, file.originalname)
  }
});

const imageFileFilter = (req, file, cb) => {
  if(!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return cb(new Error('You can upload only image files!'), false);
  }
  cb(null, true);
};


const upload = multer({ storage: storage, fileFilter: imageFileFilter});

exports.uploadImage = upload.single('image')

exports.addSauce = (req, res) => {
  console.log(req.body.sauce);
  console.log(req.file)
  const sauce = JSON.parse(req.body.sauce) ;
  sauce.imageUrl = "http://localhost:3000/images/"+req.file.originalname;
  sauce.likes = 0;
  sauce.dislikes = 0;
  Sauce.create(sauce)
      .then(() => res.status(201).json({message: 'Objet enregistré !'}))
      .catch(error => console.log(error));
};


exports.updateSauce = (req, res,next) => {
  let sauce = req.body;
  if(req.file){
      sauce = JSON.parse(req.body.sauce) ;
      sauce.imageUrl = "http://localhost:3000/images/"+req.file.originalname;
  }
  Sauce.findByIdAndUpdate(req.params.sauceId, {
      $set: sauce
  }, {new: true})
      .then((sauce) => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.status(201).json({message: 'Objet modifié !'})
      }).catch((err) => next(err));
}

exports.allSauces = (req, res,next) => {
  Sauce.find()
      .then((sauces) => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.json(sauces)
      }).catch((err) => next(err));
}

exports.deleteSauce = (req, res,next) => {
  Sauce.findOneAndDelete(req.params.sauceId)
      .then((sauce) => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.status(201).json({message: 'Objet supprimé !'})
      }).catch((err) => next(err));
}

exports.SauceById = (req, res,next) => {
  Sauce.findOne({_id :req.params.sauceId})
      .then((sauce) => {
          res.statusCode = 200;
          res.setHeader('Content-Type', 'application/json');
          res.status(201).json(sauce)
      }).catch((err) => next(err));
}
exports.likeSauce = (req, res, next) => {
    var userAlreadyLiked = false;
    var userAlreadyDisliked = false;
    console.log("mes req params" +req.body.userId);
    Sauce.findOne({_id :req.params.sauceId})
    .then((sauce) => {
        for (var i = 0; i < sauce.usersLiked.length; i++){
            if(sauce.usersLiked[i] == req.body.userId){
              userAlreadyLiked = true;  
            }
        }
        for (var i = 0; i < sauce.usersDisliked.length; i++){
            if(sauce.usersDisliked[i] == req.body.userId){
                userAlreadyDisliked = true;  
            }
        }
        if(req.body.like == 1){
            if(userAlreadyLiked == false)
            Sauce.update({_id: req.params.sauceId}, {likes: sauce.likes+1, $push: {usersLiked: req.body.userId}})
            .then((sauce) => {
                console.log("mes likes");
                res.setHeader('Content-Type', 'application/json');
                res.status(201).json({liked: true})
            }).catch((err) => next(err));
            else{
                res.setHeader('Content-Type', 'application/json');
                res.status(201).json({liked: false})  
            }
        }
        else if(req.body.like == -1){
            if(userAlreadyDisliked == false)
            Sauce.update({_id: req.params.sauceId}, {dislikes: sauce.dislikes+1, $push: {usersDisliked: req.body.userId}})
            .then((sauce) => {
                console.log("mes likes");
                res.setHeader('Content-Type', 'application/json');
                res.status(201).json({disliked: true})
            }).catch((err) => next(err));
            else{
                res.setHeader('Content-Type', 'application/json');
                res.status(201).json({disliked: false})  
            }
        }else{
            if(userAlreadyLiked == true)
            Sauce.update({_id: req.params.sauceId}, {likes: sauce.likes-1, $pop: {usersLiked: 1}})
            .then((sauce) => {
                console.log("mes likes");
                res.setHeader('Content-Type', 'application/json');
                res.status(201).json({liked: false})
            }).catch((err) => next(err));
            else if(userAlreadyDisliked == true){
                Sauce.update({_id: req.params.sauceId}, {dislikes: sauce.dislikes-1, $pop: {usersDisliked: 1}})
                .then((sauce) => {
                    console.log("mes likes");
                    res.setHeader('Content-Type', 'application/json');
                    res.status(201).json({disliked: true})
                }).catch((err) => next(err));
            }
        }
        
    }).catch((err) => next(err));
};
