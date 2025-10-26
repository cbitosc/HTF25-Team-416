import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Navbar from "@/components/Navbar";
import { Calendar, Users, TrendingUp, Plus, Edit, Trash2, Download, Search, BarChart3, Eye, FileSpreadsheet, Mail, Phone, MapPin, Clock } from "lucide-react";
import { LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { useState } from "react";

const OrganizerDashboard = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [attendeeSearchQuery, setAttendeeSearchQuery] = useState("");
    const [attendeeEventFilter, setAttendeeEventFilter] = useState("all");
    const [selectedAttendees, setSelectedAttendees] = useState<string[]>([]);

    const stats = [
        { label: "Total Events", value: "12", change: "+2", icon: Calendar, color: "text-blue-600", bgColor: "bg-blue-50" },
        { label: "Total Attendees", value: "1,234", change: "+156", icon: Users, color: "text-orange-500", bgColor: "bg-orange-50" },
        { label: "Active Events", value: "5", change: "0", icon: TrendingUp, color: "text-blue-600", bgColor: "bg-blue-50" },
        { label: "Avg. Attendance", value: "103", change: "+12", icon: BarChart3, color: "text-orange-500", bgColor: "bg-orange-50" },
    ];

    const attendanceData = [
        { month: "Jan", attendees: 400 },
        { month: "Feb", attendees: 600 },
        { month: "Mar", attendees: 800 },
        { month: "Apr", attendees: 700 },
        { month: "May", attendees: 900 },
        { month: "Jun", attendees: 1234 },
    ];

    const eventStatusData = [
        { name: "Active", value: 5, color: "#8b5cf6" },
        { name: "Upcoming", value: 4, color: "#f97316" },
        { name: "Completed", value: 3, color: "#e5e7eb" },
    ];

    const myEvents = [
        {
            id: "1",
            title: "Tech Summit 2025",
            date: "March 15, 2025",
            attendees: 234,
            capacity: 300,
            status: "Active",
            revenue: "₹1,95,300",
        },
        {
            id: "2",
            title: "Startup Pitch Night",
            date: "April 8, 2025",
            attendees: 89,
            capacity: 150,
            status: "Active",
            revenue: "₹74,250",
        },
        {
            id: "3",
            title: "Web Dev Workshop",
            date: "February 28, 2025",
            attendees: 156,
            capacity: 200,
            status: "Completed",
            revenue: "₹1,30,200",
        },
        {
            id: "4",
            title: "AI Conference 2025",
            date: "May 20, 2025",
            attendees: 0,
            capacity: 500,
            status: "Upcoming",
            revenue: "₹0",
        },
        {
            id: "5",
            title: "Design Thinking Workshop",
            date: "June 5, 2025",
            attendees: 0,
            capacity: 100,
            status: "Upcoming",
            revenue: "₹0",
        },
    ];

    const allAttendees = [
        {
            id: "1",
            name: "John Doe",
            email: "john@example.com",
            phone: "+1 (555) 123-4567",
            event: "Tech Summit 2025",
            eventId: "1",
            registeredAt: "2025-01-15T10:30:00Z",
            status: "Confirmed",
            ticketType: "Premium",
            location: "New York, NY",
            company: "TechCorp Inc."
        },
        {
            id: "2",
            name: "Jane Smith",
            email: "jane@example.com",
            phone: "+1 (555) 987-6543",
            event: "Startup Pitch Night",
            eventId: "2",
            registeredAt: "2025-01-14T15:45:00Z",
            status: "Confirmed",
            ticketType: "Standard",
            location: "San Francisco, CA",
            company: "StartupLab"
        },
        {
            id: "3",
            name: "Mike Johnson",
            email: "mike@example.com",
            phone: "+1 (555) 456-7890",
            event: "Tech Summit 2025",
            eventId: "1",
            registeredAt: "2025-01-13T09:15:00Z",
            status: "Waitlist",
            ticketType: "Standard",
            location: "Boston, MA",
            company: "DevCorp"
        },
        {
            id: "4",
            name: "Sarah Williams",
            email: "sarah@example.com",
            phone: "+1 (555) 234-5678",
            event: "Web Dev Workshop",
            eventId: "3",
            registeredAt: "2025-01-12T14:20:00Z",
            status: "Confirmed",
            ticketType: "Early Bird",
            location: "Austin, TX",
            company: "WebSolutions"
        },
        {
            id: "5",
            name: "David Chen",
            email: "david@example.com",
            phone: "+1 (555) 345-6789",
            event: "Tech Summit 2025",
            eventId: "1",
            registeredAt: "2025-01-11T11:00:00Z",
            status: "Confirmed",
            ticketType: "Premium",
            location: "Seattle, WA",
            company: "CloudTech"
        },
        {
            id: "6",
            name: "Emma Davis",
            email: "emma@example.com",
            phone: "+1 (555) 567-8901",
            event: "Startup Pitch Night",
            eventId: "2",
            registeredAt: "2025-01-10T16:30:00Z",
            status: "Cancelled",
            ticketType: "Standard",
            location: "Los Angeles, CA",
            company: "InnovateNow"
        },
        {
            id: "7",
            name: "Alex Rodriguez",
            email: "alex@example.com",
            phone: "+1 (555) 678-9012",
            event: "Web Dev Workshop",
            eventId: "3",
            registeredAt: "2025-01-09T13:45:00Z",
            status: "Confirmed",
            ticketType: "Standard",
            location: "Miami, FL",
            company: "CodeCrafters"
        },
        {
            id: "8",
            name: "Lisa Park",
            email: "lisa@example.com",
            phone: "+1 (555) 789-0123",
            event: "AI Conference 2025",
            eventId: "4",
            registeredAt: "2025-01-08T12:15:00Z",
            status: "Pending",
            ticketType: "VIP",
            location: "Chicago, IL",
            company: "AI Innovations"
        }
    ];

    const filteredEvents = myEvents.filter(event => {
        const matchesSearch = event.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesStatus = statusFilter === "all" || event.status.toLowerCase() === statusFilter.toLowerCase();
        return matchesSearch && matchesStatus;
    });

    const filteredAttendees = allAttendees.filter(attendee => {
        const matchesSearch =
            attendee.name.toLowerCase().includes(attendeeSearchQuery.toLowerCase()) ||
            attendee.email.toLowerCase().includes(attendeeSearchQuery.toLowerCase()) ||
            attendee.company.toLowerCase().includes(attendeeSearchQuery.toLowerCase());
        const matchesEvent = attendeeEventFilter === "all" || attendee.eventId === attendeeEventFilter;
        return matchesSearch && matchesEvent;
    });

    const formatRegistrationDate = (dateString: string) => {
        const date = new Date(dateString);
        const now = new Date();
        const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));

        if (diffInHours < 1) return "Just now";
        if (diffInHours < 24) return `${diffInHours} hours ago`;
        const diffInDays = Math.floor(diffInHours / 24);
        if (diffInDays === 1) return "1 day ago";
        if (diffInDays < 7) return `${diffInDays} days ago`;
        return date.toLocaleDateString();
    };

    const exportAttendees = (format: 'csv' | 'json') => {
        const dataToExport = filteredAttendees.map(attendee => ({
            Name: attendee.name,
            Email: attendee.email,
            Phone: attendee.phone,
            Event: attendee.event,
            Company: attendee.company,
            Location: attendee.location,
            'Ticket Type': attendee.ticketType,
            Status: attendee.status,
            'Registered At': new Date(attendee.registeredAt).toLocaleString()
        }));

        if (format === 'csv') {
            const headers = Object.keys(dataToExport[0]).join(',');
            const csvContent = [
                headers,
                ...dataToExport.map(row => Object.values(row).map(val => `"${val}"`).join(','))
            ].join('\n');

            const blob = new Blob([csvContent], { type: 'text/csv' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `attendees-${new Date().toISOString().split('T')[0]}.csv`;
            link.click();
            URL.revokeObjectURL(url);
        } else {
            const jsonContent = JSON.stringify(dataToExport, null, 2);
            const blob = new Blob([jsonContent], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.href = url;
            link.download = `attendees-${new Date().toISOString().split('T')[0]}.json`;
            link.click();
            URL.revokeObjectURL(url);
        }
    };

    const toggleAttendeeSelection = (attendeeId: string) => {
        setSelectedAttendees(prev =>
            prev.includes(attendeeId)
                ? prev.filter(id => id !== attendeeId)
                : [...prev, attendeeId]
        );
    };

    const selectAllAttendees = () => {
        setSelectedAttendees(
            selectedAttendees.length === filteredAttendees.length
                ? []
                : filteredAttendees.map(a => a.id)
        );
    };

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
                                            <TableRow key={event.id}>
                                                <TableCell className="font-medium">
                                                    <Link
                                                        to={`/events/${event.id}`}
                                                        state={{ fromOrganizer: true }}
                                                        className="text-blue-600 hover:text-blue-800 hover:underline transition-colors cursor-pointer"
                                                    >
                                                        {event.title}
                                                    </Link>
                                                </TableCell>
                                                <TableCell>{event.date}</TableCell>
                                                <TableCell>
                                                    <div className="flex items-center gap-2">
                                                        <span>{event.attendees}/{event.capacity}</span>
                                                        <div className="w-20 h-2 bg-gray-200 rounded-full overflow-hidden">
                                                            <div
                                                                className="h-full bg-blue-600"
                                                                style={{ width: `${(event.attendees / event.capacity) * 100}%` }}
                                                            />
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge
                                                        className={
                                                            event.status === "Active" ? "bg-blue-100 text-blue-700 hover:bg-blue-100" :
                                                                event.status === "Upcoming" ? "bg-orange-100 text-orange-700 hover:bg-orange-100" :
                                                                    "bg-gray-100 text-gray-700 hover:bg-gray-100"
                                                        }
                                                        variant="secondary"
                                                    >
                                                        {event.status}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>{event.revenue}</TableCell>
                                                <TableCell className="text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <Button variant="ghost" size="sm" asChild>
                                                            <Link to={`/events/${event.id}`}>
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
                            {/* Attendee Management Header */}
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Attendee Management</h2>
                                    <p className="text-gray-600">Manage and export your event attendees</p>
                                </div>
                                <div className="flex gap-2 mt-4 sm:mt-0">
                                    <Button
                                        variant="outline"
                                        onClick={() => exportAttendees('csv')}
                                        className="flex items-center gap-2"
                                    >
                                        <FileSpreadsheet className="w-4 h-4" />
                                        Export CSV
                                    </Button>
                                    <Button
                                        variant="outline"
                                        onClick={() => exportAttendees('json')}
                                        className="flex items-center gap-2"
                                    >
                                        <Download className="w-4 h-4" />
                                        Export JSON
                                    </Button>
                                </div>
                            </div>

                            {/* Attendee Filters and Search */}
                            <Card className="p-6 bg-white border border-gray-200 shadow-sm">
                                <div className="flex flex-col sm:flex-row gap-4">
                                    <div className="relative flex-1">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <Input
                                            placeholder="Search by name, email, or company..."
                                            className="pl-9"
                                            value={attendeeSearchQuery}
                                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAttendeeSearchQuery(e.target.value)}
                                        />
                                    </div>
                                    <Select value={attendeeEventFilter} onValueChange={setAttendeeEventFilter}>
                                        <SelectTrigger className="w-full sm:w-[200px]">
                                            <SelectValue placeholder="Filter by Event" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="all">All Events</SelectItem>
                                            {myEvents.map((event) => (
                                                <SelectItem key={event.id} value={event.id}>{event.title}</SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                    {selectedAttendees.length > 0 && (
                                        <Button
                                            variant="destructive"
                                            size="sm"
                                            onClick={() => setSelectedAttendees([])}
                                        >
                                            Clear Selection ({selectedAttendees.length})
                                        </Button>
                                    )}
                                </div>
                            </Card>

                            {/* Attendee Statistics */}
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                                <Card className="p-4">
                                    <div className="flex items-center gap-3">
                                        <Users className="w-8 h-8 text-blue-600" />
                                        <div>
                                            <p className="text-2xl font-bold text-gray-900">{allAttendees.length}</p>
                                            <p className="text-sm text-gray-600">Total Attendees</p>
                                        </div>
                                    </div>
                                </Card>
                                <Card className="p-4">
                                    <div className="flex items-center gap-3">
                                        <Badge className="w-8 h-8 text-green-600 bg-green-100">✓</Badge>
                                        <div>
                                            <p className="text-2xl font-bold text-gray-900">
                                                {allAttendees.filter(a => a.status === 'Confirmed').length}
                                            </p>
                                            <p className="text-sm text-gray-600">Confirmed</p>
                                        </div>
                                    </div>
                                </Card>
                                <Card className="p-4">
                                    <div className="flex items-center gap-3">
                                        <Clock className="w-8 h-8 text-orange-600" />
                                        <div>
                                            <p className="text-2xl font-bold text-gray-900">
                                                {allAttendees.filter(a => a.status === 'Pending' || a.status === 'Waitlist').length}
                                            </p>
                                            <p className="text-sm text-gray-600">Pending/Waitlist</p>
                                        </div>
                                    </div>
                                </Card>
                                <Card className="p-4">
                                    <div className="flex items-center gap-3">
                                        <Trash2 className="w-8 h-8 text-red-600" />
                                        <div>
                                            <p className="text-2xl font-bold text-gray-900">
                                                {allAttendees.filter(a => a.status === 'Cancelled').length}
                                            </p>
                                            <p className="text-sm text-gray-600">Cancelled</p>
                                        </div>
                                    </div>
                                </Card>
                            </div>

                            {/* Attendees Table */}
                            <Card className="bg-white border border-gray-200 shadow-sm overflow-hidden">
                                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                                    <div>
                                        <CardTitle className="text-xl font-bold text-gray-900">
                                            All Attendees ({filteredAttendees.length})
                                        </CardTitle>
                                        <CardDescription className="text-gray-600">
                                            Complete list of attendees across all events
                                        </CardDescription>
                                    </div>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={selectAllAttendees}
                                        className="text-sm"
                                    >
                                        {selectedAttendees.length === filteredAttendees.length ? 'Deselect All' : 'Select All'}
                                    </Button>
                                </CardHeader>
                                <CardContent className="p-0">
                                    <div className="overflow-x-auto">
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead className="w-12">
                                                        <input
                                                            type="checkbox"
                                                            checked={selectedAttendees.length === filteredAttendees.length && filteredAttendees.length > 0}
                                                            onChange={selectAllAttendees}
                                                            className="rounded border-gray-300"
                                                        />
                                                    </TableHead>
                                                    <TableHead>Attendee</TableHead>
                                                    <TableHead>Contact</TableHead>
                                                    <TableHead>Event</TableHead>
                                                    <TableHead>Company</TableHead>
                                                    <TableHead>Ticket Type</TableHead>
                                                    <TableHead>Status</TableHead>
                                                    <TableHead>Registered</TableHead>
                                                    <TableHead className="text-right">Actions</TableHead>
                                                </TableRow>
                                            </TableHeader>
                                            <TableBody>
                                                {filteredAttendees.length === 0 ? (
                                                    <TableRow>
                                                        <TableCell colSpan={9} className="text-center py-8 text-gray-500">
                                                            No attendees found matching your criteria
                                                        </TableCell>
                                                    </TableRow>
                                                ) : (
                                                    filteredAttendees.map((attendee) => (
                                                        <TableRow key={attendee.id}>
                                                            <TableCell>
                                                                <input
                                                                    type="checkbox"
                                                                    checked={selectedAttendees.includes(attendee.id)}
                                                                    onChange={() => toggleAttendeeSelection(attendee.id)}
                                                                    className="rounded border-gray-300"
                                                                />
                                                            </TableCell>
                                                            <TableCell>
                                                                <div className="flex flex-col">
                                                                    <span className="font-medium text-gray-900">{attendee.name}</span>
                                                                    <div className="flex items-center gap-1 text-sm text-gray-500">
                                                                        <MapPin className="w-3 h-3" />
                                                                        {attendee.location}
                                                                    </div>
                                                                </div>
                                                            </TableCell>
                                                            <TableCell>
                                                                <div className="flex flex-col space-y-1">
                                                                    <div className="flex items-center gap-1 text-sm text-gray-600">
                                                                        <Mail className="w-3 h-3" />
                                                                        {attendee.email}
                                                                    </div>
                                                                    <div className="flex items-center gap-1 text-sm text-gray-600">
                                                                        <Phone className="w-3 h-3" />
                                                                        {attendee.phone}
                                                                    </div>
                                                                </div>
                                                            </TableCell>
                                                            <TableCell>
                                                                <span className="font-medium">{attendee.event}</span>
                                                            </TableCell>
                                                            <TableCell>
                                                                <span className="text-sm text-gray-600">{attendee.company}</span>
                                                            </TableCell>
                                                            <TableCell>
                                                                <Badge
                                                                    variant="outline"
                                                                    className={
                                                                        attendee.ticketType === "Premium" || attendee.ticketType === "VIP"
                                                                            ? "border-purple-200 text-purple-700 bg-purple-50"
                                                                            : attendee.ticketType === "Early Bird"
                                                                                ? "border-green-200 text-green-700 bg-green-50"
                                                                                : "border-gray-200 text-gray-700 bg-gray-50"
                                                                    }
                                                                >
                                                                    {attendee.ticketType}
                                                                </Badge>
                                                            </TableCell>
                                                            <TableCell>
                                                                <Badge
                                                                    className={
                                                                        attendee.status === "Confirmed" ? "bg-green-100 text-green-700 hover:bg-green-100" :
                                                                            attendee.status === "Pending" ? "bg-yellow-100 text-yellow-700 hover:bg-yellow-100" :
                                                                                attendee.status === "Waitlist" ? "bg-orange-100 text-orange-700 hover:bg-orange-100" :
                                                                                    "bg-red-100 text-red-700 hover:bg-red-100"
                                                                    }
                                                                    variant="secondary"
                                                                >
                                                                    {attendee.status}
                                                                </Badge>
                                                            </TableCell>
                                                            <TableCell className="text-sm text-gray-500">
                                                                {formatRegistrationDate(attendee.registeredAt)}
                                                            </TableCell>
                                                            <TableCell className="text-right">
                                                                <div className="flex justify-end gap-2">
                                                                    <Button variant="ghost" size="sm" title="View Details">
                                                                        <Eye className="w-4 h-4" />
                                                                    </Button>
                                                                    <Button variant="ghost" size="sm" title="Send Email">
                                                                        <Mail className="w-4 h-4" />
                                                                    </Button>
                                                                    <Button variant="ghost" size="sm" title="Edit">
                                                                        <Edit className="w-4 h-4" />
                                                                    </Button>
                                                                </div>
                                                            </TableCell>
                                                        </TableRow>
                                                    ))
                                                )}
                                            </TableBody>
                                        </Table>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="recent">
                            <Card className="bg-white border border-gray-200 shadow-sm">
                                <CardHeader>
                                    <CardTitle className="text-xl font-bold text-gray-900">Recent Activity</CardTitle>
                                    <CardDescription className="text-gray-600">Latest registrations and updates</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {allAttendees
                                            .sort((a, b) => new Date(b.registeredAt).getTime() - new Date(a.registeredAt).getTime())
                                            .slice(0, 5)
                                            .map((attendee) => (
                                                <div key={attendee.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-lg">
                                                    <div className="flex items-center gap-3">
                                                        <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                                            <Users className="w-5 h-5 text-blue-600" />
                                                        </div>
                                                        <div>
                                                            <p className="font-medium text-gray-900">{attendee.name}</p>
                                                            <p className="text-sm text-gray-600">
                                                                Registered for {attendee.event}
                                                            </p>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-sm text-gray-500">
                                                            {formatRegistrationDate(attendee.registeredAt)}
                                                        </p>
                                                        <Badge
                                                            variant="outline"
                                                            className={
                                                                attendee.status === "Confirmed" ? "border-green-200 text-green-700" :
                                                                    attendee.status === "Pending" ? "border-yellow-200 text-yellow-700" :
                                                                        "border-red-200 text-red-700"
                                                            }
                                                        >
                                                            {attendee.status}
                                                        </Badge>
                                                    </div>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    );
};

export default OrganizerDashboard;
