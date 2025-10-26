import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navbar from "@/components/Navbar";
import { Calendar, Users, TrendingUp } from "lucide-react";

const Index = () => {

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />

            {/* Hero Section */}
            <section className="relative pt-20 pb-16 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center space-y-8">
                        {/* Main Heading */}
                        <div className="space-y-6">
                            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
                                <Calendar className="w-4 h-4" />
                                <span>Professional Event Management</span>
                            </div>

                            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight">
                                Organize & Manage
                                <span className="block text-blue-600">Events Seamlessly</span>
                            </h1>

                            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
                                Complete event management solution for organizers and attendees. Create events, manage registrations, and track attendance with ease.
                            </p>
                        </div>

                        {/* Quick Actions */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
                            <Button size="lg" className="bg-primary hover:bg-primary/90" asChild>
                                <Link to="/events">Browse Events</Link>
                            </Button>
                            <Button variant="outline" size="lg" asChild>
                                <Link to="/auth">Get Started</Link>
                            </Button>
                        </div>

                        {/* Role Selection CTAs */}
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-8">
                            <div className="bg-white border-2 border-blue-200 rounded-xl p-6 hover:border-blue-400 transition-colors group">
                                <Users className="w-12 h-12 text-blue-600 mx-auto mb-4" />
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">Event Organizer</h3>
                                <p className="text-gray-600 mb-4">Create and manage events, track attendees, send notifications</p>
                                <Button className="w-full" asChild>
                                    <Link to="/auth?role=organizer">Get Started</Link>
                                </Button>
                            </div>

                            <div className="bg-white border-2 border-green-200 rounded-xl p-6 hover:border-green-400 transition-colors group">
                                <Calendar className="w-12 h-12 text-green-600 mx-auto mb-4" />
                                <h3 className="text-xl font-semibold text-gray-900 mb-2">Attendee</h3>
                                <p className="text-gray-600 mb-4">Discover events, register easily, get notifications</p>
                                <Button variant="outline" className="w-full" asChild>
                                    <Link to="/auth?role=attendee">Join Events</Link>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <section className="py-20 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Complete Event Management Solution</h2>
                        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                            Everything you need to organize successful events, from creation to completion
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
                        {/* User Authentication */}
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center mb-4">
                                <Users className="w-6 h-6 text-blue-600" />
                            </div>
                            <h3 className="text-lg font-semibold mb-2 text-gray-900">User Authentication</h3>
                            <p className="text-gray-600 text-sm">
                                Secure login/signup with email or Google OAuth for organizers and attendees
                            </p>
                            <div className="mt-3">
                                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">✅ Easy Setup</span>
                            </div>
                        </div>

                        {/* Event Creation */}
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center mb-4">
                                <Calendar className="w-6 h-6 text-purple-600" />
                            </div>
                            <h3 className="text-lg font-semibold mb-2 text-gray-900">Event Creation Form</h3>
                            <p className="text-gray-600 text-sm">
                                Create events with title, date, venue, description, and image uploads
                            </p>
                            <div className="mt-3">
                                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">✅ Easy Setup</span>
                            </div>
                        </div>

                        {/* Event Listing */}
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center mb-4">
                                <TrendingUp className="w-6 h-6 text-green-600" />
                            </div>
                            <h3 className="text-lg font-semibold mb-2 text-gray-900">Event Listing Page</h3>
                            <p className="text-gray-600 text-sm">
                                Public view of all upcoming events with search and filter options
                            </p>
                            <div className="mt-3">
                                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">✅ Easy Setup</span>
                            </div>
                        </div>

                        {/* RSVP System */}
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center mb-4">
                                <Users className="w-6 h-6 text-orange-600" />
                            </div>
                            <h3 className="text-lg font-semibold mb-2 text-gray-900">RSVP / Registration</h3>
                            <p className="text-gray-600 text-sm">
                                Easy registration system for attendees with confirmation emails
                            </p>
                            <div className="mt-3">
                                <span className="text-xs bg-green-100 text-green-700 px-2 py-1 rounded">✅ Easy Setup</span>
                            </div>
                        </div>

                        {/* Attendee Management */}
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 rounded-lg bg-red-100 flex items-center justify-center mb-4">
                                <TrendingUp className="w-6 h-6 text-red-600" />
                            </div>
                            <h3 className="text-lg font-semibold mb-2 text-gray-900">Attendee Management</h3>
                            <p className="text-gray-600 text-sm">
                                View, manage and export attendee lists with detailed analytics
                            </p>
                            <div className="mt-3">
                                <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded">⚡ Medium</span>
                            </div>
                        </div>

                        {/* Notification System */}
                        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200 hover:shadow-md transition-shadow">
                            <div className="w-12 h-12 rounded-lg bg-indigo-100 flex items-center justify-center mb-4">
                                <Calendar className="w-6 h-6 text-indigo-600" />
                            </div>
                            <h3 className="text-lg font-semibold mb-2 text-gray-900">Email Notifications</h3>
                            <p className="text-gray-600 text-sm">
                                Automated confirmation emails and event reminders for attendees
                            </p>
                            <div className="mt-3">
                                <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded">⚡ Medium</span>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto text-center space-y-8 bg-gradient-to-r from-blue-50 to-purple-50 p-12 rounded-2xl border border-blue-200">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
                            Ready to Start Managing Events?
                        </h2>
                        <p className="text-lg text-gray-600">
                            Join our platform and experience seamless event management with role-based access for organizers and attendees
                        </p>
                        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                            <Button size="lg" className="bg-blue-600 hover:bg-blue-700" asChild>
                                <Link to="/auth?role=organizer">Start as Organizer</Link>
                            </Button>
                            <Button variant="outline" size="lg" asChild>
                                <Link to="/auth?role=attendee">Join as Attendee</Link>
                            </Button>
                        </div>

                        {/* Quick Stats */}
                        <div className="grid grid-cols-3 gap-8 pt-8 max-w-lg mx-auto">
                            <div className="text-center">
                                <div className="text-2xl font-bold text-blue-600">1.2K+</div>
                                <div className="text-sm text-gray-600">Events Created</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-purple-600">45K+</div>
                                <div className="text-sm text-gray-600">Attendees</div>
                            </div>
                            <div className="text-center">
                                <div className="text-2xl font-bold text-green-600">98%</div>
                                <div className="text-sm text-gray-600">Satisfaction</div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="border-t border-gray-200 py-12 bg-white">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                        <div className="flex items-center gap-2">
                            <Calendar className="w-5 h-5 text-blue-600" />
                            <span className="font-semibold text-gray-900">EventHub</span>
                        </div>
                        <p className="text-sm text-gray-600">
                            © 2025 EventHub. Professional Event Management Platform.
                        </p>
                        <div className="flex items-center gap-6 text-sm text-gray-600">
                            <Link to="/about" className="hover:text-blue-600 transition-colors">About</Link>
                            <Link to="#" className="hover:text-blue-600 transition-colors">Privacy</Link>
                            <Link to="#" className="hover:text-blue-600 transition-colors">Contact</Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Index;
