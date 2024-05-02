const mongoose = require('mongoose');

const nobleSchema = new mongoose.Schema({
  name: { type: String, required: true },
  lastName: { type: String, required: true },
  age: { type: Number, required: true },
  alive: { type: Boolean, default: true },
  gender: { type: String, enum: ['male', 'female'], required: true },
  spouse: { type: mongoose.Schema.Types.ObjectId, ref: 'Noble' },
  children: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Noble' }],
  parents: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Noble' }],
  siblings: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Noble' }],
  title: { type: String },
  nickname: { type: String },
  description: { type: String },
  picture: { type: String },
});

module.exports = mongoose.model('Noble', nobleSchema);