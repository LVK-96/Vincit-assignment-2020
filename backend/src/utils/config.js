const dotenv = require('dotenv');

if (process.env.VINCIT_SUMMER_2020_DEV) {
  // Use local development config
  dotenv.config({ path: '.env.development' });
} else {
  // Production config
  dotenv.config();
}

module.exports = { ...process.env };
