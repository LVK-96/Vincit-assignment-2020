const mongoose = require('mongoose');

const pointsSchema = mongoose.Schema({
  amount: { type: Number, min: 0, required: true },
});

pointsSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

module.exports = mongoose.model('Points', pointsSchema);
