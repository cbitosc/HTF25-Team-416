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
import { useState } from "react";

const OrganizerDashboard = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

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
            revenue: "$2,340",
        },
        {
            id: "2",
            title: "Startup Pitch Night",
            date: "April 8, 2025",
            attendees: 89,
            capacity: 150,
            status: "Active",
            revenue: "$890",
        },
        {
            id: "3",
            title: "Web Dev Workshop",
            date: "February 28, 2025",
            attendees: 156,
            capacity: 200,
            status: "Completed",
            revenue: "$1,560",
        },
        {
            id: "4",
            title: "AI Conference 2025",
            date: "May 20, 2025",
            attendees: 0,
            capacity: 500,
            status: "Upcoming",
            revenue: "$0",
        },
        {
            id: "5",
            title: "Design Thinking Workshop",
            date: "June 5, 2025",
            attendees: 0,
            capacity: 100,
            status: "Upcoming",
            revenue: "$0",
        },
    ];

    const recentAttendees = [
        { id: "1", name: "John Doe", email: "john@example.com", event: "Tech Summit 2025", registeredAt: "2 hours ago" },
        { id: "2", name: "Jane Smith", email: "jane@example.com", event: "Startup Pitch Night", registeredAt: "5 hours ago" },
        { id: "3", name: "Mike Johnson", email: "mike@example.com", event: "Tech Summit 2025", registeredAt: "1 day ago" },
        { id: "4", name: "Sarah Williams", email: "sarah@example.com", event: "Web Dev Workshop", registeredAt: "2 days ago" },
    ];

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
                        <TabsList className="grid w-full grid-cols-2 lg:w-auto lg:inline-grid bg-white border border-gray-200">
                            <TabsTrigger value="events" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">My Events</TabsTrigger>
                            <TabsTrigger value="attendees" className="data-[state=active]:bg-blue-600 data-[state=active]:text-white">Recent Attendees</TabsTrigger>
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
                                                <TableCell className="font-medium">{event.title}</TableCell>
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
                                                        <Button variant="ghost" size="sm">
                                                            <Eye className="w-4 h-4" />
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

                        <TabsContent value="attendees">
                            <Card className="bg-white border border-gray-200 shadow-sm">
                                <CardHeader>
                                    <CardTitle className="text-xl font-bold text-gray-900">Recent Attendees</CardTitle>
                                    <CardDescription className="text-gray-600">Latest attendees who registered for your events</CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead>Name</TableHead>
                                                <TableHead>Email</TableHead>
                                                <TableHead>Event</TableHead>
                                                <TableHead>Registered</TableHead>
                                                <TableHead className="text-right">Actions</TableHead>
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {recentAttendees.map((attendee) => (
                                                <TableRow key={attendee.id}>
                                                    <TableCell className="font-medium">{attendee.name}</TableCell>
                                                    <TableCell>{attendee.email}</TableCell>
                                                    <TableCell>{attendee.event}</TableCell>
                                                    <TableCell className="text-gray-500">{attendee.registeredAt}</TableCell>
                                                    <TableCell className="text-right">
                                                        <Button variant="ghost" size="sm">
                                                            <Eye className="w-4 h-4" />
                                                        </Button>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
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
