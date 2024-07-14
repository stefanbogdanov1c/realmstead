const mongoose = require('mongoose');

const nobleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  age: { type: Number, required: true },
  alive: { type: Boolean, default: true },
  gender: { type: String, enum: ['male', 'female'], required: true },
  spouseId: { type: mongoose.Schema.Types.ObjectId, ref: 'Noble', default: null },
  motherId: { type: mongoose.Schema.Types.ObjectId, ref: 'Noble', default: null },
  fatherId: { type: mongoose.Schema.Types.ObjectId, ref: 'Noble', default: null },
  title: { type: String },
  nickname: { type: String },
  description: { type: String },
});

module.exports = mongoose.model('Noble', nobleSchema);