import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/Navbar";
import { Calendar, MapPin, Search, Users, Star, AlertCircle } from "lucide-react";
import { eventsAPI } from "@/lib/api";

const Events = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [events, setEvents] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                setLoading(true);
                setError(null);
                const data = await eventsAPI.getAllEvents();
                setEvents(data);
            } catch (err) {
                console.error('Failed to fetch events:', err);
                setError('Failed to load events. Please try again later.');
                // Fallback to mock data if API fails
                setEvents([
                    {
                        _id: "1",
                        title: "Tech Summit 2025",
                        date: "2025-11-15",
                        venue: "Convention Center, Hyderabad",
                        description: "Join us for the biggest tech summit of the year featuring industry leaders and cutting-edge innovations.",
                        price: "₹2,100",
                        category: "Technology",
                        attendees: 245,
                        rating: 4.8,
                        image: "/api/placeholder/400/200"
                    },
                    {
                        _id: "2",
                        title: "Startup Pitch Night",
                        date: "2025-12-05",
                        venue: "Innovation Hub, Bangalore",
                        description: "Watch promising startups pitch their ideas to investors and industry experts.",
                        price: "₹8,250",
                        category: "Business",
                        attendees: 89,
                        rating: 4.6,
                        image: "/api/placeholder/400/200"
                    },
                    {
                        _id: "3",
                        title: "AI & ML Workshop",
                        date: "2025-10-25",
                        venue: "Tech Park, Mumbai",
                        description: "Hands-on workshop covering the latest in Artificial Intelligence and Machine Learning.",
                        price: "₹12,425",
                        category: "Technology",
                        attendees: 156,
                        rating: 4.9,
                        image: "/api/placeholder/400/200"
                    }
                ]);
            } finally {
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    const filteredEvents = events.filter(event =>
        event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
        event.venue.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            weekday: 'short',
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    const getEventStatus = (eventDate: string) => {
        const now = new Date();
        const eventDateTime = new Date(eventDate);
        const timeDiff = eventDateTime.getTime() - now.getTime();
        const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

        if (daysDiff < 0) return { label: "Completed", color: "bg-gray-100 text-gray-700" };
        if (daysDiff === 0) return { label: "Today", color: "bg-red-100 text-red-700" };
        if (daysDiff === 1) return { label: "Tomorrow", color: "bg-orange-100 text-orange-700" };
        if (daysDiff <= 7) return { label: `In ${daysDiff} days`, color: "bg-yellow-100 text-yellow-700" };
        return { label: `In ${daysDiff} days`, color: "bg-blue-100 text-blue-700" };
    };

    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            <div className="pt-24 pb-20">
                <div className="container mx-auto px-4">
                    {/* Header */}
                    <div className="mb-8">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                            <div>
                                <h1 className="text-3xl font-bold mb-2">Browse Events</h1>
                                <p className="text-muted-foreground">
                                    Discover amazing events happening around you
                                </p>
                            </div>
                            <div className="mt-4 md:mt-0">
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                                    <Input
                                        placeholder="Search events..."
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                        className="pl-10 w-full md:w-80"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Events Grid */}
                    {loading ? (
                        <div className="text-center py-12">
                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
                            <p className="text-muted-foreground">Loading events...</p>
                        </div>
                    ) : error ? (
                        <div className="text-center py-12">
                            <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
                            <p className="text-red-600 mb-4">{error}</p>
                            <Button onClick={() => window.location.reload()}>
                                Try Again
                            </Button>
                        </div>
                    ) : (
                        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                            {filteredEvents.map((event) => {
                                const status = getEventStatus(event.date);
                                return (
                                    <Card key={event._id || event.id} className="group hover:shadow-lg transition-all duration-300 overflow-hidden">
                                        <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 relative overflow-hidden">
                                            <div className="absolute inset-0 bg-black/10 group-hover:bg-black/5 transition-colors" />
                                            <div className="absolute top-3 right-3">
                                                <Badge className={status.color} variant="secondary">
                                                    {status.label}
                                                </Badge>
                                            </div>
                                            <div className="absolute bottom-3 left-3 right-3">
                                                <div className="flex items-center gap-2 text-white">
                                                    <Users className="w-4 h-4" />
                                                    <span className="text-sm font-medium">{event.attendees || 0} attending</span>
                                                </div>
                                            </div>
                                        </div>

                                        <CardHeader className="pb-3">
                                            <div className="flex items-start justify-between">
                                                <div className="flex-1">
                                                    <CardTitle className="text-lg group-hover:text-primary transition-colors line-clamp-2">
                                                        {event.title}
                                                    </CardTitle>
                                                    <Badge variant="outline" className="mt-2 text-xs">
                                                        {event.category || 'General'}
                                                    </Badge>
                                                </div>
                                            </div>
                                        </CardHeader>

                                        <CardContent className="space-y-3">
                                            <CardDescription className="line-clamp-2">
                                                {event.description}
                                            </CardDescription>

                                            <div className="space-y-2 text-sm">
                                                <div className="flex items-center gap-2">
                                                    <Calendar className="w-4 h-4 text-primary" />
                                                    <span>{formatDate(event.date)}</span>
                                                </div>

                                                <div className="flex items-center gap-2">
                                                    <MapPin className="w-4 h-4 text-accent" />
                                                    <span className="text-muted-foreground truncate">{event.venue}</span>
                                                </div>

                                                {event.rating && (
                                                    <div className="flex items-center gap-2">
                                                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                                        <span className="font-medium">{event.rating}</span>
                                                        <span className="text-muted-foreground">({event.attendees || 0} reviews)</span>
                                                    </div>
                                                )}
                                            </div>

                                            <div className="flex items-center justify-between pt-2">
                                                <div className="text-lg font-bold text-primary">
                                                    {event.price || 'Free'}
                                                </div>
                                                <Button asChild className="group-hover:scale-105 transition-transform">
                                                    <Link to={`/events/${event._id || event.id}`}>
                                                        View Details
                                                    </Link>
                                                </Button>
                                            </div>
                                        </CardContent>
                                    </Card>
                                );
                            })}
                        </div>
                    )}

                    {!loading && !error && filteredEvents.length === 0 && (
                        <div className="text-center py-12">
                            <Calendar className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                            <h3 className="text-xl font-semibold mb-2">No events found</h3>
                            <p className="text-muted-foreground">
                                Try adjusting your search criteria
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Events;