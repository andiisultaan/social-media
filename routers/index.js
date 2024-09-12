const Controller = require("../controllers/controller");
const router = require("express").Router();

router.get("/", Controller.renderHome);
router.get("/login", Controller.renderLogin);
router.post("/login", Controller.handleLogin);

//middleware

module.exports = router;
