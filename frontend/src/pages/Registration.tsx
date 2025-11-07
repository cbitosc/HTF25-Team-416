import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import Navbar from "@/components/Navbar";
import { Calendar, MapPin, Users, UserPlus, Mail, Phone, Building } from "lucide-react";
import { toast } from "sonner";

const Registration = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        company: "",
        designation: "",
        dietaryRequirements: "",
        additionalNotes: ""
    });

    // Mock event data (in real app, fetch from API using id)
    const eventsData = {
        "1": {
            id: "1",
            title: "Tech Summit 2025",
            date: "March 15, 2025",
            time: "9:00 AM - 6:00 PM",
            venue: "Silicon Valley Convention Center, 123 Innovation Drive, San Jose, CA",
            capacity: 300,
            registered: 234,
            price: "Free",
            organizer: "Tech Events Inc.",
        },
        "2": {
            id: "2",
            title: "Startup Pitch Night",
            date: "April 8, 2025",
            time: "6:00 PM - 10:00 PM",
            venue: "Innovation Hub, 456 Startup Boulevard, San Francisco, CA",
            capacity: 150,
            registered: 89,
            price: "₹2,100",
            organizer: "Startup Accelerator",
        }
    };

    const event = eventsData[id as keyof typeof eventsData];

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            const ticketId = `TKT-${Date.now()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;

            // Store registration data in localStorage (in real app, save to backend)
            const registration = {
                ticketId,
                eventId: id,
                eventTitle: event?.title,
                eventDate: event?.date,
                eventVenue: event?.venue,
                ...formData,
                registeredAt: new Date().toISOString(),
                status: 'Confirmed'
            };

            const existingRegistrations = JSON.parse(localStorage.getItem('userRegistrations') || '[]');
            existingRegistrations.push(registration);
            localStorage.setItem('userRegistrations', JSON.stringify(existingRegistrations));

            toast.success("Registration successful! Confirmation email sent.");
            setIsLoading(false);

            // Navigate to ticket page
            navigate(`/my-ticket/${ticketId}`);
        }, 2000);
    };

    if (!event) {
        return (
            <div className="min-h-screen bg-background">
                <Navbar />
                <div className="pt-24 pb-20">
                    <div className="container mx-auto px-4 max-w-3xl text-center">
                        <h1 className="text-3xl font-bold mb-4">Event Not Found</h1>
                        <p className="text-muted-foreground mb-8">The event you're trying to register for doesn't exist.</p>
                        <Button onClick={() => navigate("/")}>
                            ← Back to Events
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    const spotsRemaining = event.capacity - event.registered;
    const isEventFull = spotsRemaining <= 0;

    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            <div className="pt-24 pb-20">
                <div className="container mx-auto px-4 max-w-4xl">
                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Event Summary */}
                        <div className="lg:col-span-1">
                            <Card className="sticky top-24">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Calendar className="w-5 h-5 text-primary" />
                                        Event Summary
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <h3 className="font-semibold text-lg mb-2">{event.title}</h3>
                                        <p className="text-sm text-muted-foreground mb-4">by {event.organizer}</p>
                                    </div>

                                    <div className="space-y-3">
                                        <div className="flex items-start gap-3">
                                            <Calendar className="w-4 h-4 text-primary mt-1" />
                                            <div className="text-sm">
                                                <p className="font-medium">{event.date}</p>
                                                <p className="text-muted-foreground">{event.time}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-3">
                                            <MapPin className="w-4 h-4 text-accent mt-1" />
                                            <div className="text-sm">
                                                <p className="text-muted-foreground">{event.venue}</p>
                                            </div>
                                        </div>

                                        <div className="flex items-start gap-3">
                                            <Users className="w-4 h-4 text-primary mt-1" />
                                            <div className="text-sm">
                                                <p className="font-medium">{event.registered} / {event.capacity} registered</p>
                                                <p className="text-muted-foreground">
                                                    {spotsRemaining > 0 ? `${spotsRemaining} spots remaining` : 'Event is full'}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="pt-4 border-t">
                                            <div className="text-2xl font-bold text-primary mb-1">{event.price}</div>
                                            <p className="text-sm text-muted-foreground">
                                                {event.price === "Free" ? "No registration fee" : "Registration fee"}
                                            </p>
                                        </div>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Registration Form */}
                        <div className="lg:col-span-2">
                            <Card>
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <UserPlus className="w-5 h-5 text-primary" />
                                        Event Registration
                                    </CardTitle>
                                    <CardDescription>
                                        Please fill in your details to register for this event. All fields marked with * are required.
                                    </CardDescription>
                                </CardHeader>
                                <CardContent>
                                    {isEventFull ? (
                                        <div className="text-center py-8">
                                            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                                <Users className="w-8 h-8 text-red-600" />
                                            </div>
                                            <h3 className="text-lg font-semibold mb-2">Event Full</h3>
                                            <p className="text-muted-foreground mb-6">
                                                This event has reached its maximum capacity. You can join the waitlist to be notified if spots become available.
                                            </p>
                                            <Button variant="outline" onClick={() => navigate(`/events/${id}`)}>
                                                Back to Event Details
                                            </Button>
                                        </div>
                                    ) : (
                                        <form onSubmit={handleSubmit} className="space-y-6">
                                            {/* Personal Information */}
                                            <div className="space-y-4">
                                                <h3 className="text-lg font-semibold">Personal Information</h3>

                                                <div className="grid md:grid-cols-2 gap-4">
                                                    <div className="space-y-2">
                                                        <Label htmlFor="name">Full Name *</Label>
                                                        <Input
                                                            id="name"
                                                            name="name"
                                                            type="text"
                                                            required
                                                            value={formData.name}
                                                            onChange={handleInputChange}
                                                            placeholder="John Doe"
                                                        />
                                                    </div>

                                                    <div className="space-y-2">
                                                        <Label htmlFor="email" className="flex items-center gap-2">
                                                            <Mail className="w-4 h-4" />
                                                            Email Address *
                                                        </Label>
                                                        <Input
                                                            id="email"
                                                            name="email"
                                                            type="email"
                                                            required
                                                            value={formData.email}
                                                            onChange={handleInputChange}
                                                            placeholder="john@example.com"
                                                        />
                                                    </div>
                                                </div>

                                                <div className="grid md:grid-cols-2 gap-4">
                                                    <div className="space-y-2">
                                                        <Label htmlFor="phone" className="flex items-center gap-2">
                                                            <Phone className="w-4 h-4" />
                                                            Phone Number *
                                                        </Label>
                                                        <Input
                                                            id="phone"
                                                            name="phone"
                                                            type="tel"
                                                            required
                                                            value={formData.phone}
                                                            onChange={handleInputChange}
                                                            placeholder="+91 98765 43210"
                                                        />
                                                    </div>

                                                    <div className="space-y-2">
                                                        <Label htmlFor="company" className="flex items-center gap-2">
                                                            <Building className="w-4 h-4" />
                                                            Company/Organization
                                                        </Label>
                                                        <Input
                                                            id="company"
                                                            name="company"
                                                            type="text"
                                                            value={formData.company}
                                                            onChange={handleInputChange}
                                                            placeholder="Tech Corp Inc."
                                                        />
                                                    </div>
                                                </div>

                                                <div className="space-y-2">
                                                    <Label htmlFor="designation">Job Title/Designation</Label>
                                                    <Input
                                                        id="designation"
                                                        name="designation"
                                                        type="text"
                                                        value={formData.designation}
                                                        onChange={handleInputChange}
                                                        placeholder="Software Engineer"
                                                    />
                                                </div>
                                            </div>

                                            {/* Additional Information */}
                                            <div className="space-y-4 pt-4 border-t">
                                                <h3 className="text-lg font-semibold">Additional Information</h3>

                                                <div className="space-y-2">
                                                    <Label htmlFor="dietaryRequirements">Dietary Requirements</Label>
                                                    <Input
                                                        id="dietaryRequirements"
                                                        name="dietaryRequirements"
                                                        type="text"
                                                        value={formData.dietaryRequirements}
                                                        onChange={handleInputChange}
                                                        placeholder="Vegetarian, Vegan, Allergies, etc."
                                                    />
                                                </div>

                                                <div className="space-y-2">
                                                    <Label htmlFor="additionalNotes">Additional Notes</Label>
                                                    <Textarea
                                                        id="additionalNotes"
                                                        name="additionalNotes"
                                                        value={formData.additionalNotes}
                                                        onChange={handleInputChange}
                                                        placeholder="Any special requirements or questions..."
                                                        className="min-h-20 resize-none"
                                                    />
                                                </div>
                                            </div>

                                            {/* Terms and Submit */}
                                            <div className="space-y-4 pt-4 border-t">
                                                <label className="flex items-start gap-3 cursor-pointer">
                                                    <input
                                                        type="checkbox"
                                                        required
                                                        className="rounded border-border mt-1"
                                                    />
                                                    <div className="text-sm">
                                                        <p>I agree to the event terms and conditions and privacy policy. *</p>
                                                        <p className="text-muted-foreground mt-1">
                                                            By registering, you consent to receive event-related communications.
                                                        </p>
                                                    </div>
                                                </label>

                                                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                                                    <Button
                                                        type="button"
                                                        variant="outline"
                                                        className="flex-1"
                                                        onClick={() => navigate(`/events/${id}`)}
                                                        disabled={isLoading}
                                                    >
                                                        Cancel
                                                    </Button>
                                                    <Button
                                                        type="submit"
                                                        className="flex-1 bg-primary hover:bg-primary/90"
                                                        disabled={isLoading}
                                                    >
                                                        {isLoading ? "Registering..." : "Complete Registration"}
                                                    </Button>
                                                </div>
                                            </div>
                                        </form>
                                    )}
                                </CardContent>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Registration;