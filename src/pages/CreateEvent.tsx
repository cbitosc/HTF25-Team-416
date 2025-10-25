import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import { Calendar, MapPin, Upload, Image as ImageIcon } from "lucide-react";
import { toast } from "sonner";

const CreateEvent = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate event creation
        setTimeout(() => {
            toast.success("Event created successfully!");
            setIsLoading(false);
            navigate("/");
        }, 1500);
    };

    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            <div className="pt-24 pb-20">
                <div className="container mx-auto px-4 max-w-3xl">
                    <div className="mb-8">
                        <h1 className="text-3xl md:text-4xl font-bold mb-2">Create New Event</h1>
                        <p className="text-muted-foreground">
                            Fill in the details below to create your event
                        </p>
                    </div>

                    <Card className="p-8 shadow-[var(--shadow-card)]">
                        <form onSubmit={handleSubmit} className="space-y-6">
                            {/* Event Image */}
                            <div className="space-y-2">
                                <Label htmlFor="event-image" className="flex items-center gap-2">
                                    <ImageIcon className="w-4 h-4 text-primary" />
                                    Event Image
                                </Label>
                                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center hover:border-primary transition-colors cursor-pointer">
                                    <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                                    <p className="text-sm text-muted-foreground mb-2">
                                        Click to upload or drag and drop
                                    </p>
                                    <p className="text-xs text-muted-foreground">PNG, JPG up to 10MB</p>
                                    <input
                                        id="event-image"
                                        type="file"
                                        accept="image/*"
                                        className="hidden"
                                    />
                                </div>
                            </div>

                            {/* Event Title */}
                            <div className="space-y-2">
                                <Label htmlFor="title">Event Title *</Label>
                                <Input
                                    id="title"
                                    type="text"
                                    placeholder="Tech Summit 2025"
                                    required
                                    className="h-11"
                                />
                            </div>

                            {/* Description */}
                            <div className="space-y-2">
                                <Label htmlFor="description">Description *</Label>
                                <Textarea
                                    id="description"
                                    placeholder="Describe your event in detail..."
                                    required
                                    className="min-h-32 resize-none"
                                />
                            </div>

                            {/* Date and Time */}
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="date" className="flex items-center gap-2">
                                        <Calendar className="w-4 h-4 text-primary" />
                                        Event Date *
                                    </Label>
                                    <Input
                                        id="date"
                                        type="date"
                                        required
                                        className="h-11"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="time">Event Time *</Label>
                                    <Input
                                        id="time"
                                        type="time"
                                        required
                                        className="h-11"
                                    />
                                </div>
                            </div>

                            {/* Venue */}
                            <div className="space-y-2">
                                <Label htmlFor="venue" className="flex items-center gap-2">
                                    <MapPin className="w-4 h-4 text-accent" />
                                    Venue *
                                </Label>
                                <Input
                                    id="venue"
                                    type="text"
                                    placeholder="Convention Center, 123 Main St"
                                    required
                                    className="h-11"
                                />
                            </div>

                            {/* Capacity */}
                            <div className="space-y-2">
                                <Label htmlFor="capacity">Maximum Attendees</Label>
                                <Input
                                    id="capacity"
                                    type="number"
                                    placeholder="100"
                                    min="1"
                                    className="h-11"
                                />
                                <p className="text-xs text-muted-foreground">
                                    Leave empty for unlimited capacity
                                </p>
                            </div>

                            {/* Event Type */}
                            <div className="space-y-2">
                                <Label htmlFor="type">Event Type *</Label>
                                <select
                                    id="type"
                                    required
                                    className="w-full h-11 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                                >
                                    <option value="">Select event type</option>
                                    <option value="conference">Conference</option>
                                    <option value="workshop">Workshop</option>
                                    <option value="seminar">Seminar</option>
                                    <option value="networking">Networking</option>
                                    <option value="social">Social</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>

                            {/* Registration Settings */}
                            <div className="space-y-4 pt-4 border-t border-border">
                                <h3 className="font-semibold text-lg">Registration Settings</h3>

                                <label className="flex items-start gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        defaultChecked
                                        className="rounded border-border mt-1"
                                    />
                                    <div>
                                        <p className="font-medium">Require RSVP</p>
                                        <p className="text-sm text-muted-foreground">
                                            Attendees must register before attending
                                        </p>
                                    </div>
                                </label>

                                <label className="flex items-start gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="rounded border-border mt-1"
                                    />
                                    <div>
                                        <p className="font-medium">Send email confirmations</p>
                                        <p className="text-sm text-muted-foreground">
                                            Automatically send confirmation emails to attendees
                                        </p>
                                    </div>
                                </label>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex flex-col sm:flex-row gap-4 pt-6">
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="lg"
                                    className="flex-1"
                                    onClick={() => navigate("/")}
                                    disabled={isLoading}
                                >
                                    Cancel
                                </Button>
                                <Button
                                    type="submit"
                                    variant="gradient"
                                    size="lg"
                                    className="flex-1"
                                    disabled={isLoading}
                                >
                                    {isLoading ? "Creating Event..." : "Create Event"}
                                </Button>
                            </div>
                        </form>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default CreateEvent;
