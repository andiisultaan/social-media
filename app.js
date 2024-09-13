const express = require("express");
const router = require("./routers");
const path = require("path");
const app = express();
const session = require("express-session");
const port = 3000;

app.set("view engine", "ejs");
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use("/uploads", express.static(path.join(__dirname, "uploads")));
app.use(
  session({
    secret: "rahasiaa",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: false,
      sameSite: true,
    },
  })
);

app.use((req, res, next) => {
  app.locals = {
    user: req.session.user,
  };

  next();
});

app.use(router);

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
