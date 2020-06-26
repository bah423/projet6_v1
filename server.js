const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

var optionsCors = {
    origin: "http://localhost:3001"
}
app.use(cors(optionsCors));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

const db = require("./models");
const { count } = require("console");
const role = db.role;
db.mongoose.connect("", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then (() =>{
    console.log("Connexion to MongoDB: Ok")
}).catch(err => {
   console.error("Connexion to MongoDB: Fail !", +err);
})

function initial (){
    role.estimatedDocumentCount((err, count) => {
        if(!err && count == 0){
            new role({name: "user"}).save(err =>{
                if(err){
                console.log("Save user failed !", err);
                }
                console.log("role user add");
            });
            new role({name: "admin"}).save(err =>{
                if(err){
                console.log("Save admin failed", err);
                }
                console.log("role admin add");
            });
        }
    });
}
app.get("/", (req , res) => {
    res.json({message: "Bienvenue dans l'API sopecko!"});
});
const port = 3000;
app.listen(port, () => {
    console.log("notre server est à l'écoute sur le port: "+port);
});



