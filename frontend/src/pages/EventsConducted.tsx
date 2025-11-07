import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navbar from "@/components/Navbar";
import { Calendar, MapPin, Clock, Users, Edit, Eye, Search, Filter } from "lucide-react";

const EventsConducted = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [events, setEvents] = useState<any[]>([]);

    useEffect(() => {
        // Mock data for organizer's events (in real app, fetch from API)
        const mockEvents = [
            {
                id: "1",
                title: "Tech Summit 2025",
                description: "Join industry leaders for an inspiring day of innovation, networking, and cutting-edge technology discussions.",
                date: "March 15, 2025",
                time: "9:00 AM - 6:00 PM",
                venue: "Convention Center, Hyderabad",
                capacity: 300,
                registered: 234,
                price: 2100,
                status: "Active",
                type: "physical",
                revenue: "₹4,93,400",
                avgRating: 4.7
            },
            {
                id: "2",
                title: "Startup Pitch Night",
                description: "An exciting evening where innovative startups present their groundbreaking ideas to a panel of experienced investors.",
                date: "April 8, 2025",
                time: "6:00 PM - 10:00 PM",
                venue: "Innovation Hub, Bangalore",
                capacity: 150,
                registered: 89,
                price: 8250,
                status: "Active",
                type: "physical",
                revenue: "₹7,36,250",
                avgRating: 4.5
            },
            {
                id: "3",
                title: "AI & ML Workshop",
                description: "Hands-on workshop covering the latest in Artificial Intelligence and Machine Learning.",
                date: "October 25, 2025",
                time: "10:00 AM - 4:00 PM",
                venue: "Tech Park, Mumbai",
                capacity: 200,
                registered: 156,
                price: 12425,
                status: "Active",
                type: "physical",
                revenue: "₹19,38,900",
                avgRating: 4.8
            },
            {
                id: "4",
                title: "Web Development Bootcamp",
                description: "Intensive 3-day bootcamp covering modern web development technologies.",
                date: "November 20, 2025",
                time: "9:00 AM - 5:00 PM",
                venue: "Coding Academy, Delhi",
                capacity: 100,
                registered: 45,
                price: 15000,
                status: "Active",
                type: "physical",
                revenue: "₹6,75,000",
                avgRating: 4.6
            },
            {
                id: "5",
                title: "Virtual Blockchain Conference",
                description: "Explore the future of blockchain technology, cryptocurrency, and decentralized finance.",
                date: "December 12, 2025",
                time: "10:00 AM - 7:00 PM",
                venue: "Online Event",
                capacity: 250,
                registered: 0,
                price: 5500,
                status: "Upcoming",
                type: "virtual",
                revenue: "₹0",
                avgRating: 0
            }
        ];

        setEvents(mockEvents);
    }, []);

    const filteredEvents = events.filter(event => {
        const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            event.description.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === "all" || event.status.toLowerCase() === statusFilter.toLowerCase();
        return matchesSearch && matchesStatus;
    });

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'active': return 'bg-green-100 text-green-800';
            case 'upcoming': return 'bg-blue-100 text-blue-800';
            case 'completed': return 'bg-gray-100 text-gray-800';
            default: return 'bg-gray-100 text-gray-800';
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Events Conducted</h1>
                    <p className="text-gray-600">Manage and monitor all events you've organized</p>
                </div>

                {/* Filters */}
                <div className="mb-6 flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                        <Input
                            placeholder="Search events..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="pl-10"
                        />
                    </div>
                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                        <SelectTrigger className="w-full sm:w-48">
                            <Filter className="w-4 h-4 mr-2" />
                            <SelectValue placeholder="Filter by status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Events</SelectItem>
                            <SelectItem value="active">Active</SelectItem>
                            <SelectItem value="upcoming">Upcoming</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                {/* Events Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredEvents.map((event) => (
                        <Card key={event.id} className="hover:shadow-lg transition-shadow">
                            <CardHeader>
                                <div className="flex items-start justify-between">
                                    <div className="flex-1">
                                        <CardTitle className="text-lg mb-2">{event.title}</CardTitle>
                                        <Badge className={getStatusColor(event.status)}>
                                            {event.status}
                                        </Badge>
                                    </div>
                                </div>
                            </CardHeader>

                            <CardContent>
                                <div className="space-y-3">
                                    {/* Event Details */}
                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <Calendar className="w-4 h-4" />
                                        <span>{event.date}</span>
                                    </div>

                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <Clock className="w-4 h-4" />
                                        <span>{event.time}</span>
                                    </div>

                                    <div className="flex items-center gap-2 text-sm text-gray-600">
                                        <MapPin className="w-4 h-4" />
                                        <span className="truncate">{event.venue}</span>
                                    </div>

                                    {/* Stats */}
                                    <div className="grid grid-cols-2 gap-4 pt-2 border-t">
                                        <div className="text-center">
                                            <div className="flex items-center justify-center gap-1 text-sm text-gray-600 mb-1">
                                                <Users className="w-4 h-4" />
                                                <span>Attendees</span>
                                            </div>
                                            <div className="font-semibold text-lg">{event.registered}/{event.capacity}</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-sm text-gray-600 mb-1">Revenue</div>
                                            <div className="font-semibold text-lg text-green-600">₹{event.revenue.replace('₹', '')}</div>
                                        </div>
                                    </div>

                                    {/* Rating */}
                                    {event.avgRating > 0 && (
                                        <div className="flex items-center gap-2 pt-2">
                                            <div className="flex items-center gap-1">
                                                {[...Array(5)].map((_, i) => (
                                                    <div
                                                        key={i}
                                                        className={`w-4 h-4 ${i < Math.floor(event.avgRating) ? 'text-yellow-400' : 'text-gray-300'
                                                            }`}
                                                    >
                                                        ★
                                                    </div>
                                                ))}
                                            </div>
                                            <span className="text-sm text-gray-600">({event.avgRating})</span>
                                        </div>
                                    )}

                                    {/* Actions */}
                                    <div className="flex gap-2 pt-4">
                                        <Button variant="outline" size="sm" asChild className="flex-1">
                                            <Link to={`/organized-events/${event.id}`}>
                                                <Eye className="w-4 h-4 mr-1" />
                                                View Details
                                            </Link>
                                        </Button>
                                        <Button variant="outline" size="sm" asChild>
                                            <Link to={`/edit-event/${event.id}`}>
                                                <Edit className="w-4 h-4" />
                                            </Link>
                                        </Button>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                {/* Empty State */}
                {filteredEvents.length === 0 && (
                    <div className="text-center py-12">
                        <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-900 mb-2">No events found</h3>
                        <p className="text-gray-600 mb-4">
                            {searchQuery || statusFilter !== "all"
                                ? "Try adjusting your search or filter criteria."
                                : "You haven't created any events yet."}
                        </p>
                        <Button asChild>
                            <Link to="/create-event">Create Your First Event</Link>
                        </Button>
                    </div>
                )}

                {/* Summary Stats */}
                {events.length > 0 && (
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-4 gap-4">
                        <Card>
                            <CardContent className="p-4 text-center">
                                <div className="text-2xl font-bold text-blue-600">{events.length}</div>
                                <div className="text-sm text-gray-600">Total Events</div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="p-4 text-center">
                                <div className="text-2xl font-bold text-green-600">
                                    {events.reduce((sum, event) => sum + event.registered, 0)}
                                </div>
                                <div className="text-sm text-gray-600">Total Attendees</div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="p-4 text-center">
                                <div className="text-2xl font-bold text-purple-600">
                                    ₹{events.reduce((sum, event) => {
                                        const revenue = parseInt(event.revenue.replace(/[₹,]/g, ''));
                                        return sum + revenue;
                                    }, 0).toLocaleString()}
                                </div>
                                <div className="text-sm text-gray-600">Total Revenue</div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="p-4 text-center">
                                <div className="text-2xl font-bold text-yellow-600">
                                    {(events.reduce((sum, event) => sum + (event.avgRating || 0), 0) / events.filter(e => e.avgRating > 0).length).toFixed(1)}
                                </div>
                                <div className="text-sm text-gray-600">Avg Rating</div>
                            </CardContent>
                        </Card>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EventsConducted;