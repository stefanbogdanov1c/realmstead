const mongoose = require('mongoose');

const kingdomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  ruler: { type: mongoose.Schema.Types.ObjectId, ref: 'Noble' },
  rulerFamily: { type: mongoose.Schema.Types.ObjectId, ref: 'Family' },
  vassalFamilies: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Family' }],
  capital: { type: mongoose.Schema.Types.ObjectId, ref: 'City' },
  description: { type: String }
});

module.exports = mongoose.model('Kingdom', kingdomSchema);