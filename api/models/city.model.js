const mongoose = require('mongoose');

const citySchema = new mongoose.Schema({
  name: { type: String, required: true },
  population: { type: Number },
  rulerFamily: { type: mongoose.Schema.Types.ObjectId, ref: 'Family' },
  description: { type: String }
});

module.exports = mongoose.model('City', citySchema);