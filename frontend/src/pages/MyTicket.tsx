import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import { Calendar, MapPin, Clock, Download, Share2, QrCode, CheckCircle, Mail, Phone, Building, User } from "lucide-react";
import { toast } from "sonner";

const MyTicket = () => {
    const { ticketId } = useParams();
    const navigate = useNavigate();
    const [ticket, setTicket] = useState<any>(null);
    const [qrCodeUrl, setQrCodeUrl] = useState<string>("");

    useEffect(() => {
        // Get ticket from localStorage (in real app, fetch from API)
        const registrations = JSON.parse(localStorage.getItem('userRegistrations') || '[]');
        const foundTicket = registrations.find((reg: any) => reg.ticketId === ticketId);

        if (foundTicket) {
            setTicket(foundTicket);
            // Generate QR code URL (using a QR code service)
            const qrData = JSON.stringify({
                ticketId: foundTicket.ticketId,
                eventId: foundTicket.eventId,
                attendeeName: foundTicket.name,
                attendeeEmail: foundTicket.email
            });
            // Using qr-server.com for demo (in production, use your own QR generator)
            setQrCodeUrl(`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${encodeURIComponent(qrData)}`);
        }
    }, [ticketId]);

    const handleDownloadTicket = () => {
        toast.success("Ticket downloaded successfully!");
        // In real app, generate and download PDF ticket
    };

    const handleShareTicket = () => {
        if (navigator.share && ticket) {
            navigator.share({
                title: `My ticket for ${ticket.eventTitle}`,
                text: `I'm attending ${ticket.eventTitle} on ${ticket.eventDate}`,
                url: window.location.href
            }).catch(() => {
                // Fallback to copying to clipboard
                navigator.clipboard.writeText(window.location.href);
                toast.success("Ticket link copied to clipboard!");
            });
        } else {
            navigator.clipboard.writeText(window.location.href);
            toast.success("Ticket link copied to clipboard!");
        }
    };

    const handleAddToCalendar = () => {
        if (!ticket) return;

        const startDate = new Date(ticket.eventDate).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
        const endDate = new Date(new Date(ticket.eventDate).getTime() + 8 * 60 * 60 * 1000).toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';

        const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(ticket.eventTitle)}&dates=${startDate}/${endDate}&details=${encodeURIComponent('Event registration confirmed. Ticket ID: ' + ticket.ticketId)}&location=${encodeURIComponent(ticket.eventVenue)}`;

        window.open(calendarUrl, '_blank');
        toast.success("Opening calendar...");
    };

    if (!ticket) {
        return (
            <div className="min-h-screen bg-background">
                <Navbar />
                <div className="pt-24 pb-20">
                    <div className="container mx-auto px-4 max-w-3xl text-center">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <QrCode className="w-8 h-8 text-red-600" />
                        </div>
                        <h1 className="text-3xl font-bold mb-4">Ticket Not Found</h1>
                        <p className="text-muted-foreground mb-8">The ticket you're looking for doesn't exist or may have been deleted.</p>
                        <Button onClick={() => navigate("/my-events")}>
                            View My Events
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            weekday: 'long',
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const formatTime = (dateString: string) => {
        return new Date(dateString).toLocaleTimeString('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
        });
    };

    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            <div className="pt-24 pb-20">
                <div className="container mx-auto px-4 max-w-4xl">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <CheckCircle className="w-8 h-8 text-green-600" />
                        </div>
                        <h1 className="text-3xl font-bold mb-2">Your Event Ticket</h1>
                        <p className="text-muted-foreground">
                            Registration confirmed! Present this QR code at the event for entry.
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* QR Code Section */}
                        <div className="lg:col-span-1">
                            <Card>
                                <CardHeader className="text-center">
                                    <CardTitle className="flex items-center justify-center gap-2">
                                        <QrCode className="w-5 h-5" />
                                        Entry QR Code
                                    </CardTitle>
                                    <CardDescription>
                                        Scan this code at the event entrance
                                    </CardDescription>
                                </CardHeader>
                                <CardContent className="text-center">
                                    <div className="bg-white p-4 rounded-lg inline-block border-2 border-dashed border-border">
                                        {qrCodeUrl && (
                                            <img
                                                src={qrCodeUrl}
                                                alt="QR Code"
                                                className="w-48 h-48 mx-auto"
                                            />
                                        )}
                                    </div>
                                    <div className="mt-4 text-sm text-muted-foreground">
                                        <p className="font-mono bg-muted p-2 rounded">
                                            ID: {ticket.ticketId}
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Ticket Details */}
                        <div className="lg:col-span-2 space-y-6">
                            {/* Event Information */}
                            <Card>
                                <CardHeader>
                                    <div className="flex items-start justify-between">
                                        <div>
                                            <CardTitle className="text-2xl">{ticket.eventTitle}</CardTitle>
                                            <CardDescription className="mt-2">
                                                Registered on {new Date(ticket.registeredAt).toLocaleDateString()}
                                            </CardDescription>
                                        </div>
                                        <Badge
                                            className={
                                                ticket.status === 'Confirmed'
                                                    ? "bg-green-100 text-green-700 hover:bg-green-100"
                                                    : "bg-yellow-100 text-yellow-700 hover:bg-yellow-100"
                                            }
                                            variant="secondary"
                                        >
                                            {ticket.status}
                                        </Badge>
                                    </div>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div className="flex items-start gap-3">
                                            <Calendar className="w-5 h-5 text-primary mt-0.5" />
                                            <div>
                                                <p className="font-medium">Event Date</p>
                                                <p className="text-sm text-muted-foreground">
                                                    {formatDate(ticket.eventDate)}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-3">
                                            <Clock className="w-5 h-5 text-primary mt-0.5" />
                                            <div>
                                                <p className="font-medium">Event Time</p>
                                                <p className="text-sm text-muted-foreground">
                                                    {formatTime(ticket.eventDate)}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex items-start gap-3">
                                        <MapPin className="w-5 h-5 text-accent mt-0.5" />
                                        <div>
                                            <p className="font-medium">Venue</p>
                                            <p className="text-sm text-muted-foreground">{ticket.eventVenue}</p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Attendee Information */}
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <User className="w-5 h-5" />
                                        Attendee Information
                                    </CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid md:grid-cols-2 gap-4">
                                        <div className="space-y-3">
                                            <div>
                                                <p className="text-sm font-medium text-muted-foreground">Full Name</p>
                                                <p className="font-medium">{ticket.name}</p>
                                            </div>

                                            <div className="flex items-center gap-2">
                                                <Mail className="w-4 h-4 text-muted-foreground" />
                                                <div>
                                                    <p className="text-sm font-medium text-muted-foreground">Email</p>
                                                    <p className="text-sm">{ticket.email}</p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            <div className="flex items-center gap-2">
                                                <Phone className="w-4 h-4 text-muted-foreground" />
                                                <div>
                                                    <p className="text-sm font-medium text-muted-foreground">Phone</p>
                                                    <p className="text-sm">{ticket.phone}</p>
                                                </div>
                                            </div>

                                            {ticket.company && (
                                                <div className="flex items-center gap-2">
                                                    <Building className="w-4 h-4 text-muted-foreground" />
                                                    <div>
                                                        <p className="text-sm font-medium text-muted-foreground">Company</p>
                                                        <p className="text-sm">{ticket.company}</p>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>

                            {/* Actions */}
                            <Card>
                                <CardHeader>
                                    <CardTitle>Ticket Actions</CardTitle>
                                    <CardDescription>
                                        Manage your event ticket and add it to your calendar
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                                        <Button
                                            variant="outline"
                                            onClick={handleDownloadTicket}
                                            className="flex items-center gap-2"
                                        >
                                            <Download className="w-4 h-4" />
                                            Download PDF
                                        </Button>

                                        <Button
                                            variant="outline"
                                            onClick={handleShareTicket}
                                            className="flex items-center gap-2"
                                        >
                                            <Share2 className="w-4 h-4" />
                                            Share Ticket
                                        </Button>

                                        <Button
                                            variant="outline"
                                            onClick={handleAddToCalendar}
                                            className="flex items-center gap-2"
                                        >
                                            <Calendar className="w-4 h-4" />
                                            Add to Calendar
                                        </Button>

                                        <Button
                                            variant="outline"
                                            onClick={() => navigate("/my-events")}
                                            className="flex items-center gap-2"
                                        >
                                            <User className="w-4 h-4" />
                                            My Events
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    </div>

                    {/* Important Notes */}
                    <Card className="mt-8">
                        <CardContent className="pt-6">
                            <h3 className="font-semibold mb-3">Important Notes:</h3>
                            <ul className="text-sm text-muted-foreground space-y-2 list-disc pl-5">
                                <li>Please arrive at least 15 minutes before the event start time</li>
                                <li>Present this QR code at the registration desk for quick check-in</li>
                                <li>Keep your ticket handy as it may be required for re-entry</li>
                                <li>Contact the organizer if you need to make any changes to your registration</li>
                                <li>This ticket is non-transferable and valid only for the registered attendee</li>
                            </ul>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default MyTicket;