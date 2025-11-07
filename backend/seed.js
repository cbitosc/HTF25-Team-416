require('dotenv').config();
const mongoose = require('mongoose');
const Event = require('./models/Event');
const User = require('./models/User');
const { nanoid } = require('nanoid');

async function seedDatabase() {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log('MongoDB connected for seeding');

        // Clear existing data
        await Event.deleteMany({});
        await User.deleteMany({});
        console.log('Cleared existing events and users');

        // Create the specific organizer user
        const specificOrganizer = new User({
            name: 'Event Organizer',
            email: 'org@gmail.com',
            password: '123', // Simple password for development
            role: 'organizer'
        });
        await specificOrganizer.save();
        console.log('Created specific organizer: org@gmail.com');
        console.log('Organizer ID:', specificOrganizer.organizerId);

        // Create a sample organizer user for remaining events
        const genericOrganizer = new User({
            name: 'Tech Events Inc.',
            email: 'organizer@example.com',
            password: 'password123',
            role: 'organizer'
        });
        await genericOrganizer.save();
        console.log('Created generic organizer');

        // Sample events data - First 5 events for specific organizer
        const sampleEvents = [
            {
                title: 'Tech Summit 2025',
                description: 'Join industry leaders for an inspiring day of innovation, networking, and cutting-edge technology discussions. This comprehensive summit will feature keynote speeches from renowned tech pioneers, interactive workshops, and networking sessions designed to foster collaboration and inspire innovation.\n\nWhether you\'re a startup founder, developer, investor, or tech enthusiast, this event offers valuable insights into the latest trends shaping the future of technology.',
                date: new Date('2025-11-15'),
                time: '9:00 AM - 6:00 PM',
                venue: 'Convention Center, Hyderabad',
                capacity: 300,
                attendees: 234,
                organizer: specificOrganizer._id,
                type: 'physical',
                price: 2100,
                status: 'Active'
            },
            {
                title: 'Startup Pitch Night',
                description: 'An exciting evening where innovative startups present their groundbreaking ideas to a panel of experienced investors and industry experts. This event provides a unique opportunity for entrepreneurs to showcase their vision, receive valuable feedback, and potentially secure funding for their ventures.\n\nAttendees will witness compelling pitch presentations, engage in networking opportunities, and gain insights into the startup ecosystem from successful entrepreneurs and investors.',
                date: new Date('2025-12-05'),
                time: '6:00 PM - 10:00 PM',
                venue: 'Innovation Hub, Bangalore',
                capacity: 150,
                attendees: 89,
                organizer: specificOrganizer._id,
                type: 'physical',
                price: 8250,
                status: 'Active'
            },
            {
                title: 'AI & ML Workshop',
                description: 'Hands-on workshop covering the latest in Artificial Intelligence and Machine Learning. Learn practical applications, build real projects, and network with industry professionals.',
                date: new Date('2025-10-25'),
                time: '10:00 AM - 4:00 PM',
                venue: 'Tech Park, Mumbai',
                capacity: 200,
                attendees: 156,
                organizer: specificOrganizer._id,
                type: 'physical',
                price: 12425,
                status: 'Active'
            },
            {
                title: 'Web Development Bootcamp',
                description: 'Intensive 3-day bootcamp covering modern web development technologies including React, Node.js, and cloud deployment. Perfect for beginners and intermediate developers.',
                date: new Date('2025-11-20'),
                time: '9:00 AM - 5:00 PM',
                venue: 'Coding Academy, Delhi',
                capacity: 100,
                attendees: 45,
                organizer: specificOrganizer._id,
                type: 'physical',
                price: 15000,
                status: 'Active'
            },
            {
                title: 'Virtual Blockchain Conference',
                description: 'Explore the future of blockchain technology, cryptocurrency, and decentralized finance. Featuring expert speakers, live demos, and networking opportunities.',
                date: new Date('2025-12-12'),
                time: '10:00 AM - 7:00 PM',
                venue: 'Online Event',
                capacity: 250,
                attendees: 0,
                organizer: specificOrganizer._id,
                type: 'virtual',
                price: 5500,
                zoomLink: 'https://zoom.us/j/example',
                status: 'Upcoming'
            },
            {
                title: 'Data Science Masterclass',
                description: 'Comprehensive masterclass on data science fundamentals, statistical analysis, and machine learning algorithms. Learn from industry experts with hands-on exercises.',
                date: new Date('2025-11-08'),
                time: '9:30 AM - 5:30 PM',
                venue: 'Data Center, Pune',
                capacity: 120,
                attendees: 67,
                organizer: genericOrganizer._id,
                type: 'physical',
                price: 9500,
                status: 'Active'
            },
            {
                title: 'Cybersecurity Summit',
                description: 'Annual summit focusing on the latest cybersecurity threats, defense strategies, and best practices. Network with security professionals and learn about emerging technologies.',
                date: new Date('2025-12-18'),
                time: '8:00 AM - 6:00 PM',
                venue: 'Security Hub, Chennai',
                capacity: 400,
                attendees: 189,
                organizer: genericOrganizer._id,
                type: 'physical',
                price: 3200,
                status: 'Active'
            },
            {
                title: 'Mobile App Development Workshop',
                description: 'Learn to build cross-platform mobile applications using React Native and Flutter. Hands-on sessions with real-world project development.',
                date: new Date('2025-11-02'),
                time: '10:00 AM - 4:00 PM',
                venue: 'Mobile Lab, Ahmedabad',
                capacity: 80,
                attendees: 34,
                organizer: genericOrganizer._id,
                type: 'physical',
                price: 7800,
                status: 'Active'
            },
            {
                title: 'Cloud Computing Conference',
                description: 'Explore cloud technologies, serverless architecture, and modern deployment strategies. Featuring sessions from AWS, Azure, and Google Cloud experts.',
                date: new Date('2025-12-20'),
                time: '9:00 AM - 5:00 PM',
                venue: 'Cloud Center, Kolkata',
                capacity: 350,
                attendees: 0,
                organizer: genericOrganizer._id,
                type: 'physical',
                price: 4200,
                status: 'Upcoming'
            },
            {
                title: 'UX/UI Design Workshop',
                description: 'Master the art of user experience and interface design. Learn design thinking, prototyping tools, and user research methodologies.',
                date: new Date('2025-10-30'),
                time: '11:00 AM - 5:00 PM',
                venue: 'Design Studio, Jaipur',
                capacity: 60,
                attendees: 28,
                organizer: genericOrganizer._id,
                type: 'physical',
                price: 6500,
                status: 'Active'
            },
            {
                title: 'DevOps Automation Seminar',
                description: 'Learn CI/CD pipelines, containerization with Docker, and infrastructure as code. Practical sessions on Jenkins, Kubernetes, and Terraform.',
                date: new Date('2025-11-25'),
                time: '1:00 PM - 6:00 PM',
                venue: 'DevOps Center, Surat',
                capacity: 90,
                attendees: 52,
                organizer: genericOrganizer._id,
                type: 'physical',
                price: 5800,
                status: 'Active'
            },
            {
                title: 'Virtual Reality Meetup',
                description: 'Discover the world of VR/AR development. Hands-on experience with Unity, Unreal Engine, and WebXR technologies.',
                date: new Date('2025-12-08'),
                time: '2:00 PM - 8:00 PM',
                venue: 'VR Lab, Online',
                capacity: 100,
                attendees: 0,
                organizer: genericOrganizer._id,
                type: 'virtual',
                price: 2500,
                zoomLink: 'https://zoom.us/j/vr-meetup',
                status: 'Upcoming'
            },
            {
                title: 'IoT & Smart Devices Hackathon',
                description: '48-hour hackathon focused on Internet of Things projects. Build smart devices, compete for prizes, and network with hardware enthusiasts.',
                date: new Date('2025-11-12'),
                time: '9:00 AM - 9:00 AM (Next Day)',
                venue: 'Innovation Garage, Bangalore',
                capacity: 200,
                attendees: 145,
                organizer: genericOrganizer._id,
                type: 'physical',
                price: 1200,
                status: 'Active'
            },
            {
                title: 'Digital Marketing Bootcamp',
                description: 'Comprehensive training on SEO, social media marketing, content strategy, and analytics. Learn from marketing experts and industry leaders.',
                date: new Date('2025-12-01'),
                time: '10:00 AM - 4:00 PM',
                venue: 'Marketing Hub, Mumbai',
                capacity: 150,
                attendees: 78,
                organizer: genericOrganizer._id,
                type: 'physical',
                price: 8900,
                status: 'Active'
            },
            {
                title: 'Open Source Contribution Workshop',
                description: 'Learn how to contribute to open source projects. Understand Git workflows, code reviews, and community collaboration best practices.',
                date: new Date('2025-11-18'),
                time: '12:00 PM - 5:00 PM',
                venue: 'Community Center, Delhi',
                capacity: 70,
                attendees: 41,
                organizer: genericOrganizer._id,
                type: 'physical',
                price: 0,
                status: 'Active'
            }
        ];

        // Insert sample events
        const createdEvents = await Event.insertMany(sampleEvents);
        console.log(`Created ${createdEvents.length} sample events`);

        // Display created events
        console.log('\nCreated Events:');
        createdEvents.forEach((event, index) => {
            console.log(`${index + 1}. ${event.title} - ${event.date} at ${event.venue}`);
        });

        console.log('\nDatabase seeded successfully!');
        process.exit(0);

    } catch (error) {
        console.error('Error seeding database:', error);
        process.exit(1);
    }
}

seedDatabase();