"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.bulkInsert(
      "Todos",
      [
        {
          title: "Task 1",
          status: "pending",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Task 2",
          status: "completed",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Task 3",
          status: "completed",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("Todos", null, {});
  },
};
