import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import { Star, Calendar, MapPin, ThumbsUp, Send, MessageSquare, User, Eye } from "lucide-react";
import { toast } from "sonner";
import { useAuth } from "@/contexts/AuthContext";

const Feedback = () => {
    const { eventId } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const [isLoading, setIsLoading] = useState(false);
    const [feedback, setFeedback] = useState({
        overallRating: 0,
        contentRating: 0,
        organizationRating: 0,
        venueRating: 0,
        comments: "",
        wouldRecommend: null as boolean | null,
        improvements: ""
    });
    const [existingFeedback, setExistingFeedback] = useState<any[]>([]);

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
        }
    };

    const event = eventsData[eventId as keyof typeof eventsData];

    useEffect(() => {
        if (user?.role === 'organizer') {
            // Mock feedback data for organizers to view
            const mockFeedback = [
                {
                    id: "1",
                    attendeeName: "John Doe",
                    rating: 5,
                    comment: "Excellent event! Great speakers and networking opportunities. Will definitely attend next year.",
                    date: "2025-03-16",
                    categories: { overall: 5, content: 5, organization: 4, venue: 5 },
                    wouldRecommend: true
                },
                {
                    id: "2",
                    attendeeName: "Jane Smith",
                    rating: 4,
                    comment: "Very well organized. The workshops were particularly helpful. Minor issue with registration process.",
                    date: "2025-03-17",
                    categories: { overall: 4, content: 4, organization: 3, venue: 4 },
                    wouldRecommend: true
                },
                {
                    id: "3",
                    attendeeName: "Mike Johnson",
                    rating: 5,
                    comment: "Outstanding event! The keynote speakers were world-class. Great venue and facilities.",
                    date: "2025-03-18",
                    categories: { overall: 5, content: 5, organization: 5, venue: 5 },
                    wouldRecommend: true
                },
                {
                    id: "4",
                    attendeeName: "Sarah Wilson",
                    rating: 4,
                    comment: "Great content and valuable insights. The networking sessions were particularly beneficial for my business.",
                    date: "2025-03-19",
                    categories: { overall: 4, content: 4, organization: 4, venue: 4 },
                    wouldRecommend: true
                },
                {
                    id: "5",
                    attendeeName: "David Brown",
                    rating: 5,
                    comment: "One of the best tech events I've attended. The speakers were knowledgeable and the organization was flawless.",
                    date: "2025-03-20",
                    categories: { overall: 5, content: 5, organization: 5, venue: 5 },
                    wouldRecommend: true
                },
                {
                    id: "6",
                    attendeeName: "Emily Davis",
                    rating: 4,
                    comment: "Good event overall. Would have liked more hands-on sessions, but the content was solid.",
                    date: "2025-03-21",
                    categories: { overall: 4, content: 3, organization: 4, venue: 4 },
                    wouldRecommend: true
                },
                {
                    id: "7",
                    attendeeName: "Robert Taylor",
                    rating: 5,
                    comment: "Exceptional event! Made great connections and learned a lot. Highly recommend to fellow professionals.",
                    date: "2025-03-22",
                    categories: { overall: 5, content: 5, organization: 5, venue: 5 },
                    wouldRecommend: true
                },
                {
                    id: "8",
                    attendeeName: "Lisa Anderson",
                    rating: 4,
                    comment: "Well-structured event with diverse topics. The venue was excellent and the catering was good.",
                    date: "2025-03-23",
                    categories: { overall: 4, content: 4, organization: 4, venue: 5 },
                    wouldRecommend: true
                }
            ];
            setExistingFeedback(mockFeedback);
        }
    }, [user, eventId]);

    if (!event) {
        return (
            <div className="min-h-screen bg-gray-50">
                <Navbar />
                <div className="container mx-auto px-4 py-8">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold text-gray-900 mb-4">Event Not Found</h1>
                        <Button onClick={() => navigate(-1)}>Go Back</Button>
                    </div>
                </div>
            </div>
        );
    }

    // Organizer View - View Feedback
    if (user?.role === 'organizer') {
        const avgRating = existingFeedback.length > 0
            ? (existingFeedback.reduce((sum, f) => sum + f.rating, 0) / existingFeedback.length).toFixed(1)
            : 0;

        return (
            <div className="min-h-screen bg-gray-50">
                <Navbar />

                <div className="container mx-auto px-4 py-8">
                    {/* Header */}
                    <div className="mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Event Feedback</h1>
                        <p className="text-gray-600">View attendee feedback for: <span className="font-semibold">{event.title}</span></p>
                    </div>

                    {/* Feedback Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
                        <Card>
                            <CardContent className="p-4 text-center">
                                <div className="text-2xl font-bold text-blue-600">{existingFeedback.length}</div>
                                <div className="text-sm text-gray-600">Total Feedback</div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="p-4 text-center">
                                <div className="text-2xl font-bold text-yellow-600">{avgRating}/5</div>
                                <div className="text-sm text-gray-600">Average Rating</div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="p-4 text-center">
                                <div className="text-2xl font-bold text-green-600">
                                    {existingFeedback.filter(f => f.wouldRecommend).length}
                                </div>
                                <div className="text-sm text-gray-600">Would Recommend</div>
                            </CardContent>
                        </Card>
                        <Card>
                            <CardContent className="p-4 text-center">
                                <div className="text-2xl font-bold text-purple-600">
                                    {existingFeedback.filter(f => f.rating >= 4).length}
                                </div>
                                <div className="text-sm text-gray-600">Positive Reviews</div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Feedback List */}
                    <div className="space-y-4">
                        {existingFeedback.map((item) => (
                            <Card key={item.id}>
                                <CardContent className="p-6">
                                    <div className="flex items-start justify-between mb-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-blue-100 flex items-center justify-center">
                                                <User className="w-5 h-5 text-blue-600" />
                                            </div>
                                            <div>
                                                <p className="font-semibold text-gray-900">{item.attendeeName}</p>
                                                <p className="text-sm text-gray-500">{item.date}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            {[...Array(5)].map((_, i) => (
                                                <Star
                                                    key={i}
                                                    className={`w-5 h-5 ${i < item.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                                        }`}
                                                />
                                            ))}
                                            <span className="ml-2 text-sm font-medium">({item.rating})</span>
                                        </div>
                                    </div>

                                    <p className="text-gray-700 mb-4">{item.comment}</p>

                                    {/* Rating Categories */}
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
                                        <div className="text-center">
                                            <div className="text-sm text-gray-600">Overall</div>
                                            <div className="font-semibold">{item.categories.overall}/5</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-sm text-gray-600">Content</div>
                                            <div className="font-semibold">{item.categories.content}/5</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-sm text-gray-600">Organization</div>
                                            <div className="font-semibold">{item.categories.organization}/5</div>
                                        </div>
                                        <div className="text-center">
                                            <div className="text-sm text-gray-600">Venue</div>
                                            <div className="font-semibold">{item.categories.venue}/5</div>
                                        </div>
                                    </div>

                                    <div className="flex items-center justify-between">
                                        <div className="flex items-center gap-2">
                                            <ThumbsUp className="w-4 h-4 text-green-600" />
                                            <span className="text-sm text-gray-600">
                                                {item.wouldRecommend ? 'Would recommend' : 'Would not recommend'}
                                            </span>
                                        </div>
                                        <Button variant="outline" size="sm">
                                            <MessageSquare className="w-4 h-4 mr-1" />
                                            Reply
                                        </Button>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {existingFeedback.length === 0 && (
                        <div className="text-center py-12">
                            <MessageSquare className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                            <h3 className="text-lg font-medium text-gray-900 mb-2">No feedback yet</h3>
                            <p className="text-gray-600">Feedback will appear here once attendees submit their reviews.</p>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    // Attendee View - Give Feedback
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 1000));

            toast.success("Thank you! Your feedback has been submitted successfully.");

            navigate("/my-events");
        } catch (error) {
            toast.error("Failed to submit feedback. Please try again.");
        } finally {
            setIsLoading(false);
        }
    };

    const StarRating = ({ value, onChange, label }: { value: number; onChange: (rating: number) => void; label: string }) => (
        <div className="space-y-2">
            <Label className="text-sm font-medium">{label}</Label>
            <div className="flex gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                    <button
                        key={star}
                        type="button"
                        onClick={() => onChange(star)}
                        className="focus:outline-none"
                    >
                        <Star
                            className={`w-6 h-6 ${star <= value ? 'text-yellow-400 fill-current' : 'text-gray-300'
                                }`}
                        />
                    </button>
                ))}
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            <div className="container mx-auto px-4 py-8">
                <div className="max-w-2xl mx-auto">
                    {/* Header */}
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-2">Share Your Feedback</h1>
                        <p className="text-gray-600">Help us improve by sharing your experience at this event</p>
                    </div>

                    {/* Event Info */}
                    <Card className="mb-8">
                        <CardContent className="p-6">
                            <div className="flex items-start gap-4">
                                <div className="flex-1">
                                    <h2 className="text-xl font-semibold text-gray-900 mb-2">{event.title}</h2>
                                    <div className="space-y-2 text-sm text-gray-600">
                                        <div className="flex items-center gap-2">
                                            <Calendar className="w-4 h-4" />
                                            <span>{event.date} at {event.time}</span>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <MapPin className="w-4 h-4" />
                                            <span>{event.venue}</span>
                                        </div>
                                    </div>
                                </div>
                                <Badge variant="outline">{event.type}</Badge>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Feedback Form */}
                    <form onSubmit={handleSubmit} className="space-y-6">
                        {/* Rating Categories */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Rate Different Aspects</CardTitle>
                                <CardDescription>Please rate the following aspects of the event</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-6">
                                <StarRating
                                    value={feedback.overallRating}
                                    onChange={(rating) => setFeedback({ ...feedback, overallRating: rating })}
                                    label="Overall Experience"
                                />
                                <StarRating
                                    value={feedback.contentRating}
                                    onChange={(rating) => setFeedback({ ...feedback, contentRating: rating })}
                                    label="Content Quality"
                                />
                                <StarRating
                                    value={feedback.organizationRating}
                                    onChange={(rating) => setFeedback({ ...feedback, organizationRating: rating })}
                                    label="Organization"
                                />
                                <StarRating
                                    value={feedback.venueRating}
                                    onChange={(rating) => setFeedback({ ...feedback, venueRating: rating })}
                                    label="Venue & Facilities"
                                />
                            </CardContent>
                        </Card>

                        {/* Comments */}
                        <Card>
                            <CardHeader>
                                <CardTitle>Tell us more</CardTitle>
                                <CardDescription>Share your detailed feedback and suggestions</CardDescription>
                            </CardHeader>
                            <CardContent className="space-y-4">
                                <div className="space-y-2">
                                    <Label htmlFor="comments">Comments</Label>
                                    <Textarea
                                        id="comments"
                                        placeholder="What did you like? What could be improved?"
                                        value={feedback.comments}
                                        onChange={(e) => setFeedback({ ...feedback, comments: e.target.value })}
                                        rows={4}
                                    />
                                </div>

                                <div className="space-y-2">
                                    <Label htmlFor="improvements">Suggestions for Improvement</Label>
                                    <Textarea
                                        id="improvements"
                                        placeholder="Any specific suggestions to make future events better?"
                                        value={feedback.improvements}
                                        onChange={(e) => setFeedback({ ...feedback, improvements: e.target.value })}
                                        rows={3}
                                    />
                                </div>

                                {/* Would Recommend */}
                                <div className="space-y-2">
                                    <Label>Would you recommend this event to others?</Label>
                                    <div className="flex gap-4">
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="radio"
                                                name="recommend"
                                                checked={feedback.wouldRecommend === true}
                                                onChange={() => setFeedback({ ...feedback, wouldRecommend: true })}
                                                className="text-primary"
                                            />
                                            <span>Yes</span>
                                        </label>
                                        <label className="flex items-center gap-2 cursor-pointer">
                                            <input
                                                type="radio"
                                                name="recommend"
                                                checked={feedback.wouldRecommend === false}
                                                onChange={() => setFeedback({ ...feedback, wouldRecommend: false })}
                                                className="text-primary"
                                            />
                                            <span>No</span>
                                        </label>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        {/* Submit */}
                        <div className="flex gap-4">
                            <Button
                                type="submit"
                                className="flex-1"
                                disabled={isLoading || feedback.overallRating === 0}
                            >
                                {isLoading ? "Submitting..." : "Submit Feedback"}
                                <Send className="w-4 h-4 ml-2" />
                            </Button>
                            <Button
                                type="button"
                                variant="outline"
                                onClick={() => navigate(-1)}
                            >
                                Cancel
                            </Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Feedback;