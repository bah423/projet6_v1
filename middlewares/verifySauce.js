const db = require("../models");
const Sauce = db.sauce;

//Vérification si la sauce est présente dans la base de données
checkDuplicateSauceName = (req, res, next) => {
    // SauceName
    console.log("requete: "+req.fields);
    Sauce.findOne({
      name: req.body.name
    }).exec((err, sauce) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (sauce) {
        res.status(400).send({ message: "Failed! sauce already exist !" });
        return;
      }

      next();
    });
};

checkImageUrlExisted = (req, res, next) => {
    Sauce.findOne({
        imageUrl: req.body.imageUrl
      }).exec((err, sauce) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }
  
        if (sauce) {
          res.status(400).send({ message: "Failed! image sauce already exist !" });
          return;
        }
  
        next();
      });
};

const verifySauce = {
    checkDuplicateSauceName,
    checkImageUrlExisted
};

module.exports = verifySauce;