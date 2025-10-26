import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Navbar from "@/components/Navbar";
import {
    Calendar,
    MapPin,
    Clock,
    QrCode,
    Star,
    User,
    Ticket,
    Bell,
    TrendingUp,
    Settings,
    Plus,
    CheckCircle,
    AlertCircle,
    Award
} from "lucide-react"; const AttendeeDashboard = () => {
    const navigate = useNavigate();
    // const [searchQuery, setSearchQuery] = useState("");
    const [userRegistrations, setUserRegistrations] = useState<any[]>([]);
    const [upcomingEvents, setUpcomingEvents] = useState<any[]>([]);
    const [completedEvents, setCompletedEvents] = useState<any[]>([]);
    const [notifications, setNotifications] = useState<any[]>([]);
    const [userProfile, setUserProfile] = useState({
        name: "John Doe",
        email: "john.doe@example.com",
        phone: "+91 98765 43210",
        company: "Tech Solutions Inc.",
        joinedDate: "2024-01-15",
        totalEvents: 0,
        upcomingCount: 0,
        completedCount: 0
    });

    useEffect(() => {
        // Get user registrations from localStorage
        let registrations = JSON.parse(localStorage.getItem('userRegistrations') || '[]');

        // If no registrations found, add dummy events for testing
        if (registrations.length === 0) {
            const dummyRegistrations = [
                {
                    ticketId: "TKT-001",
                    eventId: "1",
                    eventTitle: "Tech Summit 2025",
                    eventDate: "2025-11-15",
                    eventVenue: "Convention Center, Hyderabad",
                    registrantName: "John Doe",
                    registrantEmail: "john.doe@example.com",
                    ticketType: "Standard",
                    price: "₹2,100"
                },
                {
                    ticketId: "TKT-002",
                    eventId: "2",
                    eventTitle: "Startup Pitch Night",
                    eventDate: "2025-12-05",
                    eventVenue: "Innovation Hub, Bangalore",
                    registrantName: "John Doe",
                    registrantEmail: "john.doe@example.com",
                    ticketType: "VIP",
                    price: "₹8,250"
                },
                {
                    ticketId: "TKT-003",
                    eventId: "3",
                    eventTitle: "AI & ML Workshop",
                    eventDate: "2025-10-25",
                    eventVenue: "Tech Park, Mumbai",
                    registrantName: "John Doe",
                    registrantEmail: "john.doe@example.com",
                    ticketType: "Premium",
                    price: "₹12,425"
                },
                {
                    ticketId: "TKT-004",
                    eventId: "4",
                    eventTitle: "Digital Marketing Conference",
                    eventDate: "2025-10-20",
                    eventVenue: "Business Center, Delhi",
                    registrantName: "John Doe",
                    registrantEmail: "john.doe@example.com",
                    ticketType: "Standard",
                    price: "₹2,100"
                },
                {
                    ticketId: "TKT-005",
                    eventId: "1",
                    eventTitle: "Web Development Bootcamp",
                    eventDate: "2025-11-30",
                    eventVenue: "Learning Center, Pune",
                    registrantName: "John Doe",
                    registrantEmail: "john.doe@example.com",
                    ticketType: "Premium",
                    price: "₹24,925"
                }
            ];
            registrations = dummyRegistrations;
            // Save dummy data to localStorage for persistence
            localStorage.setItem('userRegistrations', JSON.stringify(dummyRegistrations));
        }

        setUserRegistrations(registrations);

        // Separate upcoming and completed events
        const now = new Date();
        const upcoming = registrations.filter((reg: any) => new Date(reg.eventDate) >= now);
        const completed = registrations.filter((reg: any) => new Date(reg.eventDate) < now);

        setUpcomingEvents(upcoming);
        setCompletedEvents(completed);

        // Update user profile stats
        setUserProfile(prev => ({
            ...prev,
            totalEvents: registrations.length,
            upcomingCount: upcoming.length,
            completedCount: completed.length
        }));

        // Mock notifications
        const mockNotifications = [
            {
                id: "1",
                type: "reminder",
                title: "Event starting soon!",
                message: "Tech Summit 2025 starts in 2 hours",
                timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
                isRead: false
            },
            {
                id: "2",
                type: "update",
                title: "Venue change notification",
                message: "Startup Pitch Night venue has been updated",
                timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
                isRead: true
            }
        ];
        setNotifications(mockNotifications);
    }, []);

    // Filtering functionality can be added here if needed
    // const filteredUpcoming = upcomingEvents.filter(event =>
    //     event.eventTitle.toLowerCase().includes(searchQuery.toLowerCase())
    // );

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

    const QuickActionButton = ({ title, icon: Icon, onClick, color }: any) => (
        <Button
            variant="outline"
            size="sm"
            className="w-full justify-start h-auto p-3 hover:shadow-md transition-all group"
            onClick={onClick}
        >
            <div className={`p-2 rounded-lg ${color} group-hover:scale-110 transition-transform mr-3`}>
                <Icon className="w-4 h-4 text-white" />
            </div>
            <span className="font-medium">{title}</span>
        </Button>
    );

    const EventCard = ({ event, isCompleted = false }: { event: any, isCompleted?: boolean }) => {
        const status = getEventStatus(event.eventDate);

        return (
            <Card className="group hover:shadow-md transition-shadow">
                <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-semibold group-hover:text-primary transition-colors">
                                    {event.eventTitle}
                                </h3>
                                <Badge className={status.color} variant="secondary">
                                    {status.label}
                                </Badge>
                            </div>
                        </div>
                    </div>

                    <div className="space-y-2 mb-3 text-sm">
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4 text-primary" />
                            <span>{formatDate(event.eventDate)}</span>
                        </div>

                        <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4 text-accent" />
                            <span className="text-muted-foreground truncate">{event.eventVenue}</span>
                        </div>
                    </div>

                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            size="sm"
                            asChild
                            className="flex-1"
                        >
                            <Link to={`/my-ticket/${event.ticketId}`}>
                                <QrCode className="w-4 h-4 mr-1" />
                                Ticket
                            </Link>
                        </Button>

                        {isCompleted && (
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={() => navigate(`/feedback/${event.eventId}`)}
                                className="flex-1"
                            >
                                <Star className="w-4 h-4 mr-1" />
                                Review
                            </Button>
                        )}
                    </div>
                </CardContent>
            </Card>
        );
    };

    const unreadNotifications = notifications.filter(n => !n.isRead);

    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            <div className="pt-24 pb-20">
                <div className="container mx-auto px-4">
                    {/* Welcome Header */}
                    <div className="mb-8">
                        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                            <div className="flex items-center gap-4 mb-4 md:mb-0">
                                <div className="h-16 w-16 bg-primary text-primary-foreground text-lg font-semibold rounded-full flex items-center justify-center">
                                    {userProfile.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <div>
                                    <h1 className="text-2xl font-bold">Welcome back, {userProfile.name.split(' ')[0]}! 👋</h1>
                                    <p className="text-muted-foreground">
                                        Member since {new Date(userProfile.joinedDate).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <Button variant="outline" onClick={() => navigate("/notifications")}>
                                    <Bell className="w-4 h-4 mr-2" />
                                    Notifications
                                    {unreadNotifications.length > 0 && (
                                        <Badge variant="destructive" className="ml-2 px-2 py-1 text-xs">
                                            {unreadNotifications.length}
                                        </Badge>
                                    )}
                                </Button>
                                <Button onClick={() => navigate("/")}>
                                    <Plus className="w-4 h-4 mr-2" />
                                    Browse Events
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Stats Overview */}
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        <Card>
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-2xl font-bold text-primary">{userProfile.totalEvents}</p>
                                        <p className="text-sm text-muted-foreground">Total Events</p>
                                    </div>
                                    <Calendar className="w-8 h-8 text-primary" />
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-2xl font-bold text-orange-600">{userProfile.upcomingCount}</p>
                                        <p className="text-sm text-muted-foreground">Upcoming</p>
                                    </div>
                                    <Clock className="w-8 h-8 text-orange-600" />
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-2xl font-bold text-green-600">{userProfile.completedCount}</p>
                                        <p className="text-sm text-muted-foreground">Completed</p>
                                    </div>
                                    <TrendingUp className="w-8 h-8 text-green-600" />
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="p-6">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-2xl font-bold text-purple-600">{upcomingEvents.length}</p>
                                        <p className="text-sm text-muted-foreground">Active Tickets</p>
                                    </div>
                                    <Ticket className="w-8 h-8 text-purple-600" />
                                </div>
                            </CardContent>
                        </Card>
                    </div>



                    {/* Main Content */}
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Events Section */}
                        <div className="lg:col-span-2">
                            <Card>
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <div>
                                            <CardTitle>My Events</CardTitle>
                                            <CardDescription>Your registered events and tickets</CardDescription>
                                        </div>
                                        <Button variant="outline" asChild>
                                            <Link to="/my-events">View All</Link>
                                        </Button>
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    {userRegistrations.length === 0 ? (
                                        <div className="text-center py-8">
                                            <Calendar className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                                            <h3 className="text-lg font-semibold mb-2">No Events Yet</h3>
                                            <p className="text-muted-foreground mb-4">
                                                Start exploring events that interest you!
                                            </p>
                                            <Button asChild>
                                                <Link to="/">Browse Events</Link>
                                            </Button>
                                        </div>
                                    ) : (
                                        <Tabs defaultValue="upcoming" className="space-y-4">
                                            <TabsList className="grid w-full grid-cols-2">
                                                <TabsTrigger value="upcoming">
                                                    Upcoming ({upcomingEvents.length})
                                                </TabsTrigger>
                                                <TabsTrigger value="completed">
                                                    Past ({completedEvents.length})
                                                </TabsTrigger>
                                            </TabsList>

                                            <TabsContent value="upcoming" className="space-y-4">
                                                {upcomingEvents.length === 0 ? (
                                                    <div className="text-center py-6">
                                                        <Clock className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                                                        <p className="text-muted-foreground">No upcoming events</p>
                                                    </div>
                                                ) : (
                                                    <div className="grid gap-4">
                                                        {upcomingEvents.slice(0, 3).map((event) => (
                                                            <EventCard key={event.ticketId} event={event} />
                                                        ))}
                                                    </div>
                                                )}
                                            </TabsContent>

                                            <TabsContent value="completed" className="space-y-4">
                                                {completedEvents.length === 0 ? (
                                                    <div className="text-center py-6">
                                                        <CheckCircle className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                                                        <p className="text-muted-foreground">No completed events yet</p>
                                                    </div>
                                                ) : (
                                                    <div className="grid gap-4">
                                                        {completedEvents.slice(0, 3).map((event) => (
                                                            <EventCard key={event.ticketId} event={event} isCompleted={true} />
                                                        ))}
                                                    </div>
                                                )}
                                            </TabsContent>
                                        </Tabs>
                                    )}
                                </CardContent>
                            </Card>
                        </div>

                        {/* Sidebar */}
                        <div className="space-y-6">
                            {/* Quick Actions */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Settings className="w-5 h-5" />
                                        Quick Actions
                                    </CardTitle>
                                    <CardDescription>Common tasks and shortcuts</CardDescription>
                                </CardHeader>
                                <CardContent className="space-y-3">
                                    <QuickActionButton
                                        title="View My Tickets"
                                        icon={QrCode}
                                        color="bg-blue-600"
                                        onClick={() => navigate("/my-events")}
                                    />
                                    <QuickActionButton
                                        title="Browse Events"
                                        icon={Calendar}
                                        color="bg-green-600"
                                        onClick={() => navigate("/")}
                                    />
                                    <QuickActionButton
                                        title="Notifications"
                                        icon={Bell}
                                        color="bg-orange-600"
                                        onClick={() => navigate("/notifications")}
                                    />
                                    <QuickActionButton
                                        title="Profile Settings"
                                        icon={User}
                                        color="bg-purple-600"
                                        onClick={() => navigate("/profile")}
                                    />
                                </CardContent>
                            </Card>

                            {/* Recent Notifications */}
                            <Card>
                                <CardHeader>
                                    <div className="flex items-center justify-between">
                                        <CardTitle className="flex items-center gap-2">
                                            <Bell className="w-5 h-5" />
                                            Notifications
                                        </CardTitle>
                                        {unreadNotifications.length > 0 && (
                                            <Badge variant="destructive">{unreadNotifications.length}</Badge>
                                        )}
                                    </div>
                                </CardHeader>
                                <CardContent>
                                    {notifications.length === 0 ? (
                                        <div className="text-center py-4">
                                            <Bell className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
                                            <p className="text-sm text-muted-foreground">No notifications</p>
                                        </div>
                                    ) : (
                                        <div className="space-y-3">
                                            {notifications.slice(0, 3).map((notification) => (
                                                <div
                                                    key={notification.id}
                                                    className={`p-3 rounded-lg border ${!notification.isRead ? 'bg-blue-50 border-blue-200' : 'bg-muted/50'
                                                        }`}
                                                >
                                                    <div className="flex items-start gap-2">
                                                        {notification.type === 'reminder' ? (
                                                            <AlertCircle className="w-4 h-4 text-orange-500 mt-0.5" />
                                                        ) : (
                                                            <CheckCircle className="w-4 h-4 text-blue-500 mt-0.5" />
                                                        )}
                                                        <div className="flex-1 min-w-0">
                                                            <p className="text-sm font-medium">{notification.title}</p>
                                                            <p className="text-xs text-muted-foreground">{notification.message}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))}
                                            <Button variant="outline" size="sm" className="w-full" asChild>
                                                <Link to="/notifications">View All Notifications</Link>
                                            </Button>
                                        </div>
                                    )}
                                </CardContent>
                            </Card>

                            {/* Profile Summary */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <User className="w-5 h-5" />
                                        Profile Summary
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="space-y-2">
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-muted-foreground">Email:</span>
                                            <span className="font-medium">{userProfile.email}</span>
                                        </div>
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-muted-foreground">Phone:</span>
                                            <span className="font-medium">{userProfile.phone}</span>
                                        </div>
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-muted-foreground">Company:</span>
                                            <span className="font-medium">{userProfile.company}</span>
                                        </div>
                                    </div>
                                    <Button variant="outline" size="sm" className="w-full">
                                        <Settings className="w-4 h-4 mr-2" />
                                        Edit Profile
                                    </Button>
                                </CardContent>
                            </Card>

                            {/* Achievement Badge */}
                            <Card>
                                <CardContent className="p-6 text-center">
                                    <div className="w-12 h-12 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-3">
                                        <Award className="w-6 h-6 text-white" />
                                    </div>
                                    <h3 className="font-semibold mb-1">Event Enthusiast</h3>
                                    <p className="text-sm text-muted-foreground mb-3">
                                        You've attended {userProfile.completedCount} events!
                                    </p>
                                    <Badge variant="outline" className="text-xs">
                                        {userProfile.totalEvents >= 10 ? "Super Attendee" :
                                            userProfile.totalEvents >= 5 ? "Regular Attendee" : "New Member"}
                                    </Badge>
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AttendeeDashboard;