const mongoose = require('mongoose');

const continentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  kingdoms: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Kingdom' }],
  towns: { type: Number, required: true },
  castles: { type: Number, required: true },
  villages: { type: Number, required: true },
  description: { type: String }
});

module.exports = mongoose.model('Continent', continentSchema);