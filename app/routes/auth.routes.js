

module.exports = app => {

  const { verifySignUp } = require("../middleware");
  const controller = require("../controllers/test.controller");
var router = require("express").Router();
  router.use(function(req, res, next) {
    res.header(
      "Access-Control-Allow-Headers",
      "x-access-token, Origin, Content-Type, Accept"
    );
    next();
  });

  router.post("/auth/signup",[verifySignUp.checkDuplicateUtilisateurOrmail],controller.signup);

  router.post("/auth/signin", controller.signin);

    app.use('/api/test', router);
};
