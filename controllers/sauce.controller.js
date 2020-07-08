const config = require("../config/auth.config");
const db = require("../models");
const multer = require('multer');
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

