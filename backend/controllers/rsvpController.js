const Event = require('../models/Event');
const User = require('../models/User');
const nodemailer = require('nodemailer');
const { Parser } = require('json2csv');
const QRCode = require('qrcode');


exports.registerAttendee = async (req, res) => {
  const { eventId } = req.body;
  const userId = req.user.id; // from JWT

  try {
    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    // Check if user already registered
    if (event.attendees.includes(userId)) {
      return res.status(400).json({ message: 'Already registered' });
    }

    // Add attendee to event
    event.attendees.push(userId);
    await event.save();

    // Get user details
    const user = await User.findById(userId);

    // ✅ Generate QR code for the attendee
    const QRCode = require('qrcode');

    const qrData = {
      eventId: event._id,
      userId: user._id,
    };

    const qrCodeURL = await QRCode.toDataURL(JSON.stringify(qrData));

    // ✅ (Optional) Send confirmation email with QR code
    if (user && user.email) {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS,
        },
      });

      const mailOptions = {
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: `Registration Confirmed: ${event.title}`,
        html: `
          <p>Hi ${user.name},</p>
          <p>You have successfully registered for <b>${event.title}</b> on ${event.date}.</p>
          <p>Here is your unique QR code for check-in:</p>
          <img src="${qrCodeURL}" alt="QR Code" />
          <p>Thank you!</p>
        `,
      };

      transporter.sendMail(mailOptions, (err, info) => {
        if (err) console.log('❌ Email error:', err);
        else console.log('📩 Confirmation email sent: ' + info.response);
      });
    }

    // ✅ Return response
    res.status(200).json({
      message: 'Registered successfully and QR code generated',
      event,
      qrCodeURL, // to preview in Postman
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
};
// Export attendee list as CSV
exports.exportAttendees = async (req, res) => {
  const { eventId } = req.params;

  try {
    const event = await Event.findById(eventId).populate('attendees', 'name email');
    if (!event) return res.status(404).json({ message: 'Event not found' });

    const fields = ['_id', 'name', 'email'];
    const json2csvParser = new Parser({ fields });
    const csv = json2csvParser.parse(event.attendees);

    res.header('Content-Type', 'text/csv');
    res.attachment(`${event.title}-attendees.csv`);
    res.send(csv);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
