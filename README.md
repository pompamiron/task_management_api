# Todo Management APIs

This is a Task management APIs built with Node.js, Express.js, PostgreSQL, and Sequelize. It allows users to create tasks and add subtasks to each task, mark tasks and subtasks as done or undone, and display tasks and subtasks as an accordion.

## Prerequisites

Make sure you have the following software installed on your machine:

- Node.js (LTS version)
- PostgreSQL

## Getting Started

1. Unzip the project files

2. Install the project dependencies by running the following command in the project directory:

`npm install`

3. Set up the PostgreSQL database:

   - Create a new PostgreSQL database with the name task_management.
   - Update the database configuration in src/config/database.js with your PostgreSQL credentials.

4. Run the database migrations to create the necessary tables:

`npx sequelize-cli db:migrate`

5. If you have any seed files for initial data insertion, you can run the following command to populate the tables with seed data:

`npx sequelize-cli db:seed:all `

6. Start the development server:

`npm start `

7. The application should now be running at http://localhost:3000.

API Routes
The application provides the following API routes:

- GET /todos: Get all todos.
- POST /todos: Create a new todo.
- PATCH /todos/:id: Update a specific todo.
- POST /todos/:id/subtasks: Add a new subtask to a specific todo.
- PATCH /subtasks/:id: Update a specific subtask.

Technologies Used

- Node.js
- Express.js
- PostgreSQL
- Sequelize (ORM)

License
This project is licensed under the MIT License.
