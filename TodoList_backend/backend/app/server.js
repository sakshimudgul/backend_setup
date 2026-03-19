require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const sequelize = require('./util/db');
const Todo = require('./models/Todo'); // Still needed for model sync
const corsOptions = require('./config/cors');
const todoRoutes = require('./routes/todoRoutes');
const { log, colors } = require('./util/loggers');

const app = express();
const PORT = process.env.PORT || 3002;

// Middleware
app.use(cors(corsOptions));
app.use(express.json());
app.use(morgan('dev'));

// Routes
app.use('/api/todos', todoRoutes);

// Health check route (optional)
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Server is running' });
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