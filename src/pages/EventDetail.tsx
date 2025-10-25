import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import { Calendar, MapPin, Users, Clock, Share2, Bookmark } from "lucide-react";
import { toast } from "sonner";

const EventDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    // Mock event data
    const event = {
        id: id,
        title: "Tech Summit 2025",
        description:
            "Join industry leaders for an inspiring day of innovation, networking, and cutting-edge technology discussions. This comprehensive summit will feature keynote speeches from renowned tech pioneers, interactive workshops, and networking sessions designed to foster collaboration and inspire innovation.\n\nWhether you're a startup founder, developer, investor, or tech enthusiast, this event offers valuable insights into the latest trends shaping the future of technology.",
        date: "March 15, 2025",
        time: "9:00 AM - 6:00 PM",
        venue: "Silicon Valley Convention Center, 123 Innovation Drive, San Jose, CA",
        attendees: 234,
        capacity: 500,
        organizer: "Tech Events Inc.",
        type: "Conference",
    };

    const handleRSVP = () => {
        toast.success("Successfully registered for the event!");
    };

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
                                    <div className="text-3xl font-bold text-primary mb-1">Free</div>
                                    <p className="text-sm text-muted-foreground">No registration fee</p>
                                </div>

                                <div className="space-y-3">
                                    <Button variant="gradient" size="lg" className="w-full" onClick={handleRSVP}>
                                        Register Now
                                    </Button>
                                    <Button variant="outline" size="lg" className="w-full">
                                        Add to Calendar
                                    </Button>
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
                            </Card>
                        </div>
                    </div>

                    {/* Back Button */}
                    <div className="mt-8">
                        <Button variant="ghost" onClick={() => navigate("/")}>
                            ← Back to Events
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventDetail;
