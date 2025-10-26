import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Calendar, MapPin, Users } from "lucide-react";

interface EventCardProps {
    id: string;
    title: string;
    description: string;
    date: string;
    venue: string;
    attendees: number;
    image?: string;
}

const EventCard = ({ id, title, description, date, venue, attendees, image }: EventCardProps) => {
    return (
        <Card className="overflow-hidden group hover:shadow-[var(--shadow-card)] transition-all duration-300 hover:-translate-y-1">
            {/* Event Image */}
            <div className="relative h-48 overflow-hidden bg-gradient-to-br from-primary/20 to-accent/20">
                {image ? (
                    <img src={image} alt={title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300" />
                ) : (
                    <div className="w-full h-full flex items-center justify-center">
                        <Calendar className="w-16 h-16 text-primary/40" />
                    </div>
                )}
                <div className="absolute top-3 right-3">
                    <div className="bg-background/90 backdrop-blur-sm rounded-lg px-3 py-1 flex items-center gap-1 text-sm">
                        <Users className="w-4 h-4 text-primary" />
                        <span className="font-semibold">{attendees}</span>
                    </div>
                </div>
            </div>

            {/* Event Details */}
            <div className="p-6">
                <h3 className="text-xl font-bold mb-2 line-clamp-1 group-hover:text-primary transition-colors">
                    {title}
                </h3>
                <p className="text-muted-foreground mb-4 line-clamp-2 text-sm">
                    {description}
                </p>

                <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4 text-primary" />
                        <span>{date}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <MapPin className="w-4 h-4 text-accent" />
                        <span className="line-clamp-1">{venue}</span>
                    </div>
                </div>

                <Button variant="outline" className="w-full" asChild>
                    <Link to={`/event/${id}`}>View Details</Link>
                </Button>
            </div>
        </Card>
    );
};

export default EventCard;
