const dotenv = require('dotenv');

if (process.env.NODE_ENV === 'dev'
    || process.env.NODE_ENV === 'test'
    || process.env.NODE_ENV === 'e2e_test') {
  // Use local development/test config
  dotenv.config({ path: '.env.development' });
} else {
  dotenv.config();
}

module.exports = { ...process.env };
