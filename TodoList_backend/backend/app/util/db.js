const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('todolist', 'postgres', 'root', {
  host: 'localhost',
  port: 5432,
  dialect: 'postgres',
  timezone: "+05:30",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000,
  },
  logging: console.log // This will show SQL queries in terminal
});

module.exports = sequelize;