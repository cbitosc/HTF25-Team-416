import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileSpreadsheet, Download, Search, Users, Mail, Phone, MapPin, Clock, Edit, Eye, Trash2 } from "lucide-react";

interface Attendee {
    id: string;
    name: string;
    email: string;
    phone: string;
    event: string;
    eventId: string;
    registeredAt: string;
    status: string;
    ticketType: string;
    location: string;
    company: string;
}

interface Event {
    id: string;
    title: string;
}

interface AttendeeManagementProps {
    attendees: Attendee[];
    events: Event[];
}

export const AttendeeManagement = ({ attendees, events }: AttendeeManagementProps) => {
    const [searchQuery, setSearchQuery] = useState("");
    const [eventFilter, setEventFilter] = useState("all");
    const [selectedAttendees, setSelectedAttendees] = useState<string[]>([]);

    const filteredAttendees = attendees.filter(attendee => {
        const matchesSearch =
            attendee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            attendee.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
            attendee.company.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesEvent = eventFilter === "all" || attendee.eventId === eventFilter;
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

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Confirmed": return "bg-green-100 text-green-700 hover:bg-green-100";
            case "Pending": return "bg-yellow-100 text-yellow-700 hover:bg-yellow-100";
            case "Waitlist": return "bg-orange-100 text-orange-700 hover:bg-orange-100";
            case "Cancelled": return "bg-red-100 text-red-700 hover:bg-red-100";
            default: return "bg-gray-100 text-gray-700 hover:bg-gray-100";
        }
    };

    const getTicketTypeColor = (ticketType: string) => {
        switch (ticketType) {
            case "Premium":
            case "VIP":
                return "border-purple-200 text-purple-700 bg-purple-50";
            case "Early Bird":
                return "border-green-200 text-green-700 bg-green-50";
            default:
                return "border-gray-200 text-gray-700 bg-gray-50";
        }
    };

    return (
        <div className="space-y-6">
            {/* Header */}
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

            {/* Filters and Search */}
            <Card className="p-6 bg-white border border-gray-200 shadow-sm">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                            placeholder="Search by name, email, or company..."
                            className="pl-9"
                            value={searchQuery}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <Select value={eventFilter} onValueChange={setEventFilter}>
                        <SelectTrigger className="w-full sm:w-[200px]">
                            <SelectValue placeholder="Filter by Event" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Events</SelectItem>
                            {events.map((event) => (
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

            {/* Statistics */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <Card className="p-4">
                    <div className="flex items-center gap-3">
                        <Users className="w-8 h-8 text-blue-600" />
                        <div>
                            <p className="text-2xl font-bold text-gray-900">{attendees.length}</p>
                            <p className="text-sm text-gray-600">Total Attendees</p>
                        </div>
                    </div>
                </Card>
                <Card className="p-4">
                    <div className="flex items-center gap-3">
                        <Badge className="w-8 h-8 text-green-600 bg-green-100">✓</Badge>
                        <div>
                            <p className="text-2xl font-bold text-gray-900">
                                {attendees.filter(a => a.status === 'Confirmed').length}
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
                                {attendees.filter(a => a.status === 'Pending' || a.status === 'Waitlist').length}
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
                                {attendees.filter(a => a.status === 'Cancelled').length}
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
                                                    className={getTicketTypeColor(attendee.ticketType)}
                                                >
                                                    {attendee.ticketType}
                                                </Badge>
                                            </TableCell>
                                            <TableCell>
                                                <Badge
                                                    className={getStatusColor(attendee.status)}
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
        </div>
    );
};