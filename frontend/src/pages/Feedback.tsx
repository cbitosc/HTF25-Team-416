import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import { Star, Calendar, MapPin, ThumbsUp, Send } from "lucide-react";
import { toast } from "sonner";

const Feedback = () => {
    const { eventId } = useParams();
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    // const [rating, setRating] = useState(0);
    // const [hoverRating, setHoverRating] = useState(0);
    const [feedback, setFeedback] = useState({
        overallRating: 0,
        contentRating: 0,
        organizationRating: 0,
        venueRating: 0,
        comments: "",
        wouldRecommend: null as boolean | null,
        improvements: ""
    });

    // Mock event data (in real app, fetch from API)
    const eventsData = {
        "1": {
            id: "1",
            title: "Tech Summit 2025",
            date: "March 15, 2025",
            time: "9:00 AM - 6:00 PM",
            venue: "Silicon Valley Convention Center",
            organizer: "Tech Events Inc.",
            type: "Conference"
        },
        "2": {
            id: "2",
            title: "Startup Pitch Night",
            date: "April 8, 2025",
            time: "6:00 PM - 10:00 PM",
            venue: "Innovation Hub",
            organizer: "Startup Accelerator",
            type: "Networking"
        },
        "3": {
            id: "3",
            title: "Web Dev Workshop",
            date: "February 28, 2025",
            time: "10:00 AM - 4:00 PM",
            venue: "CodeCamp Academy",
            organizer: "CodeCamp Academy",
            type: "Workshop"
        }
    };

    const event = eventsData[eventId as keyof typeof eventsData];

    const handleRatingChange = (category: string, value: number) => {
        setFeedback(prev => ({
            ...prev,
            [`${category}Rating`]: value
        }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        // Validation
        if (feedback.overallRating === 0) {
            toast.error("Please provide an overall rating");
            setIsLoading(false);
            return;
        }

        if (feedback.wouldRecommend === null) {
            toast.error("Please let us know if you would recommend this event");
            setIsLoading(false);
            return;
        }

        // Simulate API call
        setTimeout(() => {
            // Store feedback in localStorage (in real app, send to backend)
            const feedbackData = {
                eventId,
                eventTitle: event?.title,
                ...feedback,
                submittedAt: new Date().toISOString()
            };

            const existingFeedback = JSON.parse(localStorage.getItem('eventFeedback') || '[]');
            existingFeedback.push(feedbackData);
            localStorage.setItem('eventFeedback', JSON.stringify(existingFeedback));

            toast.success("Thank you for your feedback!");
            setIsLoading(false);
            navigate("/my-events");
        }, 1500);
    };

    const StarRating = ({
        rating,
        onRatingChange,
        size = "w-6 h-6"
    }: {
        rating: number;
        onRatingChange: (rating: number) => void;
        size?: string;
    }) => {
        const [hover, setHover] = useState(0);

        return (
            <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                    <button
                        key={star}
                        type="button"
                        className={`${size} transition-colors ${star <= (hover || rating)
                            ? "text-yellow-400 fill-current"
                            : "text-gray-300"
                            }`}
                        onClick={() => onRatingChange(star)}
                        onMouseEnter={() => setHover(star)}
                        onMouseLeave={() => setHover(0)}
                    >
                        <Star className="w-full h-full" />
                    </button>
                ))}
            </div>
        );
    };

    if (!event) {
        return (
            <div className="min-h-screen bg-background">
                <Navbar />
                <div className="pt-24 pb-20">
                    <div className="container mx-auto px-4 max-w-3xl text-center">
                        <h1 className="text-3xl font-bold mb-4">Event Not Found</h1>
                        <p className="text-muted-foreground mb-8">The event you're trying to review doesn't exist.</p>
                        <Button onClick={() => navigate("/my-events")}>
                            Back to My Events
                        </Button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            <div className="pt-24 pb-20">
                <div className="container mx-auto px-4 max-w-4xl">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Star className="w-8 h-8 text-blue-600" />
                        </div>
                        <h1 className="text-3xl font-bold mb-2">Event Feedback</h1>
                        <p className="text-muted-foreground">
                            Help us improve by sharing your experience at this event
                        </p>
                    </div>

                    <div className="grid lg:grid-cols-3 gap-8">
                        {/* Event Summary */}
                        <div className="lg:col-span-1">
                            <Card className="sticky top-24">
                                <CardHeader>
                                    <CardTitle className="flex items-center gap-2">
                                        <Calendar className="w-5 h-5 text-primary" />
                                        Event Details
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <div>
                                        <h3 className="font-semibold text-lg mb-2">{event.title}</h3>
                                        <p className="text-sm text-muted-foreground mb-4">by {event.organizer}</p>
                                        <Badge variant="outline">{event.type}</Badge>
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
                                    </div>
                                </CardContent>
                            </Card>
                        </div>

                        {/* Feedback Form */}
                        <div className="lg:col-span-2">
                            <form onSubmit={handleSubmit} className="space-y-6">
                                {/* Overall Rating */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Overall Experience</CardTitle>
                                        <CardDescription>
                                            How would you rate your overall experience at this event?
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex items-center gap-4">
                                            <StarRating
                                                rating={feedback.overallRating}
                                                onRatingChange={(rating) => handleRatingChange("overall", rating)}
                                                size="w-8 h-8"
                                            />
                                            <span className="text-sm text-muted-foreground">
                                                {feedback.overallRating > 0 && (
                                                    <span className="font-medium">
                                                        {feedback.overallRating === 5 ? "Excellent" :
                                                            feedback.overallRating === 4 ? "Very Good" :
                                                                feedback.overallRating === 3 ? "Good" :
                                                                    feedback.overallRating === 2 ? "Fair" :
                                                                        "Poor"}
                                                    </span>
                                                )}
                                            </span>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Detailed Ratings */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Detailed Ratings</CardTitle>
                                        <CardDescription>
                                            Rate specific aspects of the event
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent className="space-y-6">
                                        <div className="grid gap-4">
                                            <div className="flex items-center justify-between">
                                                <Label className="text-sm font-medium">Content Quality</Label>
                                                <StarRating
                                                    rating={feedback.contentRating}
                                                    onRatingChange={(rating) => handleRatingChange("content", rating)}
                                                />
                                            </div>

                                            <div className="flex items-center justify-between">
                                                <Label className="text-sm font-medium">Organization & Flow</Label>
                                                <StarRating
                                                    rating={feedback.organizationRating}
                                                    onRatingChange={(rating) => handleRatingChange("organization", rating)}
                                                />
                                            </div>

                                            <div className="flex items-center justify-between">
                                                <Label className="text-sm font-medium">Venue & Facilities</Label>
                                                <StarRating
                                                    rating={feedback.venueRating}
                                                    onRatingChange={(rating) => handleRatingChange("venue", rating)}
                                                />
                                            </div>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Recommendation */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Would you recommend this event?</CardTitle>
                                        <CardDescription>
                                            Help others discover great events
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <div className="flex gap-4">
                                            <Button
                                                type="button"
                                                variant={feedback.wouldRecommend === true ? "default" : "outline"}
                                                onClick={() => setFeedback(prev => ({ ...prev, wouldRecommend: true }))}
                                                className="flex-1"
                                            >
                                                <ThumbsUp className="w-4 h-4 mr-2" />
                                                Yes, I'd recommend it
                                            </Button>
                                            <Button
                                                type="button"
                                                variant={feedback.wouldRecommend === false ? "default" : "outline"}
                                                onClick={() => setFeedback(prev => ({ ...prev, wouldRecommend: false }))}
                                                className="flex-1"
                                            >
                                                No, I wouldn't recommend it
                                            </Button>
                                        </div>
                                    </CardContent>
                                </Card>

                                {/* Comments */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Additional Comments</CardTitle>
                                        <CardDescription>
                                            Share what you liked most or any specific feedback
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <Textarea
                                            placeholder="Tell us about your experience, what you enjoyed, memorable moments, etc."
                                            value={feedback.comments}
                                            onChange={(e) => setFeedback(prev => ({ ...prev, comments: e.target.value }))}
                                            className="min-h-24 resize-none"
                                        />
                                    </CardContent>
                                </Card>

                                {/* Suggestions */}
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Suggestions for Improvement</CardTitle>
                                        <CardDescription>
                                            How can we make future events even better?
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <Textarea
                                            placeholder="Any suggestions for improvement, topics you'd like to see, or changes you'd recommend..."
                                            value={feedback.improvements}
                                            onChange={(e) => setFeedback(prev => ({ ...prev, improvements: e.target.value }))}
                                            className="min-h-24 resize-none"
                                        />
                                    </CardContent>
                                </Card>

                                {/* Submit */}
                                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                                    <Button
                                        type="button"
                                        variant="outline"
                                        className="flex-1"
                                        onClick={() => navigate("/my-events")}
                                        disabled={isLoading}
                                    >
                                        Skip for Now
                                    </Button>
                                    <Button
                                        type="submit"
                                        className="flex-1 bg-primary hover:bg-primary/90"
                                        disabled={isLoading}
                                    >
                                        {isLoading ? (
                                            "Submitting..."
                                        ) : (
                                            <>
                                                <Send className="w-4 h-4 mr-2" />
                                                Submit Feedback
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Feedback;