const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  points: { type: Number, min: 0, required: true },
});

userSchema.set('toJSON', {
  // Rename _id as id and drop __v
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('User', userSchema);
