import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navbar from "@/components/Navbar";
import { Calendar, Users, TrendingUp, Plus, Edit, Trash2, Download, Search, BarChart3, Eye } from "lucide-react";
import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useState, useEffect, useMemo } from "react";

const OrganizerDashboard = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [myEvents, setMyEvents] = useState<any[]>([]);

    // Fetch events from API
    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    return;
                }

                const response = await fetch('http://localhost:5000/api/events', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });

                if (response.ok) {
                    const events = await response.json();
                    // Filter events to show only those created by the current organizer
                    const user = JSON.parse(localStorage.getItem('user') || '{}');
                    const organizerEvents = events.filter((event: any) =>
                        event.organizer._id === user.id || event.organizer === user.id
                    );
                    setMyEvents(organizerEvents);
                }
            } catch (error) {
                console.error('Error fetching events:', error);
            }
        };

        fetchEvents();
    }, []);

    // Calculate dynamic stats based on real event data
    const stats = useMemo(() => {
        const totalEvents = myEvents.length;
        const totalAttendees = myEvents.reduce((sum, event) => sum + (event.attendees || 0), 0);
        const activeEvents = myEvents.filter(event => event.status === 'Active').length;
        const avgAttendance = totalEvents > 0 ? Math.round(totalAttendees / totalEvents) : 0;

        return [
            {
                label: "Total Events",
                value: totalEvents.toString(),
                change: "+2",
                icon: Calendar,
                color: "text-blue-600",
                bgColor: "bg-blue-50"
            },
            {
                label: "Total Attendees",
                value: totalAttendees.toString(),
                change: "+156",
                icon: Users,
                color: "text-orange-500",
                bgColor: "bg-orange-50"
            },
            {
                label: "Active Events",
                value: activeEvents.toString(),
                change: "0",
                icon: TrendingUp,
                color: "text-blue-600",
                bgColor: "bg-blue-50"
            },
            {
                label: "Avg. Attendance",
                value: avgAttendance.toString(),
                change: "+12",
                icon: BarChart3,
                color: "text-orange-500",
                bgColor: "bg-orange-50"
            },
        ];
    }, [myEvents]);

    // Calculate dynamic attendance data from real event attendee counts
    const attendanceData = useMemo(() => {
        const monthlyData: { [key: string]: number } = {};
        const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

        // Initialize all months with 0
        months.forEach(month => {
            monthlyData[month] = 0;
        });

        // Count attendees by month based on event creation date
        myEvents.forEach(event => {
            const date = new Date(event.createdAt || event.date);
            const monthName = months[date.getMonth()];
            monthlyData[monthName] = (monthlyData[monthName] || 0) + (event.attendees || 0);
        });

        // Convert to cumulative data (running total)
        let cumulative = 0;
        return months.map(month => ({
            month,
            attendees: cumulative += monthlyData[month]
        }));
    }, [myEvents]);

    // Calculate dynamic event status data
    const eventStatusData = useMemo(() => {
        const statusCounts: { [key: string]: number } = {};

        // Count events by status
        myEvents.forEach(event => {
            const status = event.status.toLowerCase();
            statusCounts[status] = (statusCounts[status] || 0) + 1;
        });

        // Convert to pie chart format with colors
        const statusColors: { [key: string]: string } = {
            active: "#8b5cf6",
            upcoming: "#f97316",
            completed: "#e5e7eb",
            cancelled: "#ef4444"
        };

        return Object.entries(statusCounts).map(([status, count]) => ({
            name: status.charAt(0).toUpperCase() + status.slice(1),
            value: count,
            color: statusColors[status] || "#6b7280"
        }));
    }, [myEvents]);

    const filteredEvents = myEvents.filter(event => {
        const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === "all" || event.status.toLowerCase() === statusFilter.toLowerCase();
        return matchesSearch && matchesStatus;
    });

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />            <div className="pt-24 pb-20">
                <div className="container mx-auto px-4">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">
                                Organizer Dashboard
                            </h1>
                            <p className="text-gray-600">Track performance, manage events, and grow your audience</p>
                        </div>
                        <Button className="mt-6 md:mt-0 bg-blue-600 hover:bg-blue-700 text-white" asChild>
                            <Link to="/create-event">
                                <Plus className="w-4 h-4 mr-2" />
                                Create New Event
                            </Link>
                        </Button>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                        {stats.map((stat) => (
                            <Card key={stat.label} className="p-6 bg-white border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                                <div className="flex items-center justify-between mb-4">
                                    <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                                        <stat.icon className={`w-6 h-6 ${stat.color}`} />
                                    </div>
                                    <span className="text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded">
                                        {stat.change.startsWith("+") ? "↗" : stat.change === "0" ? "→" : "↘"} {stat.change}
                                    </span>
                                </div>
                                <p className="text-3xl font-bold text-gray-900 mb-1">{stat.value}</p>
                                <p className="text-sm text-gray-600">{stat.label}</p>
                            </Card>
                        ))}
                    </div>

                    {/* Analytics Section */}
                    <div className="grid lg:grid-cols-3 gap-8 mb-8">
                        <Card className="lg:col-span-2 bg-white border border-gray-200 shadow-sm">
                            <CardHeader className="pb-4">
                                <CardTitle className="text-xl font-bold text-gray-900">Attendance Trends</CardTitle>
                                <CardDescription className="text-gray-600">Monthly attendance growth over time</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ResponsiveContainer width="100%" height={300}>
                                    <LineChart data={attendanceData}>
                                        <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
                                        <XAxis dataKey="month" stroke="#9ca3af" />
                                        <YAxis stroke="#9ca3af" />
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: "white",
                                                border: "1px solid #e5e7eb",
                                                borderRadius: "8px",
                                            }}
                                        />
                                        <Line type="monotone" dataKey="attendees" stroke="#8b5cf6" strokeWidth={3} />
                                    </LineChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>

                        <Card className="bg-white border border-gray-200 shadow-sm">
                            <CardHeader className="pb-4">
                                <CardTitle className="text-xl font-bold text-gray-900">Event Status</CardTitle>
                                <CardDescription className="text-gray-600">Distribution of event statuses</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <ResponsiveContainer width="100%" height={300}>
                                    <PieChart>
                                        <Pie
                                            data={eventStatusData}
                                            cx="50%"
                                            cy="50%"
                                            labelLine={false}
                                            label={({ name, value }) => `${name}: ${value}`}
                                            outerRadius={80}
                                            fill="#8b5cf6"
                                            dataKey="value"
                                        >
                                            {eventStatusData.map((entry, index) => (
                                                <Cell key={`cell-${index}`} fill={entry.color} />
                                            ))}
                                        </Pie>
                                        <Tooltip
                                            contentStyle={{
                                                backgroundColor: "white",
                                                border: "1px solid #e5e7eb",
                                                borderRadius: "8px",
                                            }}
                                        />
                                    </PieChart>
                                </ResponsiveContainer>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Main Content Tabs */}
                    <Tabs defaultValue="events" className="space-y-6">
                        <TabsList className="grid w-full grid-cols-3 lg:w-auto lg:inline-grid bg-white border border-gray-200">
                            <TabsTrigger value="events" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">My Events</TabsTrigger>
                            <TabsTrigger value="attendees" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">Attendee Management</TabsTrigger>
                            <TabsTrigger value="recent" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">Recent Activity</TabsTrigger>
                        </TabsList>

                        <TabsContent value="events" className="space-y-6">
                            {/* Event Filters */}
                            <Card className="p-6 bg-white border border-gray-200 shadow-sm">
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <div className="relative flex-1">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <Input
                                            placeholder="Search events..."
                                            className="pl-9"
                                            value={searchQuery}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                                        />
                                    </div>
                                    <Select value={statusFilter} onValueChange={setStatusFilter}>
                                        <SelectTrigger className="w-full sm:w-[180px]">
                                            <SelectValue placeholder="All Events" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All Events</SelectItem>
                                            <SelectItem value="active">Active</SelectItem>
                                            <SelectItem value="upcoming">Upcoming</SelectItem>
                                            <SelectItem value="completed">Completed</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </Card>

                            {/* Events Table */}
                            <Card className="bg-white border border-gray-200 shadow-sm overflow-hidden">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Event</TableHead>
                                            <TableHead>Date</TableHead>
                                            <TableHead>Attendees</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead>Revenue</TableHead>
                                            <TableHead className="text-right">Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {filteredEvents.map((event) => (
                                            <TableRow key={event._id}>
                                                <TableCell className="font-medium">
                                                    <Link
                                                        to={`/events/${event._id}`}
                                                        state={{ fromOrganizer: true }}
                                                        className="text-blue-600 hover:text-blue-800 hover:underline transition-colors cursor-pointer"
                                                    >
                                                        {event.title}
                                                    </Link>
                                                </TableCell>
                                                <TableCell>{new Date(event.date).toLocaleDateString()}</TableCell>
                                                <TableCell>
                                                    <div className="flex items-center gap-2">
                                                        <span>{event.attendees || 0}/{event.capacity || '∞'}</span>
                                                        <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                                                            <div
                                                                className="h-full bg-blue-600"
                                                                style={{ width: `${event.capacity ? ((event.attendees || 0) / event.capacity) * 100 : 0}%` }}
                                                            />
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge
                                                        className={
                                                            event.status === "Active" ? "bg-blue-100 text-blue-700 hover:bg-blue-100" :
                                                                event.status === "Upcoming" ? "bg-orange-100 text-orange-700 hover:bg-orange-100" :
                                                                    event.status === "Completed" ? "bg-gray-100 text-gray-700 hover:bg-gray-100" :
                                                                        "bg-red-100 text-red-700 hover:bg-red-100"
                                                        }
                                                        variant="secondary"
                                                    >
                                                        {event.status}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>₹{(event.price || 0) * (event.attendees || 0)}</TableCell>
                                                <TableCell className="text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <Button variant="ghost" size="sm" asChild>
                                                            <Link to={`/events/${event._id}`}>
                                                                <Eye className="w-4 h-4" />
                                                            </Link>
                                                        </Button>
                                                        <Button variant="ghost" size="sm">
                                                            <Edit className="w-4 h-4" />
                                                        </Button>
                                                        <Button variant="ghost" size="sm">
                                                            <Download className="w-4 h-4" />
                                                        </Button>
                                                        <Button variant="ghost" size="sm" className="text-destructive hover:text-destructive">
                                                            <Trash2 className="w-4 h-4" />
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </Card>
                        </TabsContent>

                        <TabsContent value="attendees" className="space-y-6">
                            {/* Attendee Management Placeholder */}
                            <Card className="p-8 bg-white border border-gray-200 shadow-sm text-center">
                                <Users className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">Attendee Management Coming Soon</h3>
                                <p className="text-gray-600 mb-4">
                                    Attendee management features will be available once the RSVP system is implemented.
                                </p>
                                <p className="text-sm text-gray-500">
                                    This section will allow you to view, manage, and export attendee data for your events.
                                </p>
                            </Card>
                        </TabsContent>

                        <TabsContent value="recent">
                            <Card className="p-8 bg-white border border-gray-200 shadow-sm text-center">
                                <Calendar className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">Recent Activity Coming Soon</h3>
                                <p className="text-gray-600 mb-4">
                                    Recent activity features will be available once the RSVP system is implemented.
                                </p>
                                <p className="text-sm text-gray-500">
                                    This section will show the latest attendee registrations and event updates.
                                </p>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    );
};

export default OrganizerDashboard;
