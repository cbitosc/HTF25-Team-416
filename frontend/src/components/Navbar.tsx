import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Calendar, Menu, X, User, LogOut } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    setMobileMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-[hsl(220_100%_60%)] flex items-center justify-center shadow-md group-hover:shadow-[var(--shadow-elegant)] transition-all">
              <Calendar className="w-6 h-6 text-primary-foreground" />
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-primary to-[hsl(220_100%_60%)] bg-clip-text text-transparent">
              EventHub
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            <Link to="/events" className="text-foreground hover:text-primary transition-colors font-medium">
              Events
            </Link>

            {/* Show dashboard links only if user is logged in */}
            {user ? (
              <>
                {user.role === 'attendee' && (
                  <>
                    <Link to="/attendee" className="text-foreground hover:text-primary transition-colors font-medium">
                      My Dashboard
                    </Link>
                    <Link to="/my-events" className="text-foreground hover:text-primary transition-colors font-medium">
                      My Events
                    </Link>
                  </>
                )}
                {user.role === 'organizer' && (
                  <>
                    <Link to="/dashboard" className="text-foreground hover:text-primary transition-colors font-medium">
                      Organizer Dashboard
                    </Link>
                    <Link to="/events-conducted" className="text-foreground hover:text-primary transition-colors font-medium">
                      Events Conducted
                    </Link>
                  </>
                )}
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <User className="w-4 h-4" />
                  <span>{user.name}</span>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleLogout}
                  className="flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Logout
                </Button>
              </>
            ) : (
              <Link to="/auth" className="text-foreground hover:text-primary transition-colors font-medium">
                Sign In
              </Link>
            )}

            {/* Show Create Event button only for organizers */}
            {user?.role === 'organizer' && (
              <Button variant="gradient" size="default" asChild>
                <Link to="/create-event">Create Event</Link>
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 hover:bg-accent rounded-lg transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="flex flex-col gap-4">
              <Link
                to="/events"
                className="text-foreground hover:text-primary transition-colors font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Events
              </Link>

              {/* Show dashboard links only if user is logged in */}
              {user ? (
                <>
                  {user.role === 'attendee' && (
                    <>
                      <Link
                        to="/attendee"
                        className="text-foreground hover:text-primary transition-colors font-medium py-2"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        My Dashboard
                      </Link>
                      <Link
                        to="/my-events"
                        className="text-foreground hover:text-primary transition-colors font-medium py-2"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        My Events
                      </Link>
                    </>
                  )}
                  {user.role === 'organizer' && (
                    <>
                      <Link
                        to="/dashboard"
                        className="text-foreground hover:text-primary transition-colors font-medium py-2"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Organizer Dashboard
                      </Link>
                      <Link
                        to="/events-conducted"
                        className="text-foreground hover:text-primary transition-colors font-medium py-2"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        Events Conducted
                      </Link>
                    </>
                  )}
                  <div className="flex items-center gap-2 text-sm text-muted-foreground py-2">
                    <User className="w-4 h-4" />
                    <span>{user.name}</span>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleLogout}
                    className="flex items-center gap-2 w-full justify-start"
                  >
                    <LogOut className="w-4 h-4" />
                    Logout
                  </Button>
                </>
              ) : (
                <Link
                  to="/auth"
                  className="text-foreground hover:text-primary transition-colors font-medium py-2"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  Sign In
                </Link>
              )}

              {/* Show Create Event button only for organizers */}
              {user?.role === 'organizer' && (
                <Button variant="gradient" size="default" asChild className="w-full">
                  <Link to="/create-event" onClick={() => setMobileMenuOpen(false)}>
                    Create Event
                  </Link>
                </Button>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
