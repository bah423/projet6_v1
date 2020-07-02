const config = require("../config/auth.config");
const db = require("../models");
const Sauce = db.sauce;

//var jwt = require("jsonwebtoken");

/*exports.addSauce = (req, res) => {

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
};*/
//mon petit code
exports.addSauce = (req, res, next) => {
  console.log("On veut ajouter une sauce");
  //delete req.body._id;
  console.log(req.body.name);
  console.log(req.body.manufacturer);
  console.log(req.body.imageUrl );
   const sauce = new Sauce({
      //...req.body
      sauceId: req.body.sauceId, 
      name: req.body.name,
      manufacturer:  req.body.manufacturer ,
      description: req.body.description ,
      imageUrl: req.body.imageUrl ,
      heat: req.body.heat ,
      /*mainPepper: req.body ,
      likes: req.body ,
      dislikes: number ,
      usersLiked: [string] ,
      usersDisliked: [string] */
  });
   
  sauce.save((error, sauce) => {
   
  })
    .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
    .catch(error => res.status(400).json({ error }));
};

/* expriration
exports.signup = (req, res) => {
  console.log("email: " + req.body.email);
  console.log("password: " + req.body.password);
  
  const user = new User({
    userId: req.body.userId,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 10)
  });

  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (req.body.role) {
      Role.find(
        {
          name: { $in: req.body.role}
        },
        (err, role) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          user.role = role.map(role => role._id);
          user.save(err => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }
          });
        }
      );
    }
    res.status(201).send({
      message: "User was registered successfully!"
    })
  });
};*/
