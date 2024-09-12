"use strict";
const bcrypt = require("bcryptjs");
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync("admin123", salt);
    const password = hash;
    await queryInterface.bulkInsert("Users", [
      {
        username: "admin",
        password: password,
        email: "admin@gmail.com",
        role: "admin",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
