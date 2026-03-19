// config/cors.js
const corsOptions = {
  origin: ['http://localhost:3002', 'http://localhost:5173', 'http://localhost:5174'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
  credentials: true
};

module.exports = corsOptions;