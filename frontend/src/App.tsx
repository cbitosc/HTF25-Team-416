import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/ProtectedRoute";
import Index from "./pages/Index";
import Events from "./pages/Events";
import Auth from "./pages/Auth";
import CreateEvent from "./pages/CreateEvent";
import EventDetail from "./pages/EventDetail";
import OrganizerDashboard from "./pages/OrganizerDashboard";
import OrganizedEventDetails from "./pages/OrganizedEventDetails";
import EventsConducted from "./pages/EventsConducted";
import Registration from "./pages/Registration";
import MyEvents from "./pages/MyEvents";
import MyTicket from "./pages/MyTicket";
import Notifications from "./pages/Notifications";
import Feedback from "./pages/Feedback";
import AttendeeDashboard from "./pages/AttendeeDashboard";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
    <QueryClientProvider client={queryClient}>
        <AuthProvider>
            <TooltipProvider>
                <Toaster />
                <Sonner />
                <BrowserRouter>
                    <Routes>
                        <Route path="/" element={<Index />} />
                        <Route path="/events" element={<Events />} />
                        <Route path="/auth" element={<Auth />} />
                        <Route path="/create-event" element={
                            <ProtectedRoute requiredRole="organizer">
                                <CreateEvent />
                            </ProtectedRoute>
                        } />
                        <Route path="/events/:id" element={<EventDetail />} />
                        <Route path="/events/:id/register" element={
                            <ProtectedRoute>
                                <Registration />
                            </ProtectedRoute>
                        } />
                        <Route path="/dashboard" element={
                            <ProtectedRoute requiredRole="organizer">
                                <OrganizerDashboard />
                            </ProtectedRoute>
                        } />
                        <Route path="/events-conducted" element={
                            <ProtectedRoute requiredRole="organizer">
                                <EventsConducted />
                            </ProtectedRoute>
                        } />
                        <Route path="/organized-events/:id" element={
                            <ProtectedRoute requiredRole="organizer">
                                <OrganizedEventDetails />
                            </ProtectedRoute>
                        } />
                        <Route path="/attendee" element={
                            <ProtectedRoute requiredRole="attendee">
                                <AttendeeDashboard />
                            </ProtectedRoute>
                        } />
                        <Route path="/my-events" element={
                            <ProtectedRoute requiredRole="attendee">
                                <MyEvents />
                            </ProtectedRoute>
                        } />
                        <Route path="/my-ticket/:ticketId" element={
                            <ProtectedRoute requiredRole="attendee">
                                <MyTicket />
                            </ProtectedRoute>
                        } />
                        <Route path="/notifications" element={
                            <ProtectedRoute>
                                <Notifications />
                            </ProtectedRoute>
                        } />
                        <Route path="/feedback/:eventId" element={
                            <ProtectedRoute>
                                <Feedback />
                            </ProtectedRoute>
                        } />
                        {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                        <Route path="*" element={<NotFound />} />
                    </Routes>
                </BrowserRouter>
            </TooltipProvider>
        </AuthProvider>
    </QueryClientProvider>
);

export default App;
