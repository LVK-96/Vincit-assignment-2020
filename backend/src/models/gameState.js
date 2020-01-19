const mongoose = require('mongoose');

const gameStateSchema = mongoose.Schema({
  state: {
    type: Number,
    min: 0,
    max: 499, // State rolls around to 0 when it hits 500
    default: 0,
    required: true,
  },
});

module.exports = mongoose.model('GameState', gameStateSchema);
