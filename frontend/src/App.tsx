import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Events from "./pages/Events";
import Auth from "./pages/Auth";
import CreateEvent from "./pages/CreateEvent";
import EventDetail from "./pages/EventDetail";
import OrganizerDashboard from "./pages/OrganizerDashboard";
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
        <TooltipProvider>
            <Toaster />
            <Sonner />
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Index />} />
                    <Route path="/events" element={<Events />} />
                    <Route path="/auth" element={<Auth />} />
                    <Route path="/create-event" element={<CreateEvent />} />
                    <Route path="/events/:id" element={<EventDetail />} />
                    <Route path="/events/:id/register" element={<Registration />} />
                    <Route path="/dashboard" element={<OrganizerDashboard />} />
                    <Route path="/my-events" element={<MyEvents />} />
                    <Route path="/my-ticket/:ticketId" element={<MyTicket />} />
                    <Route path="/notifications" element={<Notifications />} />
                    <Route path="/feedback/:eventId" element={<Feedback />} />
                    <Route path="/attendee" element={<AttendeeDashboard />} />
                    {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                    <Route path="*" element={<NotFound />} />
                </Routes>
            </BrowserRouter>
        </TooltipProvider>
    </QueryClientProvider>
);

export default App;
