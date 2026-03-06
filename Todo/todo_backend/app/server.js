const express = require('express');
const cors = require('cors');
require('dotenv').config();
const sequelize = require('./util/db');




const User =require('./models/userModel');



const morgan = require('morgan');
const app = express();
const PORT = process.env.PORT || 5002;


const corsoptions = {
  origin: 'http://localhost:5174', // Update with your frontend URL
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type']
};
// Middleware
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
// In-memory storage (replace with database in production)
let todos = [
  { id: 1, text: 'Learn React', completed: false },
  { id: 2, text: 'Build Todo App', completed: false },
  { id: 3, text: 'Master Node.js', completed: true }
];

// Routes

// GET all todos
app.get('/api/todos', (req, res) => {
  res.json(todos);

});

// POST create new todo
app.post('/api/todos', (req, res) => {
  const { text } = req.body;
  
  if (!text) {
    return res.status(400).json({ error: 'Text is required' });
  }

  const newTodo = {
    id: todos.length + 1,
    text,
    completed: false
  };

  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// PUT update todo
app.put('/api/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const { text, completed } = req.body;
  
  const todoIndex = todos.findIndex(todo => todo.id === id);
  
  if (todoIndex === -1) {
    return res.status(404).json({ error: 'Todo not found' });
  }

  todos[todoIndex] = {
    ...todos[todoIndex],
    text: text !== undefined ? text : todos[todoIndex].text,
    completed: completed !== undefined ? completed : todos[todoIndex].completed
  };

  res.json(todos[todoIndex]);
});

// DELETE todo
app.delete('/api/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const todoIndex = todos.findIndex(todo => todo.id === id);
  
  if (todoIndex === -1) {
    return res.status(404).json({ error: 'Todo not found' });
  }

  todos = todos.filter(todo => todo.id !== id);
  res.status(204).send();
});

sequelize.authenticate().then(() => {
  console.log('Database connected...');
   return sequelize.sync();
})
.then(() => {
  const PORT = process.env.PORT || 5002;
  // Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
}).catch((err) => { 
  console.error('Unable to connect to the database:', err);
});


