const Controller = require("../controllers/controller");
const session = require("express-session");
const router = require("express").Router();

const isLogin = function (req, res, next) {
  if (!req.session.user) {
    const error = "Silahkan login terlebih dahulu!";
    return res.redirect(`/login?error=${error}`);
  }
  next();
};

// const isAdmin = function (req, res, next) {
//   if (req.session.user.role !== "admin") {
//     const error = "Silahkan login sebagai admin!";
//     return res.redirect(`/login?errors=${error}`);
//   }
//   next();
// };

router.use(
  session({
    secret: "rahasia",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

router.get("/", (req, res) => {
  res.redirect("/home");
});

router.get("/home", Controller.renderHome);
router.get("/login", Controller.renderLogin);
router.post("/login", Controller.handleLogin);
router.get("/register", Controller.renderRegister);
router.post("/register", Controller.handleRegister);
router.get("/logout", Controller.handleLogout);

// // Route untuk halaman profile user (hanya bisa diakses jika login)
router.get("/post/:id", isLogin, Controller.renderPostUser);
router.post("/post/:id", isLogin, Controller.handleComment);
// router.post("/post/:id", isLogin, Controller.handleLike);
router.get("/profile", isLogin, Controller.renderProfile);
router.post("/profile", isLogin, Controller.handleProfile);
router.get("/profile/delete/:PostId", isLogin, Controller.handleDeletePost);
router.get("/addPost", isLogin, Controller.renderPost);
router.post("/addPost", isLogin, Controller.handlePost);

router.get("/admin", isLogin, Controller.renderAdmin);

module.exports = router;
