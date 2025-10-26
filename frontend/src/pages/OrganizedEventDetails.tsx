import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Navbar from "@/components/Navbar";
import {
    Calendar,
    MapPin,
    Clock,
    Users,
    DollarSign,
    Star,
    MessageSquare,
    Download,
    Mail,
    Eye
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

const OrganizedEventDetails = () => {
    const { id } = useParams();
    const [event, setEvent] = useState<any>(null);
    const [attendees, setAttendees] = useState<any[]>([]);
    const [feedback, setFeedback] = useState<any[]>([]);
    const [ticketStats, setTicketStats] = useState<any>(null);

    useEffect(() => {
        // Mock event data (in real app, fetch from API)
        const mockEvent = {
            id: "1",
            title: "Tech Summit 2025",
            description: "Join industry leaders for an inspiring day of innovation, networking, and cutting-edge technology discussions. This comprehensive summit will feature keynote speeches from renowned tech pioneers, interactive workshops, and networking sessions designed to foster collaboration and inspire innovation.",
            date: "March 15, 2025",
            time: "9:00 AM - 6:00 PM",
            venue: "Convention Center, Hyderabad",
            capacity: 300,
            registered: 234,
            price: 2100,
            status: "Active",
            type: "physical",
            organizerId: "hXjgR4XsiB",
            revenue: "₹4,93,400",
            avgRating: 4.7,
            totalFeedback: 89
        };

        // Mock attendees data
        const mockAttendees = [
            {
                id: "1",
                name: "John Doe",
                email: "john.doe@example.com",
                phone: "+91 98765 43210",
                company: "Tech Solutions Inc.",
                registrationDate: "2025-01-15",
                ticketId: "TKT-001",
                status: "confirmed",
                paymentStatus: "paid"
            },
            {
                id: "2",
                name: "Jane Smith",
                email: "jane.smith@example.com",
                phone: "+91 87654 32109",
                company: "Innovation Labs",
                registrationDate: "2025-01-20",
                ticketId: "TKT-002",
                status: "confirmed",
                paymentStatus: "paid"
            },
            {
                id: "3",
                name: "Mike Johnson",
                email: "mike.johnson@example.com",
                phone: "+91 76543 21098",
                company: "StartupXYZ",
                registrationDate: "2025-02-01",
                ticketId: "TKT-003",
                status: "confirmed",
                paymentStatus: "paid"
            },
            {
                id: "4",
                name: "Sarah Wilson",
                email: "sarah.wilson@example.com",
                phone: "+91 65432 10987",
                company: "Digital Dynamics",
                registrationDate: "2025-02-05",
                ticketId: "TKT-004",
                status: "confirmed",
                paymentStatus: "paid"
            },
            {
                id: "5",
                name: "David Brown",
                email: "david.brown@example.com",
                phone: "+91 54321 09876",
                company: "Future Tech Corp",
                registrationDate: "2025-02-10",
                ticketId: "TKT-005",
                status: "confirmed",
                paymentStatus: "paid"
            },
            {
                id: "6",
                name: "Emily Davis",
                email: "emily.davis@example.com",
                phone: "+91 43210 98765",
                company: "Code Masters Ltd",
                registrationDate: "2025-02-15",
                ticketId: "TKT-006",
                status: "confirmed",
                paymentStatus: "paid"
            },
            {
                id: "7",
                name: "Robert Taylor",
                email: "robert.taylor@example.com",
                phone: "+91 32109 87654",
                company: "Innovate Solutions",
                registrationDate: "2025-02-20",
                ticketId: "TKT-007",
                status: "confirmed",
                paymentStatus: "paid"
            },
            {
                id: "8",
                name: "Lisa Anderson",
                email: "lisa.anderson@example.com",
                phone: "+91 21098 76543",
                company: "Tech Pioneers Inc",
                registrationDate: "2025-02-25",
                ticketId: "TKT-008",
                status: "confirmed",
                paymentStatus: "paid"
            }
        ];

        // Mock feedback data
        const mockFeedback = [
            {
                id: "1",
                attendeeName: "John Doe",
                rating: 5,
                comment: "Excellent event! Great speakers and networking opportunities. Will definitely attend next year.",
                date: "2025-03-16",
                helpful: 12
            },
            {
                id: "2",
                attendeeName: "Jane Smith",
                rating: 4,
                comment: "Very well organized. The workshops were particularly helpful. Minor issue with registration process.",
                date: "2025-03-17",
                helpful: 8
            },
            {
                id: "3",
                attendeeName: "Mike Johnson",
                rating: 5,
                comment: "Outstanding event! The keynote speakers were world-class. Great venue and facilities.",
                date: "2025-03-18",
                helpful: 15
            },
            {
                id: "4",
                attendeeName: "Sarah Wilson",
                rating: 4,
                comment: "Great content and valuable insights. The networking sessions were particularly beneficial for my business.",
                date: "2025-03-19",
                helpful: 9
            },
            {
                id: "5",
                attendeeName: "David Brown",
                rating: 5,
                comment: "One of the best tech events I've attended. The speakers were knowledgeable and the organization was flawless.",
                date: "2025-03-20",
                helpful: 11
            },
            {
                id: "6",
                attendeeName: "Emily Davis",
                rating: 4,
                comment: "Good event overall. Would have liked more hands-on sessions, but the content was solid.",
                date: "2025-03-21",
                helpful: 6
            },
            {
                id: "7",
                attendeeName: "Robert Taylor",
                rating: 5,
                comment: "Exceptional event! Made great connections and learned a lot. Highly recommend to fellow professionals.",
                date: "2025-03-22",
                helpful: 14
            },
            {
                id: "8",
                attendeeName: "Lisa Anderson",
                rating: 4,
                comment: "Well-structured event with diverse topics. The venue was excellent and the catering was good.",
                date: "2025-03-23",
                helpful: 7
            }
        ];

        // Mock ticket statistics
        const mockTicketStats = {
            totalSold: 234,
            totalRevenue: "₹4,93,400",
            avgPrice: "₹2,100",
            soldByDate: [
                { date: "Jan 15", tickets: 45 },
                { date: "Jan 20", tickets: 67 },
                { date: "Feb 01", tickets: 89 },
                { date: "Feb 15", tickets: 33 }
            ]
        };

        setEvent(mockEvent);
        setAttendees(mockAttendees);
        setFeedback(mockFeedback);
        setTicketStats(mockTicketStats);
    }, [id]);

    const exportAttendees = () => {
        // Mock export functionality
        const csvContent = "Name,Email,Phone,Company,Registration Date,Ticket ID,Status\n" +
            attendees.map(attendee =>
                `${attendee.name},${attendee.email},${attendee.phone},${attendee.company},${attendee.registrationDate},${attendee.ticketId},${attendee.status}`
            ).join("\n");

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${event?.title}_attendees.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
    };

    if (!event) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Navbar />
                <div className="container mx-auto px-4 py-8">
                    <div className="animate-pulse">
                        <div className="h-8 bg-gray-200 rounded w-1/4 mb-4"></div>
                        <div className="h-64 bg-gray-200 rounded mb-4"></div>
                        <div className="h-32 bg-gray-200 rounded"></div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="container mx-auto px-4 py-8">
                {/* Header */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <div>
                            <h1 className="text-3xl font-bold text-gray-900 mb-2">{event.title}</h1>
                            <div className="flex items-center gap-4 text-gray-600">
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4" />
                                    <span>{event.date}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Clock className="w-4 h-4" />
                                    <span>{event.time}</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <MapPin className="w-4 h-4" />
                                    <span>{event.venue}</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            <Button variant="outline" onClick={exportAttendees}>
                                <Download className="w-4 h-4 mr-2" />
                                Export Attendees
                            </Button>
                            <Button>
                                <Mail className="w-4 h-4 mr-2" />
                                Send Announcement
                            </Button>
                        </div>
                    </div>

                    {/* Event Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                        <Card>
                            <CardContent className="p-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-600">Total Attendees</p>
                                        <p className="text-2xl font-bold">{event.registered}/{event.capacity}</p>
                                    </div>
                                    <Users className="w-8 h-8 text-blue-600" />
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="p-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-600">Revenue</p>
                                        <p className="text-2xl font-bold">{event.revenue}</p>
                                    </div>
                                    <DollarSign className="w-8 h-8 text-green-600" />
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="p-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-600">Avg Rating</p>
                                        <p className="text-2xl font-bold">{event.avgRating}/5</p>
                                    </div>
                                    <Star className="w-8 h-8 text-yellow-600" />
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="p-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-sm text-gray-600">Feedback</p>
                                        <p className="text-2xl font-bold">{event.totalFeedback}</p>
                                    </div>
                                    <MessageSquare className="w-8 h-8 text-purple-600" />
                                </div>
                            </CardContent>
                        </Card>
                    </div>
                </div>

                {/* Tabs */}
                <Tabs defaultValue="attendees" className="w-full">
                    <TabsList className="grid w-full grid-cols-4">
                        <TabsTrigger value="attendees">Attendees ({attendees.length})</TabsTrigger>
                        <TabsTrigger value="tickets">Ticket Sales</TabsTrigger>
                        <TabsTrigger value="feedback">Feedback ({feedback.length})</TabsTrigger>
                        <TabsTrigger value="analytics">Analytics</TabsTrigger>
                    </TabsList>

                    {/* Attendees Tab */}
                    <TabsContent value="attendees" className="mt-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Registered Attendees</CardTitle>
                                <CardDescription>
                                    Manage and view all registered attendees for this event
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead>Name</TableHead>
                                            <TableHead>Email</TableHead>
                                            <TableHead>Phone</TableHead>
                                            <TableHead>Company</TableHead>
                                            <TableHead>Registration Date</TableHead>
                                            <TableHead>Ticket ID</TableHead>
                                            <TableHead>Status</TableHead>
                                            <TableHead>Actions</TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {attendees.map((attendee) => (
                                            <TableRow key={attendee.id}>
                                                <TableCell>
                                                    <div className="flex items-center gap-2">
                                                        <Avatar className="w-8 h-8">
                                                            <AvatarFallback>
                                                                {attendee.name.split(' ').map((n: string) => n[0]).join('')}
                                                            </AvatarFallback>
                                                        </Avatar>
                                                        <span className="font-medium">{attendee.name}</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell>{attendee.email}</TableCell>
                                                <TableCell>{attendee.phone}</TableCell>
                                                <TableCell>{attendee.company}</TableCell>
                                                <TableCell>{attendee.registrationDate}</TableCell>
                                                <TableCell>
                                                    <Badge variant="outline">{attendee.ticketId}</Badge>
                                                </TableCell>
                                                <TableCell>
                                                    <Badge variant={attendee.status === 'confirmed' ? 'default' : 'secondary'}>
                                                        {attendee.status}
                                                    </Badge>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex gap-2">
                                                        <Button variant="outline" size="sm">
                                                            <Mail className="w-4 h-4" />
                                                        </Button>
                                                        <Button variant="outline" size="sm">
                                                            <Eye className="w-4 h-4" />
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Ticket Sales Tab */}
                    <TabsContent value="tickets" className="mt-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Ticket Statistics</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div className="flex justify-between">
                                            <span>Total Sold:</span>
                                            <span className="font-bold">{ticketStats?.totalSold}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Total Revenue:</span>
                                            <span className="font-bold text-green-600">{ticketStats?.totalRevenue}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Average Price:</span>
                                            <span className="font-bold">{ticketStats?.avgPrice}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Remaining:</span>
                                            <span className="font-bold">{event.capacity - event.registered}</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            <Card className="md:col-span-2">
                                <CardHeader>
                                    <CardTitle>Sales Trend</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ResponsiveContainer width="100%" height={200}>
                                        <LineChart data={ticketStats?.soldByDate}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="date" />
                                            <YAxis />
                                            <Tooltip />
                                            <Line type="monotone" dataKey="tickets" stroke="#8b5cf6" strokeWidth={2} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>

                    {/* Feedback Tab */}
                    <TabsContent value="feedback" className="mt-6">
                        <Card>
                            <CardHeader>
                                <CardTitle>Attendee Feedback</CardTitle>
                                <CardDescription>
                                    View and manage feedback from event attendees
                                </CardDescription>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {feedback.map((item) => (
                                        <Card key={item.id}>
                                            <CardContent className="p-4">
                                                <div className="flex items-start justify-between mb-2">
                                                    <div className="flex items-center gap-2">
                                                        <Avatar className="w-8 h-8">
                                                            <AvatarFallback>
                                                                {item.attendeeName.split(' ').map((n: string) => n[0]).join('')}
                                                            </AvatarFallback>
                                                        </Avatar>
                                                        <div>
                                                            <p className="font-medium">{item.attendeeName}</p>
                                                            <p className="text-sm text-gray-500">{item.date}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-1">
                                                        {[...Array(5)].map((_, i) => (
                                                            <Star
                                                                key={i}
                                                                className={`w-4 h-4 ${i < item.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                                                    }`}
                                                            />
                                                        ))}
                                                        <span className="ml-1 text-sm text-gray-600">({item.rating})</span>
                                                    </div>
                                                </div>
                                                <p className="text-gray-700 mb-2">{item.comment}</p>
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm text-gray-500">{item.helpful} people found this helpful</span>
                                                    <Button variant="outline" size="sm">
                                                        <MessageSquare className="w-4 h-4 mr-1" />
                                                        Reply
                                                    </Button>
                                                </div>
                                            </CardContent>
                                        </Card>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    {/* Analytics Tab */}
                    <TabsContent value="analytics" className="mt-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Registration Trends</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <ResponsiveContainer width="100%" height={200}>
                                        <LineChart data={ticketStats?.soldByDate}>
                                            <CartesianGrid strokeDasharray="3 3" />
                                            <XAxis dataKey="date" />
                                            <YAxis />
                                            <Tooltip />
                                            <Line type="monotone" dataKey="tickets" stroke="#3b82f6" strokeWidth={2} />
                                        </LineChart>
                                    </ResponsiveContainer>
                                </CardContent>
                            </Card>

                            <Card>
                                <CardHeader>
                                    <CardTitle>Event Performance</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        <div className="flex justify-between">
                                            <span>Capacity Utilization:</span>
                                            <span className="font-bold">{Math.round((event.registered / event.capacity) * 100)}%</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Revenue Generated:</span>
                                            <span className="font-bold text-green-600">{event.revenue}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Average Rating:</span>
                                            <span className="font-bold">{event.avgRating}/5</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span>Feedback Count:</span>
                                            <span className="font-bold">{event.totalFeedback}</span>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    );
};

export default OrganizedEventDetails;