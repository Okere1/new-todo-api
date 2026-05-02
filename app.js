require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const PORT = process.env.PORT || 3000;

app.use(cors("*"));
// body parsing middleware
app.use(express.json());

let todos = [
  { id: 1, task: "Learn Node.js", completed: false },
  { id: 2, task: "Build CRUD API", completed: false },
  { id: 3, task: "Understand Express middleware", completed: true },
  { id: 4, task: "Practice RESTful routes", completed: false },
  { id: 5, task: "Learn error handling in Node", completed: true },
  { id: 6, task: "Set up environment variables", completed: true },
  { id: 7, task: "Test API with Postman", completed: false },
  { id: 8, task: "Refactor code structure", completed: false },
  { id: 9, task: "Write validation logic", completed: true },
  { id: 10, task: "Prepare for deployment", completed: false },
];

// Get all todos
app.get("/todos", (req, res) => {
  res.status(200).json(todos); // Send array as JSON
});

// Get Active todos
app.get("/todos/active", (req, res) => {
  const activeTasks = todos.filter((data) => data.completed === false);
  res.status(200).json(activeTasks);
});

// Get completed tasks
app.get("/todos/completed", (req, res) => {
  const completedTask = todos.filter((data) => data.completed === true);
  res.status(200).json(completedTask);
});

// Get todo by ID
app.get("/todos/:id", (req, res) => {
  const requestId = parseInt(req.params.id);
  const filteredTodo = todos.find((data) => data.id === requestId);
  if (!filteredTodo) {
    return res.status(404).json({ error: "Todo not found" });
  }
  res.status(200).send(filteredTodo);
});

// Create a new todo
app.post("/todos", (req, res) => {
  const { task, completed } = req.body;
  if (typeof task !== "string" || task.trim() === "") {
    return res.status(400).json({ error: "Missing task field" });
  }

  if (typeof completed !== "boolean") {
    return res
      .status(400)
      .json({ error: "Completed input should be true or false" });
  }

  const newTodo = { id: todos.length + 1, ...req.body };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// Edit an item on the todo not all the items (PUT will replace or edit all the items, even if client don't pass all the properties)
// Also note that the req param always comes as a string, so we'll always need to parse as interger before we use the data to search
app.patch("/todos/:id", (req, res) => {
  const requestId = parseInt(req.params.id);
  const todo = todos.find((data) => data.id === requestId);
  if (!todo) {
    return res.status(404).json({ message: "Todo not found" });
  }
  Object.assign(todo, req.body);
  res.status(200).send(todo);
});

// Delete a todo
app.delete("/todos/:id", (req, res) => {
  const requestId = parseInt(req.params.id);
  const initialLength = todos.length;
  todos = todos.filter((data) => data.id !== requestId);
  if (todos.length === initialLength) {
    return res.status(404).send({ error: "Todo not found" });
  }
  res.status(204).send({ message: "Todo deleted successfully" });
});

app.use((err, req, res, next) => {
  res.status(500).json({ error: "Server error!" });
});

app.listen(3000, () => {
  console.log(`Server is running on port ${PORT}`);
});
