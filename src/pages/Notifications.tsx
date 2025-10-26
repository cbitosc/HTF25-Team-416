import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navbar from "@/components/Navbar";
import { Bell, Clock, Search, Trash2, CheckCircle, AlertCircle, Info } from "lucide-react";
import { toast } from "sonner";

const Notifications = () => {
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState("");
    const [notifications, setNotifications] = useState<any[]>([]);

    useEffect(() => {
        // Mock notifications data (in real app, fetch from API)
        const mockNotifications = [
            {
                id: "1",
                type: "reminder",
                title: "Event Reminder: Tech Summit 2025",
                message: "Your registered event 'Tech Summit 2025' is starting in 2 hours. Don't forget to bring your ticket!",
                eventId: "1",
                eventTitle: "Tech Summit 2025",
                timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
                isRead: false,
                priority: "high"
            },
            {
                id: "2",
                type: "update",
                title: "Venue Change: Startup Pitch Night",
                message: "The venue for 'Startup Pitch Night' has been changed to Innovation Hub, 456 Startup Boulevard. Please update your calendar accordingly.",
                eventId: "2",
                eventTitle: "Startup Pitch Night",
                timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
                isRead: true,
                priority: "medium"
            },
            {
                id: "3",
                type: "confirmation",
                title: "Registration Confirmed: AI Conference 2025",
                message: "Your registration for 'AI Conference 2025' has been confirmed. You will receive your ticket via email shortly.",
                eventId: "4",
                eventTitle: "AI Conference 2025",
                timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
                isRead: true,
                priority: "low"
            },
            {
                id: "4",
                type: "reminder",
                title: "Early Bird Discount Ending Soon",
                message: "The early bird discount for 'Design Thinking Workshop' ends in 24 hours. Register now to save 20%!",
                eventId: "5",
                eventTitle: "Design Thinking Workshop",
                timestamp: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString(),
                isRead: false,
                priority: "medium"
            },
            {
                id: "5",
                type: "update",
                title: "New Speaker Added: Tech Summit 2025",
                message: "We're excited to announce that Sarah Johnson, CTO of TechCorp, will be joining as a keynote speaker.",
                eventId: "1",
                eventTitle: "Tech Summit 2025",
                timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
                isRead: true,
                priority: "low"
            }
        ];

        setNotifications(mockNotifications);
    }, []);

    const unreadNotifications = notifications.filter(n => !n.isRead);
    const readNotifications = notifications.filter(n => n.isRead);

    const filteredUnread = unreadNotifications.filter(notification =>
        notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        notification.message.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const filteredRead = readNotifications.filter(notification =>
        notification.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        notification.message.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const getNotificationIcon = (type: string) => {
        switch (type) {
            case "reminder":
                return <Clock className="w-5 h-5 text-orange-500" />;
            case "update":
                return <AlertCircle className="w-5 h-5 text-blue-500" />;
            case "confirmation":
                return <CheckCircle className="w-5 h-5 text-green-500" />;
            default:
                return <Info className="w-5 h-5 text-gray-500" />;
        }
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case "high":
                return "bg-red-100 text-red-700 border-red-200";
            case "medium":
                return "bg-yellow-100 text-yellow-700 border-yellow-200";
            case "low":
                return "bg-green-100 text-green-700 border-green-200";
            default:
                return "bg-gray-100 text-gray-700 border-gray-200";
        }
    };

    const formatTimestamp = (timestamp: string) => {
        const now = new Date();
        const notificationTime = new Date(timestamp);
        const diffInHours = Math.floor((now.getTime() - notificationTime.getTime()) / (1000 * 60 * 60));

        if (diffInHours < 1) return "Just now";
        if (diffInHours < 24) return `${diffInHours} hours ago`;
        const diffInDays = Math.floor(diffInHours / 24);
        if (diffInDays === 1) return "Yesterday";
        if (diffInDays < 7) return `${diffInDays} days ago`;
        return notificationTime.toLocaleDateString();
    };

    const markAsRead = (notificationId: string) => {
        setNotifications(prev =>
            prev.map(notification =>
                notification.id === notificationId
                    ? { ...notification, isRead: true }
                    : notification
            )
        );
        toast.success("Notification marked as read");
    };

    const deleteNotification = (notificationId: string) => {
        setNotifications(prev =>
            prev.filter(notification => notification.id !== notificationId)
        );
        toast.success("Notification deleted");
    };

    const markAllAsRead = () => {
        setNotifications(prev =>
            prev.map(notification => ({ ...notification, isRead: true }))
        );
        toast.success("All notifications marked as read");
    };

    const NotificationCard = ({ notification }: { notification: any }) => (
        <Card className={`transition-all ${!notification.isRead ? 'ring-2 ring-blue-100 bg-blue-50/30' : ''}`}>
            <CardContent className="p-4">
                <div className="flex items-start gap-4">
                    <div className="mt-1">
                        {getNotificationIcon(notification.type)}
                    </div>

                    <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between mb-2">
                            <h3 className={`font-medium ${!notification.isRead ? 'text-foreground' : 'text-muted-foreground'}`}>
                                {notification.title}
                            </h3>
                            <div className="flex items-center gap-2 ml-2">
                                <Badge
                                    variant="outline"
                                    className={`text-xs ${getPriorityColor(notification.priority)}`}
                                >
                                    {notification.priority}
                                </Badge>
                                {!notification.isRead && (
                                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                                )}
                            </div>
                        </div>

                        <p className={`text-sm mb-3 ${!notification.isRead ? 'text-foreground' : 'text-muted-foreground'}`}>
                            {notification.message}
                        </p>

                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                <span>{formatTimestamp(notification.timestamp)}</span>
                                {notification.eventTitle && (
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        className="h-auto p-0 text-xs text-blue-600 hover:text-blue-700"
                                        onClick={() => navigate(`/events/${notification.eventId}`)}
                                    >
                                        View Event
                                    </Button>
                                )}
                            </div>

                            <div className="flex items-center gap-2">
                                {!notification.isRead && (
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => markAsRead(notification.id)}
                                        className="h-auto p-1 text-xs"
                                    >
                                        Mark as read
                                    </Button>
                                )}
                                <Button
                                    variant="ghost"
                                    size="sm"
                                    onClick={() => deleteNotification(notification.id)}
                                    className="h-auto p-1 text-destructive hover:text-destructive"
                                >
                                    <Trash2 className="w-3 h-3" />
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );

    return (
        <div className="min-h-screen bg-background">
            <Navbar />

            <div className="pt-24 pb-20">
                <div className="container mx-auto px-4 max-w-4xl">
                    {/* Header */}
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
                        <div>
                            <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-3">
                                <Bell className="w-8 h-8" />
                                Notifications
                            </h1>
                            <p className="text-muted-foreground">
                                Stay updated with your event registrations and updates
                            </p>
                        </div>
                        <div className="flex gap-2 mt-6 md:mt-0">
                            {unreadNotifications.length > 0 && (
                                <Button variant="outline" onClick={markAllAsRead}>
                                    Mark All Read
                                </Button>
                            )}
                            <Button onClick={() => navigate("/my-events")}>
                                My Events
                            </Button>
                        </div>
                    </div>

                    {/* Stats */}
                    <div className="grid sm:grid-cols-3 gap-6 mb-8">
                        <Card>
                            <CardContent className="p-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-2xl font-bold">{notifications.length}</p>
                                        <p className="text-sm text-muted-foreground">Total</p>
                                    </div>
                                    <Bell className="w-8 h-8 text-blue-600" />
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="p-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-2xl font-bold text-orange-600">{unreadNotifications.length}</p>
                                        <p className="text-sm text-muted-foreground">Unread</p>
                                    </div>
                                    <div className="relative">
                                        <Bell className="w-8 h-8 text-orange-600" />
                                        {unreadNotifications.length > 0 && (
                                            <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
                                        )}
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <Card>
                            <CardContent className="p-4">
                                <div className="flex items-center justify-between">
                                    <div>
                                        <p className="text-2xl font-bold text-green-600">{readNotifications.length}</p>
                                        <p className="text-sm text-muted-foreground">Read</p>
                                    </div>
                                    <CheckCircle className="w-8 h-8 text-green-600" />
                                </div>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Notifications Section */}
                    {notifications.length === 0 ? (
                        <Card>
                            <CardContent className="text-center py-16">
                                <Bell className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                                <h3 className="text-lg font-semibold mb-2">No Notifications</h3>
                                <p className="text-muted-foreground">
                                    You're all caught up! New notifications will appear here.
                                </p>
                            </CardContent>
                        </Card>
                    ) : (
                        <Tabs defaultValue="unread" className="space-y-6">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
                                <TabsList className="grid w-full grid-cols-2 sm:w-auto">
                                    <TabsTrigger value="unread">
                                        Unread ({unreadNotifications.length})
                                    </TabsTrigger>
                                    <TabsTrigger value="all">
                                        All ({notifications.length})
                                    </TabsTrigger>
                                </TabsList>

                                {/* Search */}
                                <div className="relative mt-4 sm:mt-0 sm:w-64">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                                    <Input
                                        placeholder="Search notifications..."
                                        className="pl-9"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>
                            </div>

                            <TabsContent value="unread" className="space-y-4">
                                {filteredUnread.length === 0 ? (
                                    <Card>
                                        <CardContent className="text-center py-12">
                                            <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
                                            <h3 className="text-lg font-semibold mb-2">
                                                {searchQuery ? "No matching unread notifications" : "All caught up!"}
                                            </h3>
                                            <p className="text-muted-foreground">
                                                {searchQuery
                                                    ? "Try adjusting your search terms."
                                                    : "You have no unread notifications."
                                                }
                                            </p>
                                        </CardContent>
                                    </Card>
                                ) : (
                                    <div className="space-y-4">
                                        {filteredUnread.map((notification) => (
                                            <NotificationCard key={notification.id} notification={notification} />
                                        ))}
                                    </div>
                                )}
                            </TabsContent>

                            <TabsContent value="all" className="space-y-4">
                                {(searchQuery ? [...filteredUnread, ...filteredRead] : notifications).length === 0 ? (
                                    <Card>
                                        <CardContent className="text-center py-12">
                                            <Bell className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                                            <h3 className="text-lg font-semibold mb-2">No notifications found</h3>
                                            <p className="text-muted-foreground">
                                                Try adjusting your search terms.
                                            </p>
                                        </CardContent>
                                    </Card>
                                ) : (
                                    <div className="space-y-4">
                                        {(searchQuery ? [...filteredUnread, ...filteredRead] : notifications)
                                            .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
                                            .map((notification) => (
                                                <NotificationCard key={notification.id} notification={notification} />
                                            ))
                                        }
                                    </div>
                                )}
                            </TabsContent>
                        </Tabs>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Notifications;