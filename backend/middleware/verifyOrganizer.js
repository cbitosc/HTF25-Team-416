const Event = require('../models/Event');

module.exports = async function(req, res, next) {
  const userId = req.user.id; // from JWT middleware
  const eventId = req.params.id;

  try {
    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    if (event.organizer.toString() !== userId) {
      return res.status(403).json({ message: 'Access denied: Not the organizer' });
    }

    next();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
