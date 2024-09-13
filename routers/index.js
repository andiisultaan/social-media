const Controller = require("../controllers/controller");
const session = require("express-session");
const multer = require("multer");
const path = require("path");
const router = require("express").Router();

// Middleware to check if user is logged in
const isLogin = function (req, res, next) {
  if (!req.session.user) {
    const error = "Silahkan login terlebih dahulu!";
    return res.redirect(`/login?error=${error}`);
  }
  next();
};

// Configure Multer storage for profile pictures
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Set the destination to save files in the 'uploads' directory
    cb(null, path.join(__dirname, "../uploads"));
  },
  filename: function (req, file, cb) {
    // Name the file with the current timestamp + original extension
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

// Initialize Multer upload middleware
const upload = multer({
  storage: storage,
  limits: { fileSize: 2 * 1024 * 1024 }, // limit file size to 2MB
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error("Hanya file gambar yang diperbolehkan (jpg, jpeg, png)"));
    }
  },
});

// Initialize session middleware
router.use(
  session({
    secret: "rahasia",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

// Routes
router.get("/", (req, res) => {
  res.redirect("/home");
});

router.get("/home", Controller.renderHome);
router.get("/login", Controller.renderLogin);
router.post("/login", Controller.handleLogin);
router.get("/register", Controller.renderRegister);
router.post("/register", Controller.handleRegister);
router.get("/logout", Controller.handleLogout);

// Route untuk halaman profile user (hanya bisa diakses jika login)
router.get("/post/:id", isLogin, Controller.renderPostUser);
router.post("/post/:id", isLogin, Controller.handleComment);

// Profile route to handle profile picture upload
router.get("/profile", isLogin, Controller.renderProfile);
router.post(
  "/profile",
  isLogin,
  upload.single("profilePicture"), // Middleware for file upload
  Controller.handleProfile
);

router.get("/profile/delete/:PostId", isLogin, Controller.handleDeletePost);
router.get("/addPost", isLogin, Controller.renderPost);
router.post("/addPost", isLogin, Controller.handlePost);

router.get("/admin", isLogin, Controller.renderAdmin);

module.exports = router;
