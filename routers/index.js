const Controller = require("../controllers/controller");
const router = require("express").Router();

// Route untuk halaman register (GET dan POST)
router.get("/register", Controller.renderRegister);
router.post("/register", Controller.handleRegister);

// Route untuk halaman login (GET dan POST)
router.get("/login", Controller.renderLogin);
router.post("/login", Controller.handleLogin);

// Middleware untuk cek apakah user sudah login
// router.use((req, res, next) => {
//   if (req.session.userId) {
//     // Jika user sudah login, lanjut ke halaman berikutnya
//     next();
//   } else {
//     // Jika user belum login, redirect ke halaman home (landing page)
//     res.redirect("/");
//   }
// });

// Route untuk halaman landing page (public, tanpa perlu login)
router.get("/", Controller.renderHome);

// Route untuk halaman profile user (hanya bisa diakses jika login)
router.get("/user/:id/profile", Controller.renderProfile);

// Route untuk handle logout
router.get("/logout", Controller.handleLogout);

module.exports = router;
