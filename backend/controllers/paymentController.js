const Stripe = require('stripe');
const stripe = Stripe(process.env.STRIPE_SECRET_KEY);
const Event = require('../models/Event');
const User = require('../models/User');

exports.createCheckoutSession = async (req, res) => {
  const { eventId } = req.body;
  const userId = req.user.id;

  try {
    const event = await Event.findById(eventId);
    if (!event) return res.status(404).json({ message: 'Event not found' });

    if (event.price <= 0) {
      return res.status(400).json({ message: 'This event is free, no payment needed' });
    }

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: [
        {
          price_data: {
            currency: 'usd', // or your currency
            product_data: {
              name: event.title,
              description: event.description,
            },
            unit_amount: event.price * 100, // Stripe works in cents
          },
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `http://localhost:3000/payment-success?eventId=${event._id}&userId=${userId}`,
      cancel_url: `http://localhost:3000/payment-cancel`,
    });

    res.status(200).json({ url: session.url });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
