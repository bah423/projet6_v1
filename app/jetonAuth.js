const jwt = require("jsonwebtoken");
const secretkey = {secret: "sopekocko-secretkey"};
const db = require("../models");
const { ROLES } = require("../models/authent");
const Roles = db.role;
const User = db.user;

checktoken = (req, res, next) => {
    let token = req.headers["x-access-token"];
    if(!token){
        res.status(403).send({message: "accès interdit(pas de token reçu)!"});
        return
    } 
    jwt.verify(token, secretkey, (err, decode)=>{
        if(err){
            res.status(401).send({message: err});
            return
        }
        req.userId = decode.userId; 
        next();
    });
}

checktadmin = (req, res, next) =>{
    User.findById(req.userId).exec((err, user) =>{
        if(err){
            res.status(500).send({messsage: err});
            return
        }
        ROLES.find({
           _id: user.role
        },(err, role) =>{
            if(err){
                res.status(500).send({message: err});
                return
            }
            if(role){
                
            }
        });

    });
}