const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  type: { type: String, enum: ['physical', 'virtual'], default: 'physical' },
  price: { type: Number, default: 0 },
  venue: { type: String },
  media: [{ type: String }],       // URLs of images/videos
  attendees: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  organizer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  qrCodes: [{ type: String }],     // optional for check-ins
  zoomLink: { type: String, default: null }       // for virtual events
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);
