// Simple config without process.env dependency
const config = {
  // For development
  development: {
    API_URL: 'http://localhost:5003/api'
  },
  // For production (update this with your production URL)
  production: {
    API_URL: 'https://your-production-api.com/api'
  }
};

// Detect environment
const environment = process.env.NODE_ENV || 'development';

// Export the appropriate config
export default config[environment].API_URL;