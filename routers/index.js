const Controller = require("../controllers/controller");
const router = require("express").Router();

//get and post register
router.get("/register", Controller.renderRegister);
router.post("/register", Controller.handleRegister);

//get and post login
router.get("/login", Controller.renderLogin);
router.post("/login", Controller.handleLogin);

router.use(function (req, res, next) {
  // if (req.session.userId) {
  //   next();
  // } else {
  //   res.redirect("/");
  // }
  console.log(req.session);
});
// get landing page
router.get("/", Controller.renderHome);

// router.get("/logout", Controller.handleLogout);

//middleware

// router.get("/user/:id/profile", checkSession, Controller.renderProfile);
module.exports = router;
