const express = require('express');
const router = express.Router();
const rsvpController = require('../controllers/rsvpController');
const authMiddleware = require('../middleware/authMiddleware');
const verifyOrganizer = require('../middleware/verifyOrganizer');

// Register attendee (authenticated user)
router.post('/register', authMiddleware, rsvpController.registerAttendee);

// Export attendee list (organizer only)
router.get('/export/:eventId', authMiddleware, verifyOrganizer, rsvpController.exportAttendees);

module.exports = router;
