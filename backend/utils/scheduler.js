const cron = require('node-cron');
const Event = require('../models/Event');
const User = require('../models/User');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Run every day at 8 AM
const scheduleEventReminders = () => {
  cron.schedule('0 8 * * *', async () => {
    try {
      const tomorrow = new Date();
      tomorrow.setDate(tomorrow.getDate() + 1);

      const events = await Event.find({
        date: { $gte: tomorrow, $lt: new Date(tomorrow.getTime() + 24 * 60 * 60 * 1000) },
      });

      for (const event of events) {
        for (const userId of event.attendees) {
          const user = await User.findById(userId);
          if (user && user.email) {
            const mailOptions = {
              from: process.env.EMAIL_USER,
              to: user.email,
              subject: `Reminder: ${event.title} tomorrow!`,
              text: `Hi ${user.name},\n\nYour event "${event.title}" is happening on ${event.date}.\nZoom Link: ${event.zoomLink || 'N/A'}\n\nJoin on time!`,
            };
            transporter.sendMail(mailOptions, (err, info) => {
              if (err) console.log('Error sending reminder:', err);
              else console.log('Reminder sent to:', user.email);
            });
          }
        }
      }
    } catch (err) {
      console.log('Scheduler error:', err.message);
    }
  });
};

module.exports = scheduleEventReminders;
