import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/Navbar";
import { Calendar, MapPin, Clock, QrCode, Search, Star, User, Ticket, Bell, TrendingUp } from "lucide-react";

const MyEvents = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    const [userRegistrations, setUserRegistrations] = useState<any[]>([]);
    const [upcomingEvents, setUpcomingEvents] = useState<any[]>([]);
    const [completedEvents, setCompletedEvents] = useState<any[]>([]);

    useEffect(() => {
        // Get user registrations from localStorage (in real app, fetch from API)
        const registrations = JSON.parse(localStorage.getItem('userRegistrations') || '[]');
        setUserRegistrations(registrations);

        // Separate upcoming and completed events
        const now = new Date();
        const upcoming = registrations.filter((reg: any) => new Date(reg.eventDate) >= now);
        const completed = registrations.filter((reg: any) => new Date(reg.eventDate) < now);

        setUpcomingEvents(upcoming);
        setCompletedEvents(completed);
    }, []);

    const filteredUpcoming = upcomingEvents.filter(event =>
        event.eventTitle.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const filteredCompleted = completedEvents.filter(event =>
        event.eventTitle.toLowerCase().includes(searchQuery.toLowerCase())
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

    const EventCard = ({ event, isCompleted = false }: { event: any, isCompleted?: boolean }) => {
        const status = getEventStatus(event.eventDate);

        return (
            <Card className="group hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                                <h3 className="font-semibold text-lg group-hover:text-primary transition-colors">
                                    {event.eventTitle}
                                </h3>
                                <Badge className={status.color} variant="secondary">
                                    {status.label}
                                </Badge>
                            </div>
                            <p className="text-sm text-muted-foreground mb-3">
                                Registered on {new Date(event.registeredAt).toLocaleDateString()}
                            </p>
                        </div>
                    </div>

                    <div className="space-y-3 mb-4">
                        <div className="flex items-center gap-2 text-sm">
                            <Calendar className="w-4 h-4 text-primary" />
                            <span>{formatDate(event.eventDate)}</span>
                        </div>

                        <div className="flex items-start gap-2 text-sm">
                            <MapPin className="w-4 h-4 text-accent mt-0.5" />
                            <span className="text-muted-foreground line-clamp-2">{event.eventVenue}</span>
                        </div>

                        <div className="flex items-center gap-2 text-sm">
                            <Ticket className="w-4 h-4 text-green-600" />
                            <span className="font-medium">Ticket ID: {event.ticketId}</span>
                        </div>
                    </div>

                    <div className="flex gap-2 pt-4 border-t">
                        <Button
                            variant="outline"
                            size="sm"
                            asChild
                            className="flex-1"
                        >
                            <Link to={`/my-ticket/${event.ticketId}`}>
                                <QrCode className="w-4 h-4 mr-2" />
                                View Ticket
                            </Link>
                        </Button>

                        <Button
                            variant="outline"
                            size="sm"
                            asChild
                            className="flex-1"
                        >
                            <Link to={`/events/${event.eventId}`}>
                                View Details
                            </Link>
                        </Button>

                        {isCompleted && (
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => navigate(`/feedback/${event.eventId}`)}
                                className="flex-1"
                            >
                                <Star className="w-4 h-4 mr-2" />
                                Review
                            </Button>
                        )}
                    </div>
                </CardContent>
            </Card>
        );
    };

    const statsCards = [
        {
            title: "Total Events",
            value: userRegistrations.length,
            icon: Calendar,
            color: "text-blue-600",
            bgColor: "bg-blue-50"
        },
        {
            title: "Upcoming Events",
            value: upcomingEvents.length,
            icon: Clock,
            color: "text-orange-500",
            bgColor: "bg-orange-50"
        },
        {
            title: "Completed Events",
            value: completedEvents.length,
            icon: TrendingUp,
            color: "text-green-600",
            bgColor: "bg-green-50"
        },
        {
            title: "Active Tickets",
            value: upcomingEvents.length,
            icon: Ticket,
            color: "text-purple-600",
            bgColor: "bg-purple-50"
        }
    ];

    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            <div className="pt-24 pb-20">
                <div className="container mx-auto px-4">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                        <div>
                            <h1 className="text-3xl font-bold text-foreground mb-2">
                                My Events Dashboard
                            </h1>
                            <p className="text-muted-foreground">Manage your event registrations and tickets</p>
                        </div>
                        <div className="flex gap-2 mt-6 md:mt-0">
                            <Button variant="outline" asChild>
                                <Link to="/notifications">
                                    <Bell className="w-4 h-4 mr-2" />
                                    Notifications
                                </Link>
                            </Button>
                            <Button asChild>
                                <Link to="/">
                                    Browse Events
                                </Link>
                            </Button>
                        </div>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {statsCards.map((stat) => (
                            <Card key={stat.title}>
                                <CardContent className="p-6">
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <p className="text-2xl font-bold">{stat.value}</p>
                                            <p className="text-sm text-muted-foreground">{stat.title}</p>
                                        </div>
                                        <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                                            <stat.icon className={`w-6 h-6 ${stat.color}`} />
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* Events Section */}
                    {userRegistrations.length === 0 ? (
                        <Card>
                            <CardContent className="text-center py-16">
                                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                                    <User className="w-8 h-8 text-muted-foreground" />
                                </div>
                                <h3 className="text-lg font-semibold mb-2">No Events Registered</h3>
                                <p className="text-muted-foreground mb-6">
                                    You haven't registered for any events yet. Explore our events and join the ones that interest you!
                                </p>
                                <Button asChild>
                                    <Link to="/">Browse Events</Link>
                                </Button>
                            </CardContent>
                        </Card>
                    ) : (
                        <Tabs defaultValue="upcoming" className="space-y-6">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                                <TabsList className="grid w-full grid-cols-2 sm:w-auto">
                                    <TabsTrigger value="upcoming">
                                        Upcoming ({upcomingEvents.length})
                                    </TabsTrigger>
                                    <TabsTrigger value="completed">
                                        Completed ({completedEvents.length})
                                    </TabsTrigger>
                                </TabsList>

                                {/* Search */}
                                <div className="relative mt-4 sm:mt-0 sm:w-64">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                    <Input
                                        placeholder="Search events..."
                                        className="pl-9"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>
                            </div>

                            <TabsContent value="upcoming" className="space-y-6">
                                {filteredUpcoming.length === 0 ? (
                                    <Card>
                                        <CardContent className="text-center py-12">
                                            <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                                            <h3 className="text-lg font-semibold mb-2">
                                                {searchQuery ? "No matching upcoming events" : "No upcoming events"}
                                            </h3>
                                            <p className="text-muted-foreground">
                                                {searchQuery
                                                    ? "Try adjusting your search terms."
                                                    : "All your registered events have been completed."
                                                }
                                            </p>
                                        </CardContent>
                                    </Card>
                                ) : (
                                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {filteredUpcoming.map((event) => (
                                            <EventCard key={event.ticketId} event={event} />
                                        ))}
                                    </div>
                                )}
                            </TabsContent>

                            <TabsContent value="completed" className="space-y-6">
                                {filteredCompleted.length === 0 ? (
                                    <Card>
                                        <CardContent className="text-center py-12">
                                            <TrendingUp className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                                            <h3 className="text-lg font-semibold mb-2">
                                                {searchQuery ? "No matching completed events" : "No completed events"}
                                            </h3>
                                            <p className="text-muted-foreground">
                                                {searchQuery
                                                    ? "Try adjusting your search terms."
                                                    : "You haven't attended any events yet."
                                                }
                                            </p>
                                        </CardContent>
                                    </Card>
                                ) : (
                                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {filteredCompleted.map((event) => (
                                            <EventCard key={event.ticketId} event={event} isCompleted={true} />
                                        ))}
                                    </div>
                                )}
                            </TabsContent>
                        </Tabs>
                    )}
                </div>
            </div>
        </div>
    );
};

export default MyEvents;