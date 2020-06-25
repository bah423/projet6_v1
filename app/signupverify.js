const db = require("../models");
const Roles = db.role;
const User = db.user;

checkDuplicateEmail = (req, res, next) =>{
    User.findOne({email: req.body.email}).exec((err, user) => {
        if(err){
            res.status(500).send({message: err});
            return;
        }
        if (user){
            res.status(400).send({message: "email est déjà enregistrée dans la base"});
        } 
    });
    next();
}
checkRoleExist = (req, res, next) =>{
    if(req.body.role){
        if(!ROLES.include(req.body.role)){
            res.status(400).send({message: "le role envoyé n'est pas authentique!"});
        }
    }
    next();
}
const signupverify = {checkDuplicateEmail, checkRoleExist};

module.exports = signupverify;
