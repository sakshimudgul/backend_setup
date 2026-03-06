const express = require('express');
const cors = require('cors');
require('dotenv').config();
const sequelize = require('./util/db');
const Todo = require('./models/Todo');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 3000;

// CORS configuration
const corsOptions = {
  origin: ['http://localhost:3000', 'http://localhost:5173', 'http://localhost:5174'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
  credentials: true
};

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan('dev'));

// Colors for terminal output
const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  magenta: '\x1b[35m',
  cyan: '\x1b[36m',
  red: '\x1b[31m'
};

// Helper function for logging
const log = (message, color = colors.blue) => {
  const timestamp = new Date().toLocaleTimeString();
  console.log(`${colors.dim}[${timestamp}]${colors.reset} ${color}${message}${colors.reset}`);
};

// Routes

// GET all todos
app.get('/api/todos', async (req, res) => {
  log('📋 FETCHING ALL TODOS FROM DATABASE', colors.cyan);
  try {
    const todos = await Todo.findAll({
      order: [['createdAt', 'DESC']]
    });
    
    console.log(`${colors.green}✅ Found ${todos.length} todos${colors.reset}`);
    todos.forEach(todo => {
      const status = todo.completed ? '✅' : '⬜';
      console.log(`   ${status} [${todo.id}] ${todo.text}`);
    });
    
    res.json(todos);
  } catch (error) {
    log(`❌ Error fetching todos: ${error.message}`, colors.red);
    res.status(500).json({ error: 'Failed to fetch todos' });
  }
});

// POST create new todo
app.post('/api/todos', async (req, res) => {
  log('➕ CREATING NEW TODO IN DATABASE', colors.cyan);
  try {
    const { text } = req.body;
    
    if (!text || text.trim() === '') {
      log('❌ Invalid input: text is required', colors.red);
      return res.status(400).json({ error: 'Text is required' });
    }

    console.log(`${colors.yellow}Creating todo with text: "${text}"${colors.reset}`);
    
    const newTodo = await Todo.create({
      text: text.trim(),
      completed: false
    });

    log('✅ TODO CREATED SUCCESSFULLY', colors.green);
    console.log(`${colors.green}   ID: ${newTodo.id}${colors.reset}`);
    console.log(`${colors.green}   Text: ${newTodo.text}${colors.reset}`);
    console.log(`${colors.green}   Completed: ${newTodo.completed}${colors.reset}`);
    console.log(`${colors.green}   Created: ${newTodo.createdAt}${colors.reset}`);

    res.status(201).json(newTodo);
  } catch (error) {
    log(`❌ Error creating todo: ${error.message}`, colors.red);
    res.status(500).json({ error: 'Failed to create todo' });
  }
});

// PUT update todo
app.put('/api/todos/:id', async (req, res) => {
  const id = req.params.id;
  log(`✏️ UPDATING TODO #${id} IN DATABASE`, colors.cyan);
  
  try {
    const { text, completed } = req.body;
    const todo = await Todo.findByPk(id);

    if (!todo) {
      log(`❌ Todo #${id} not found`, colors.red);
      return res.status(404).json({ error: 'Todo not found' });
    }

    console.log(`${colors.yellow}Before update:${colors.reset}`);
    console.log(`   Text: "${todo.text}"`);
    console.log(`   Completed: ${todo.completed}`);

    // Update fields
    if (text !== undefined) todo.text = text.trim();
    if (completed !== undefined) todo.completed = completed;
    
    await todo.save();

    log(`✅ TODO #${id} UPDATED SUCCESSFULLY`, colors.green);
    console.log(`${colors.green}After update:${colors.reset}`);
    console.log(`   Text: "${todo.text}"`);
    console.log(`   Completed: ${todo.completed}`);

    res.json(todo);
  } catch (error) {
    log(`❌ Error updating todo: ${error.message}`, colors.red);
    res.status(500).json({ error: 'Failed to update todo' });
  }
});

// DELETE todo
app.delete('/api/todos/:id', async (req, res) => {
  const id = req.params.id;
  log(`🗑️ DELETING TODO #${id} FROM DATABASE`, colors.cyan);
  
  try {
    const todo = await Todo.findByPk(id);

    if (!todo) {
      log(`❌ Todo #${id} not found`, colors.red);
      return res.status(404).json({ error: 'Todo not found' });
    }

    console.log(`${colors.yellow}Deleting: [${todo.id}] ${todo.text}${colors.reset}`);
    
    await todo.destroy();

    log(`✅ TODO #${id} DELETED SUCCESSFULLY`, colors.green);
    res.status(204).send();
  } catch (error) {
    log(`❌ Error deleting todo: ${error.message}`, colors.red);
    res.status(500).json({ error: 'Failed to delete todo' });
  }
});

// Database connection and server start
sequelize.authenticate()
  .then(() => {
    log('✅ DATABASE CONNECTED SUCCESSFULLY', colors.green);
    console.log(`   Host: localhost:5432`);
    console.log(`   Database: todolist`);
    
    return sequelize.sync({ alter: true }); // This will update tables without dropping data
  })
  .then(() => {
    log('✅ DATABASE SYNCED SUCCESSFULLY', colors.green);
    
    // Start server
    app.listen(PORT, () => {
      console.log('\n' + '='.repeat(60));
      log(`🚀 SERVER STARTED`, colors.bright + colors.green);
      console.log('='.repeat(60));
      console.log(`${colors.cyan}📡 Server:${colors.reset} http://localhost:${PORT}`);
      console.log(`${colors.cyan}📋 API:${colors.reset} http://localhost:${PORT}/api/todos`);
      console.log(`${colors.cyan}🗄️  Database:${colors.reset} PostgreSQL (todolist)`);
      console.log('='.repeat(60) + '\n');
    });
  })
  .catch((err) => {
    log(`❌ DATABASE CONNECTION FAILED: ${err.message}`, colors.red);
    console.error(err);
    process.exit(1);
  });

// Graceful shutdown
process.on('SIGINT', () => {
  log('👋 Shutting down server...', colors.yellow);
  sequelize.close().then(() => {
    log('✅ Database connection closed', colors.green);
    process.exit(0);
  });
});