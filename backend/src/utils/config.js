const dotenv = require('dotenv');

if (process.env.NODE_ENV === 'dev') {
  // Use local development config
  dotenv.config({ path: '.env.development' });
} else if (process.env.NODE_ENV === 'test') {
  // Test config
  dotenv.config({ path: '.env.test' });
} else {
  dotenv.config();
}

module.exports = { ...process.env };
