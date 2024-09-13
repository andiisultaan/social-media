const { User, Profile, Comment, Like, Post, sequelize } = require("../models/index");
const bcrypt = require("bcryptjs");
const getTime = require("../helpers/index");
const { Op } = require("sequelize");

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

      if (user) {
        const isValidPassword = bcrypt.compareSync(password, user.password);

        if (isValidPassword) {
          req.session.user = { id: user.id, role: user.role, name: user.username };
          if (user.role === "admin") {
            res.redirect("/admin");
          }
          res.redirect("/");
        } else {
          const error = "Invalid password";
          res.redirect(`/login?error=${error}`);
        }
      } else {
        const error = "Invalid username";
        res.redirect(`/login?error=${error}`);
      }
    } catch (error) {
      console.log(error);
      res.send(error.message);
    }
  }

  static async renderHome(req, res) {
    const { search } = req.query;
    try {
      let users = await Post.getUsers(search);
      //   res.send(users);
      res.render("home", { users, getTime });
    } catch (error) {
      console.log(error);
      res.send(error.message);
    }
  }

  static async renderProfile(req, res) {
    try {
      // const { id } = req.params;
      const UserId = req.session.user.id;
      const profile = await Profile.findOne({
        where: {
          UserId,
        },
        include: {
          model: User,
          include: {
            model: Post,
          },
        },
      });
      const posts = profile.User;
      // res.send(profile);
      res.render("profile", { profile, posts });
    } catch (error) {
      console.log(error);
      res.send(error.message);
    }
  }

  static async handleDeletePost(req, res) {
    try {
      const { PostId } = req.params;
      const UserId = req.session.user.id;
      const post = await Post.findOne({
        where: {
          id: PostId,
          UserId, // Memastikan bahwa post tersebut dimiliki oleh pengguna yang sedang login
        },
      });
      await post.destroy();
      res.redirect("/profile");
      // res.send(post);
    } catch (error) {
      console.log(error);
      res.send(error.message);
    }
  }

  static async handleProfile(req, res) {
    // const { id } = req.params;
    const UserId = req.session.user.id;
    try {
      const { name, profilePicture } = req.body;
      await Profile.update({ name, profilePicture }, { where: { UserId } });
      res.redirect(`/profile`);
    } catch (error) {
      console.log(error);
      res.send(error.message);
    }
  }

  static handleLogout(req, res) {
    req.session.destroy(err => {
      if (err) {
        console.log(err);
        res.send("Gagal logout");
      } else {
        res.redirect("/"); // Redirect ke halaman home setelah logout
      }
    });
  }

  //render post
  static async renderPost(req, res) {
    try {
      const { id } = req.params;
      res.render("addPost", { id });
    } catch (error) {
      console.log(error);
      res.send(error.message);
    }
  }

  static async handlePost(req, res) {
    try {
      const { caption, image } = req.body;
      const UserId = req.session.user.id;
      await Post.create({ caption, image, UserId });
      res.redirect("/");
    } catch (error) {
      console.log(error);
      res.send(error.message);
    }
  }

  static async renderAdmin(req, res) {
    try {
      res.render("admin");
    } catch (error) {
      console.log(error);
      res.send(error.message);
    }
  }

  static async renderPostUser(req, res) {
    const { id } = req.params;
    try {
      const post = await Post.findOne({
        where: { id },
        include: [
          {
            model: User,
            where: { role: "user" },
            include: Profile,
          },
          {
            model: Comment,
            include: {
              model: User, // Pilih atribut yang ingin diambil
            },
          },
          {
            model: Like,
            include: {
              model: User,
            },
          },
        ],
      });
      //   req.session.post = { id: post.id, role: post.role, name: post.username };
      //   res.send(post);
      res.render("post", { post, getTime });
    } catch (error) {
      console.log(error);
      res.send(error.message);
    }
  }

  static async handleComment(req, res) {
    try {
      const UserId = req.session.user.id;
      const { id } = req.params;
      const { comment } = req.body;
      await Comment.create({ UserId, PostId: id, comment });
      res.redirect(`/post/${id}`);
    } catch (error) {
      console.log(error);
      res.send(error.message);
    }
  }

  static async handleLike(req, res) {
    try {
    } catch (error) {
      console.log(error);
      res.send(error.message);
    }
  }
}

module.exports = Controller;
