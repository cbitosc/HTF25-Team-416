const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  date: { type: Date, required: true },
  time: { type: String }, // Time range like "9:00 AM - 6:00 PM"
  type: { type: String, enum: ['physical', 'virtual'], default: 'physical' },
  price: { type: Number, default: 0 },
  venue: { type: String },
  capacity: { type: Number }, // Maximum number of attendees
  attendees: { type: Number, default: 0 }, // Count of registered attendees
  status: { type: String, enum: ['Active', 'Upcoming', 'Completed', 'Cancelled'], default: 'Active' },
  media: [{ type: String }],       // URLs of images/videos
  organizer: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  qrCodes: [{ type: String }],     // optional for check-ins
  zoomLink: { type: String, default: null }       // for virtual events
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);
