const  verifySauce  = require("../middlewares/verifySauce");
const controller = require("../controllers/sauce.controller");

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
      verifySauce.checkDuplicateSauceName,
      verifySauce.checkImageUrlExisted
    ],
    controller.addSauce
  );
};