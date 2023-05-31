("use strict");

module.exports = {
  async up(queryInterface) {
    const todos = await queryInterface.sequelize.query(
      'SELECT id FROM "Todos";'
    );
    const todoIds = todos[0].map((todo) => todo.id);

    await queryInterface.bulkInsert(
      "Subtasks",
      [
        {
          title: "Subtask 1",
          status: "pending",
          TodoId: todoIds[0],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Subtask 2",
          status: "completed",
          TodoId: todoIds[1],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          title: "Subtask 3",
          status: "completed",
          TodoId: todoIds[1],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("Subtasks", null, {});
  },
};
