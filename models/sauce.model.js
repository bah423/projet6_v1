const mongoose = require("mongoose");

const Sauce = mongoose.model(
  "Sauce",
  new mongoose.Schema({
    userId: string, 
    name: string ,
    manufacturer: string ,
    description: string ,
    mainPepper: string ,
    imageUrl: string ,
    heat: number ,
    likes: number ,
    dislikes: number ,
    usersLiked: [string] ,
    usersDisliked: [string] 
  })
);

module.exports = Sauce;