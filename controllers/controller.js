const { User, Profile, Comment, Like, Post } = require("../models/index");
const bcrypt = require("bcryptjs");

class Controller {
  static async renderRegister(req, res) {
    try {
      res.render("register");
    } catch (error) {
      console.log(error);
      res.send(error.message);
    }
  }

  static async handleRegister(req, res) {
    try {
      const { username, email, password, name } = req.body;
      const user = await User.create({ username, email, password });
      //   const profile = await user.createProfile(req.body)
      await Profile.create({ name, UserId: user.id });
      res.redirect("/login");
    } catch (error) {
      console.log(error);
      res.send(error.message);
    }
  }

  static async renderLogin(req, res) {
    try {
      const { error } = req.query;
      res.render("login", { error });
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

      if (!user) {
        const error = "invalid username/password";
        return res.redirect(`/login?error=${error}`);
      }

      const isValidPassword = bcrypt.compareSync(password, user.password);

      if (isValidPassword) {
        req.session.userId = user.id;
        req.session.username = user.username;
        req.session.loggedIn = true;

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
      const loggedIn = !!req.session.userId;
      const username = req.session.username || null;

      const users = await User.findAll();

      res.render("home", { loggedIn, username, users });
    } catch (error) {
      console.log(error);
      res.send(error.message);
    }
  }

  static async renderProfile(req, res) {
    try {
      res.send("profile");
    } catch (error) {
      console.log(error);
      res.send(error.message);
    }
  }
}

module.exports = Controller;
