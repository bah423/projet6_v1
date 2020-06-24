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

app.get("/", (req , res) => {
    res.json({message: "Bienvenue dans l'API sopecko!"});
});
const port = 3000;
app.listen(port, () => {
    console.log("notre server est à l'écoute sur le port: "+port);
});



