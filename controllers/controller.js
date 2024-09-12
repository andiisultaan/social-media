const { User, Profile, Comment, Like, Post } = require("../models/index");
const bcrypt = require("bcryptjs");

class Controller {
  static async renderLogin(req, res) {
    try {
      res.render("login");
    } catch (error) {
      console.log(error);
      res.send(error.message);
    }
  }

  static async handleLogin(req, res) {
    try {
      const { username, password } = req.body;
      const user = await User.findOne({
        where: {
          username,
        },
      });

      if (!user) throw new Error("Invalid userame or password");

      const isValidPassword = bcrypt.compareSync(password, user.password);

      if (isValidPassword) {
        return res.redirect("/");
      } else {
        const error = "invalid username/password";
        return res.redirect(`/login?error=${error}`);
      }
    } catch (error) {
      console.log(error);
      res.send(error.message);
    }
  }

  static async renderHome(req, res) {
    try {
      res.render("home");
    } catch (error) {
      console.log(error);
      res.send(error.message);
    }
  }
}

module.exports = Controller;
