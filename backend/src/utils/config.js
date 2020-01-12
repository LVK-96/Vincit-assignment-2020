const dotenv = require('dotenv');

if (process.env.VINCIT_SUMMER_2020_DEV) {
  dotenv.config({ path: '.env.development' });
} else {
  dotenv.config();
}

module.exports = { ...process.env };
