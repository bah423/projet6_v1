const config = require("../config/auth.config");
const db = require("../models");
const Sauce = db.sauce;

//var jwt = require("jsonwebtoken");

exports.addSauce = (req, res) => {
  console.log("sauceName: ", req.body.name);
  const sauce = new Sauce({
    userId: req.body.userId, 
    name: req.body.name ,
    manufacturer: req.body.manufacturer ,
    description: req.body.description,
    mainPepper: req.body.mainPepper ,
    imageUrl: req.body.imageUrl ,
    heat: req.body.heat  
  });

  sauce.save((err, sauce) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }
    res.status(201).send({
      message: "Sauce was registered successfully!"
    })
  });
};
