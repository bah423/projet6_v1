const mongoose = require("mongoose");

const Sauce = mongoose.model(
  "Sauce",
  new mongoose.Schema({ 
    name: String ,
    manufacturer: String ,
    description: String ,
    mainPepper: String ,
    imageUrl: String ,
    heat: Number ,
    likes: Number ,
    dislikes: Number ,
    usersLiked: [String] ,
    usersDisliked: [String] 
  })
);
module.exports = Sauce;