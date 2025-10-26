const express = require('express');
const router = express.Router();
const eventController = require('../controllers/eventController');
const { createZoomMeeting } = require('../controllers/zoomController');
const authMiddleware = require('../middleware/authMiddleware');
const verifyOrganizer = require('../middleware/verifyOrganizer');

// Public routes
router.get('/', eventController.getAllEvents);
router.get('/:id', eventController.getEvent);

// Protected routes (organizer only)
router.post('/', authMiddleware, eventController.createEvent);
router.post('/create-zoom', verifyOrganizer, createZoomMeeting);
router.put('/:id', authMiddleware, verifyOrganizer, eventController.updateEvent);
router.delete('/:id', authMiddleware, verifyOrganizer, eventController.deleteEvent);

module.exports = router;
