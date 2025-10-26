import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import Navbar from "@/components/Navbar";
import { Calendar, MapPin, Upload, Image as ImageIcon, X } from "lucide-react";
import { eventsAPI } from "@/lib/api";
import { toast } from "sonner";

const CreateEvent = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [selectedImage, setSelectedImage] = useState<File | null>(null);
    const [imagePreview, setImagePreview] = useState<string | null>(null);
    const [isDragOver, setIsDragOver] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleImageSelect = (file: File) => {
        if (file && file.type.startsWith('image/')) {
            const maxSize = 10 * 1024 * 1024; // 10MB
            if (file.size > maxSize) {
                toast.error("Image size must be less than 10MB");
                return;
            }

            setSelectedImage(file);
            const reader = new FileReader();
            reader.onload = (e) => {
                setImagePreview(e.target?.result as string);
            };
            reader.readAsDataURL(file);
            toast.success("Image uploaded successfully!");
        } else {
            toast.error("Please select a valid image file");
        }
    };

    const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            handleImageSelect(file);
        }
    };

    const handleDragOver = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(true);
    };

    const handleDragLeave = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
    };

    const handleDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragOver(false);
        const file = e.dataTransfer.files?.[0];
        if (file) {
            handleImageSelect(file);
        }
    };

    const handleImageClick = () => {
        fileInputRef.current?.click();
    };

    const removeImage = () => {
        setSelectedImage(null);
        setImagePreview(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            const formData = new FormData(e.target as HTMLFormElement);

            // Get form values
            const eventData = {
                title: formData.get('title'),
                description: formData.get('description'),
                date: formData.get('date'),
                time: formData.get('time'),
                venue: formData.get('venue'),
                capacity: formData.get('capacity') ? parseInt(formData.get('capacity') as string) : undefined,
                type: formData.get('type'),
                price: 0, // Default price for now
                media: selectedImage ? [imagePreview] : [] // Store image URL if uploaded
            };

            // Create event using API
            await eventsAPI.createEvent(eventData);

            toast.success("Event created successfully!");
            navigate("/dashboard");
        } catch (error) {
            console.error('Error creating event:', error);
            toast.error(error instanceof Error ? error.message : "Failed to create event. Please try again.");
        } finally {
            setIsLoading(false);
        }
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

                                {imagePreview ? (
                                    <div className="relative border-2 border-border rounded-lg overflow-hidden">
                                        <img
                                            src={imagePreview}
                                            alt="Event preview"
                                            className="w-full h-48 object-cover"
                                        />
                                        <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center">
                                            <div className="flex gap-2">
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={handleImageClick}
                                                    className="bg-white text-black hover:bg-gray-100"
                                                >
                                                    Change Image
                                                </Button>
                                                <Button
                                                    type="button"
                                                    variant="outline"
                                                    size="sm"
                                                    onClick={removeImage}
                                                    className="bg-red-600 text-white hover:bg-red-700 border-red-600"
                                                >
                                                    <X className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </div>
                                        <div className="absolute top-2 right-2">
                                            <Button
                                                type="button"
                                                variant="outline"
                                                size="sm"
                                                onClick={removeImage}
                                                className="bg-red-600 text-white hover:bg-red-700 border-red-600 h-8 w-8 p-0"
                                            >
                                                <X className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>
                                ) : (
                                    <div
                                        className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors cursor-pointer ${isDragOver
                                            ? 'border-primary bg-primary/5'
                                            : 'border-border hover:border-primary'
                                            }`}
                                        onClick={handleImageClick}
                                        onDragOver={handleDragOver}
                                        onDragLeave={handleDragLeave}
                                        onDrop={handleDrop}
                                    >
                                        <Upload className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                                        <p className="text-sm text-muted-foreground mb-2">
                                            Click to upload or drag and drop
                                        </p>
                                        <p className="text-xs text-muted-foreground">PNG, JPG up to 10MB</p>
                                    </div>
                                )}

                                <input
                                    ref={fileInputRef}
                                    id="event-image"
                                    type="file"
                                    accept="image/*"
                                    onChange={handleFileInputChange}
                                    className="hidden"
                                />
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
