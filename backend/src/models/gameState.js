const mongoose = require('mongoose');

const gameStateSchema = mongoose.Schema({
  state: {
    type: Number,
    min: 0,
    default: 0,
    required: true,
  },
});

module.exports = mongoose.model('GameState', gameStateSchema);
