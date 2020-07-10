const  verifySauce  = require("../middlewares/verifySauce");
const controller = require("../controllers/sauce.controller");
const express = require('express');
const sauceRouter = express.Router();

/*
module.exports = function(app) {
  app.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers", "*",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  app.post(
    "/api/sauces",
    [
      //verifySauce.checkDuplicateSauceName,
      //verifySauce.checkImageUrlExisted
    ]
    ,
    controller.addSauce
  );
};
*/



    sauceRouter.route('/')
    .post(controller.uploadImage ,controller.addSauce)
    .get(controller.allSauces)
    
     sauceRouter
    .get("/:sauceId", controller.SauceById)
    .put("/:sauceId", controller.uploadImage , controller.updateSauce)
    .delete("/:sauceId",controller.deleteSauce)
    .post("/:sauceId/like", controller.likeDislike)



module.exports = sauceRouter;

