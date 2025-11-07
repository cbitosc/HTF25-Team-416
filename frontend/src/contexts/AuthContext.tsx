import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface User {
    id: string;
    name: string;
    email: string;
    role: 'attendee' | 'organizer';
    organizerId?: string;
}

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<{ success: boolean; user?: User; error?: string }>;
    logout: () => void;
    isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Check for stored user on mount
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (error) {
                localStorage.removeItem('user');
            }
        }
        setIsLoading(false);
    }, []);

    const login = async (email: string, password: string): Promise<{ success: boolean; user?: User; error?: string }> => {
        setIsLoading(true);

        try {
            // For demo purposes, we'll simulate different users based on email
            let mockUser: User;

            if (email === 'org@gmail.com' && password === '123') {
                // Organizer user
                mockUser = {
                    id: '68fdb4d91a9ecceae12ca635', // Updated to match database organizer ID
                    name: 'Event Organizer',
                    email: 'org@gmail.com',
                    role: 'organizer',
                    organizerId: 'hXjgR4XsiB' // From our seed data
                };
            } else if (email === 'attendee@example.com' && password === '123') {
                // Attendee user
                mockUser = {
                    id: '68fdb4d91a9ecceae12ca638', // Updated to avoid conflicts
                    name: 'John Attendee',
                    email: 'attendee@example.com',
                    role: 'attendee'
                };
            } else {
                // Simulate API call delay
                await new Promise(resolve => setTimeout(resolve, 1000));
                return { success: false, error: 'Invalid email or password' };
            }

            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            setUser(mockUser);
            localStorage.setItem('user', JSON.stringify(mockUser));

            return { success: true, user: mockUser };
        } catch (error) {
            return { success: false, error: 'Login failed. Please try again.' };
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
    };

    const value: AuthContextType = {
        user,
        login,
        logout,
        isLoading
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};