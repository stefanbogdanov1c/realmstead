const mongoose = require('mongoose');

const familySchema = new mongoose.Schema({
  name: { type: String, required: true },
  rulerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Noble', default: null },
  founderId: { type: mongoose.Schema.Types.ObjectId, ref: 'Noble', default: null },
  members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Noble', default: null }],
  description: { type: String },
});

familySchema.index({ name: 'text', description: 'text' });

module.exports = mongoose.model('Family', familySchema);
