const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const sauceRouter = require('./routes/sauce.route');
const path = require("path")

//const formidable = require("express-formidable");

const app = express();
//Add headers
var corsOptions = {
  origin: 'http://localhost:4200',
  optionsSuccessStatus: 200
}
app.use(cors(corsOptions));




//app.options("*", cors());
//app.use(formidable());

// parse requests of content-type - application/json
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
// parse requests of content-type - application/x-www-form-urlencoded
//app.use(bodyParser.urlencoded({ extended: true }));

app.use((req, res, next) =>{
  console.log("requete: " +req.body);
  next();
});
const db = require("./models");
const Role = db.role;

//db.mongoose.connect(`mongodb://${dbConfig.HOST}:${dbConfig.PORT}/${dbConfig.DB}`, {
db.mongoose.connect(`mongodb+srv://admin:admin@sopekockodb-4scil.gcp.mongodb.net/bdpeko?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
})
.catch(err => {
console.error("Connection error", err);
  process.exit();
});

function initial() {
    Role.estimatedDocumentCount((err, count) => {
      if (!err && count === 0) {
        new Role({
          name: "user"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added 'user' to roles collection");
        });
  
        new Role({
          name: "admin"
        }).save(err => {
          if (err) {
            console.log("error", err);
          }
  
          console.log("added 'admin' to roles collection");
        });
      }
    });
}
 
// routes
require('./routes/auth.routes')(app);
require('./routes/user.routes')(app);
app.use("/api/sauces", sauceRouter);

// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to so Pekocko API." });
});

// set port, listen for requests
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});