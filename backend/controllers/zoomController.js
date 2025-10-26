const axios = require('axios');
const generateZoomJWT = require('../utils/zoom');
const Event = require('../models/Event');

exports.createZoomMeeting = async (req, res) => {
  try {
    const { eventId } = req.body;

    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    // Only for virtual events
    if (event.type !== 'virtual') {
      return res.status(400).json({ message: 'This event is not virtual' });
    }

    const token = generateZoomJWT();

    const meetingData = {
      topic: event.title,
      type: 2, // Scheduled meeting
      start_time: event.date.toISOString(),
      duration: 60, // optional
      settings: {
        host_video: true,
        participant_video: true,
        join_before_host: false,
      }
    };

    const response = await axios.post('https://api.zoom.us/v2/users/me/meetings', meetingData, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    });

    // Save meeting link in DB
    event.zoomLink = response.data.join_url;
    await event.save();

    res.status(200).json({ message: 'Zoom meeting created', zoomLink: event.zoomLink });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};
