// routes/todoRoutes.js
const express = require('express');
const router = express.Router();
const todoController = require('../controllers/todoController');

// GET all todos
router.get('/', todoController.getAllTodos);

// POST create new todo
router.post('/', todoController.createTodo);

// PUT update todo
router.put('/:id', todoController.updateTodo);

// DELETE todo
router.delete('/:id', todoController.deleteTodo);

module.exports = router;