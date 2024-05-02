const mongoose = require('mongoose');

const familySchema = new mongoose.Schema({
  name: { type: String, required: true },
  ruler: { type: mongoose.Schema.Types.ObjectId, ref: 'Noble' },
  founder: { type: mongoose.Schema.Types.ObjectId, ref: 'Noble' },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Noble' }],
  description: { type: String },
});

module.exports = mongoose.model('Family', familySchema);