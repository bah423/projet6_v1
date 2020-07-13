const  verifySauce  = require("../middlewares/verifySauce");
const controller = require("../controllers/sauce.controller");
const express = require('express');
const sauceRouter = express.Router();

    sauceRouter.route('/')
    .post(controller.uploadImage ,controller.addSauce)
    .get(controller.allSauces)
    
     sauceRouter
    .get("/:sauceId", controller.SauceById)
    .put("/:sauceId", controller.uploadImage , controller.updateSauce)
    .delete("/:sauceId",controller.deleteSauce)
    .post("/:sauceId/like", controller.likeSauce)



module.exports = sauceRouter;

