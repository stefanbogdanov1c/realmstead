const mongoose = require('mongoose');

const kingdomSchema = new mongoose.Schema({
  name: { type: String, required: true },
  rulerId: { type: mongoose.Schema.Types.ObjectId, ref: 'Noble', default: null },
  rulerFamilyId: { type: mongoose.Schema.Types.ObjectId, ref: 'Family', default: null },
  vassalFamiliesIds: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Family', default: null }],
  capitalId: { type: mongoose.Schema.Types.ObjectId, ref: 'City', default: null },
  description: { type: String }
});

kingdomSchema.index({ name: 'text', description: 'text' });

module.exports = mongoose.model('Kingdom', kingdomSchema);