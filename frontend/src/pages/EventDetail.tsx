import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import { Calendar, MapPin, Users, Clock, Share2, Bookmark } from "lucide-react";
import { toast } from "sonner";

const EventDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const location = useLocation();

    // Check if user came from organizer dashboard
    const isOrganizerView = location.state?.fromOrganizer;

    // Mock events database
    const eventsData = {
        "1": {
            id: "1",
            title: "Tech Summit 2025",
            description: "Join industry leaders for an inspiring day of innovation, networking, and cutting-edge technology discussions. This comprehensive summit will feature keynote speeches from renowned tech pioneers, interactive workshops, and networking sessions designed to foster collaboration and inspire innovation.\n\nWhether you're a startup founder, developer, investor, or tech enthusiast, this event offers valuable insights into the latest trends shaping the future of technology.",
            date: "March 15, 2025",
            time: "9:00 AM - 6:00 PM",
            venue: "Silicon Valley Convention Center, 123 Innovation Drive, San Jose, CA",
            attendees: 234,
            capacity: 300,
            organizer: "Tech Events Inc.",
            type: "Conference",
            price: "Free",
            status: "Active"
        },
        "2": {
            id: "2",
            title: "Startup Pitch Night",
            description: "An exciting evening where innovative startups present their groundbreaking ideas to a panel of experienced investors and industry experts. This event provides a unique opportunity for entrepreneurs to showcase their vision, receive valuable feedback, and potentially secure funding for their ventures.\n\nAttendees will witness compelling pitch presentations, engage in networking opportunities, and gain insights into the startup ecosystem from successful entrepreneurs and investors.",
            date: "April 8, 2025",
            time: "6:00 PM - 10:00 PM",
            venue: "Innovation Hub, 456 Startup Boulevard, San Francisco, CA",
            attendees: 89,
            capacity: 150,
            organizer: "Startup Accelerator",
            type: "Networking",
            price: "₹2,100",
            status: "Active"
        },
        "3": {
            id: "3",
            title: "Web Dev Workshop",
            description: "An intensive hands-on workshop designed for developers of all skill levels. Learn the latest web development technologies, best practices, and modern frameworks from industry experts.\n\nThis workshop covers React, Node.js, TypeScript, and modern development tools. Participants will build real-world projects and receive personalized guidance from experienced mentors.",
            date: "February 28, 2025",
            time: "10:00 AM - 4:00 PM",
            venue: "CodeCamp Academy, 789 Developer Street, Austin, TX",
            attendees: 156,
            capacity: 200,
            organizer: "CodeCamp Academy",
            type: "Workshop",
            price: "₹8,250",
            status: "Completed"
        },
        "4": {
            id: "4",
            title: "AI Conference 2025",
            description: "Explore the future of artificial intelligence with leading researchers, practitioners, and innovators. This comprehensive conference covers machine learning, deep learning, natural language processing, and ethical AI development.\n\nFeaturing keynote presentations, technical sessions, demo booths, and networking opportunities with AI professionals from around the world.",
            date: "May 20, 2025",
            time: "8:00 AM - 7:00 PM",
            venue: "Grand Convention Center, 321 AI Avenue, Seattle, WA",
            attendees: 0,
            capacity: 500,
            organizer: "AI Research Institute",
            type: "Conference",
            price: "₹24,925",
            status: "Upcoming"
        },
        "5": {
            id: "5",
            title: "Design Thinking Workshop",
            description: "Discover the power of human-centered design thinking methodology. This interactive workshop teaches participants how to approach complex problems with empathy, creativity, and systematic thinking.\n\nLearn to identify user needs, ideate innovative solutions, prototype rapidly, and test effectively. Perfect for designers, product managers, entrepreneurs, and anyone interested in creative problem-solving.",
            date: "June 5, 2025",
            time: "9:00 AM - 5:00 PM",
            venue: "Creative Space, 654 Design District, Portland, OR",
            attendees: 0,
            capacity: 100,
            organizer: "Design Institute",
            type: "Workshop",
            price: "₹12,425",
            status: "Upcoming"
        }
    };

    const event = eventsData[id as keyof typeof eventsData];

    if (!event) {
        return (
            <div className="min-h-screen bg-background">
                <Navbar />
                <div className="pt-24 pb-20">
                    <div className="container mx-auto px-4 max-w-3xl text-center">
                        <h1 className="text-3xl font-bold mb-4">Event Not Found</h1>
                        <p className="text-muted-foreground mb-8">The event you're looking for doesn't exist.</p>
                        <Button onClick={() => navigate("/dashboard")}>
                            ← Back to Dashboard
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    // const handleRSVP = () => {
    //     toast.success("Successfully registered for the event!");
    // };

    const handleShare = () => {
        toast.success("Event link copied to clipboard!");
    };

    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            <div className="pt-24 pb-20">
                <div className="container mx-auto px-4 max-w-5xl">
                    {/* Event Header Image */}
                    <div className="relative h-64 md:h-96 rounded-2xl overflow-hidden mb-8 bg-gradient-to-br from-primary/20 to-accent/20 shadow-[var(--shadow-card)]">
                        <div className="absolute inset-0 flex items-center justify-center">
                            <Calendar className="w-24 h-24 text-primary/40" />
                        </div>
                        <div className="absolute top-4 right-4 flex gap-2">
                            <Button variant="secondary" size="icon" onClick={handleShare}>
                                <Share2 className="w-4 h-4" />
                            </Button>
                            <Button variant="secondary" size="icon">
                                <Bookmark className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Main Content */}
                        <div className="lg:col-span-2 space-y-6">
                            <div>
                                <h1 className="text-3xl md:text-4xl font-bold mb-4">{event.title}</h1>
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <span className="text-sm">Organized by</span>
                                    <span className="text-sm font-semibold text-primary">{event.organizer}</span>
                                </div>
                            </div>

                            <Card className="p-6">
                                <h2 className="text-xl font-bold mb-4">About This Event</h2>
                                <div className="prose prose-sm max-w-none text-muted-foreground whitespace-pre-line">
                                    {event.description}
                                </div>
                            </Card>

                            <Card className="p-6">
                                <h2 className="text-xl font-bold mb-4">Event Details</h2>
                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <Calendar className="w-5 h-5 text-primary mt-0.5" />
                                        <div>
                                            <p className="font-medium">Date</p>
                                            <p className="text-sm text-muted-foreground">{event.date}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <Clock className="w-5 h-5 text-primary mt-0.5" />
                                        <div>
                                            <p className="font-medium">Time</p>
                                            <p className="text-sm text-muted-foreground">{event.time}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <MapPin className="w-5 h-5 text-accent mt-0.5" />
                                        <div>
                                            <p className="font-medium">Location</p>
                                            <p className="text-sm text-muted-foreground">{event.venue}</p>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <Users className="w-5 h-5 text-primary mt-0.5" />
                                        <div>
                                            <p className="font-medium">Attendees</p>
                                            <p className="text-sm text-muted-foreground">
                                                {event.attendees} / {event.capacity} registered
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Card>
                        </div>

                        {/* Sidebar */}
                        <div className="lg:col-span-1">
                            <Card className="p-6 sticky top-24 space-y-6">
                                <div>
                                    <div className="text-3xl font-bold text-primary mb-1">{event.price}</div>
                                    <p className="text-sm text-muted-foreground">
                                        {event.price === "Free" ? "No registration fee" : "Registration fee"}
                                    </p>
                                </div>

                                <div className="space-y-3">
                                    {!isOrganizerView && (
                                        <>
                                            <Button
                                                variant="gradient"
                                                size="lg"
                                                className="w-full"
                                                onClick={() => navigate(`/events/${id}/register`)}
                                            >
                                                Register Now
                                            </Button>
                                            <Button variant="outline" size="lg" className="w-full">
                                                Add to Calendar
                                            </Button>
                                        </>
                                    )}

                                    {isOrganizerView && (
                                        <div className="space-y-3">
                                            <Button variant="outline" size="lg" className="w-full">
                                                Edit Event
                                            </Button>
                                            <Button variant="outline" size="lg" className="w-full">
                                                Manage Attendees
                                            </Button>
                                            <Button variant="outline" size="lg" className="w-full">
                                                View Analytics
                                            </Button>
                                        </div>
                                    )}
                                </div>

                                <div className="pt-6 border-t border-border">
                                    <div className="flex items-center gap-2 mb-4">
                                        <div className="flex -space-x-2">
                                            {[1, 2, 3, 4].map((i) => (
                                                <div
                                                    key={i}
                                                    className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-accent border-2 border-card"
                                                />
                                            ))}
                                        </div>
                                        <span className="text-sm text-muted-foreground">
                                            +{event.attendees - 4} attending
                                        </span>
                                    </div>

                                    <p className="text-sm text-muted-foreground">
                                        Join {event.attendees} others who are attending this event
                                    </p>
                                </div>

                                {!isOrganizerView && (
                                    <div className="pt-6 border-t border-border">
                                        <h3 className="font-semibold mb-3">Share Event</h3>
                                        <div className="flex gap-2">
                                            <Button variant="outline" size="icon" className="flex-1">
                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                                                </svg>
                                            </Button>
                                            <Button variant="outline" size="icon" className="flex-1">
                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z" />
                                                </svg>
                                            </Button>
                                            <Button variant="outline" size="icon" className="flex-1">
                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                                                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                                                </svg>
                                            </Button>
                                        </div>
                                    </div>
                                )}

                                {isOrganizerView && (
                                    <div className="pt-6 border-t border-border">
                                        <h3 className="font-semibold mb-3">Event Statistics</h3>
                                        <div className="space-y-2 text-sm">
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground">Total Registrations:</span>
                                                <span className="font-medium">{event.attendees}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground">Capacity:</span>
                                                <span className="font-medium">{event.capacity}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground">Available Spots:</span>
                                                <span className="font-medium">{event.capacity - event.attendees}</span>
                                            </div>
                                            <div className="flex justify-between">
                                                <span className="text-muted-foreground">Status:</span>
                                                <span className="font-medium">{event.status}</span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </Card>
                        </div>
                    </div>

                    {/* Back Button */}
                    <div className="mt-8">
                        <Button variant="ghost" onClick={() => navigate(isOrganizerView ? "/dashboard" : "/")}>
                            ← Back to {isOrganizerView ? "Dashboard" : "Events"}
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventDetail;
