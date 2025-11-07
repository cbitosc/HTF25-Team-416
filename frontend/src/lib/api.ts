import.meta.env.VITE_API_URL;

// Helper function to get auth token from localStorage
const getAuthToken = (): string | null => {
    return localStorage.getItem('token');
};

// Helper function to create headers with auth token
const getHeaders = (includeAuth: boolean = true): Record<string, string> => {
    const headers: Record<string, string> = {
        'Content-Type': 'application/json',
    };

    if (includeAuth) {
        const token = getAuthToken();
        if (token) {
            headers.Authorization = `Bearer ${token}`;
        }
    }

    return headers;
};

// Generic API call function
const apiCall = async (endpoint: string, options: RequestInit & { includeAuth?: boolean } = {}): Promise<any> => {
    const url = `${API_BASE_URL}${endpoint}`;
    const config: RequestInit = {
        headers: getHeaders(options.includeAuth !== false),
        ...options,
    };

    try {
        const response = await fetch(url, config);

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({}));
            throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('API call failed:', error);
        throw error;
    }
};

// Auth API calls
export const authAPI = {
    signup: (userData: any) => apiCall('/auth/signup', {
        method: 'POST',
        body: JSON.stringify(userData),
        includeAuth: false,
    }),

    login: (credentials: any) => apiCall('/auth/login', {
        method: 'POST',
        body: JSON.stringify(credentials),
        includeAuth: false,
    }),

    upgradeRole: (roleData: any) => apiCall('/auth/upgrade-role', {
        method: 'POST',
        body: JSON.stringify(roleData),
    }),
};

// Events API calls
export const eventsAPI = {
    getAllEvents: () => apiCall('/events', {
        includeAuth: false,
    }),

    getEvent: (id: string) => apiCall(`/events/${id}`, {
        includeAuth: false,
    }),

    createEvent: (eventData: any) => apiCall('/events', {
        method: 'POST',
        body: JSON.stringify(eventData),
    }),

    updateEvent: (id: string, eventData: any) => apiCall(`/events/${id}`, {
        method: 'PUT',
        body: JSON.stringify(eventData),
    }),

    deleteEvent: (id: string) => apiCall(`/events/${id}`, {
        method: 'DELETE',
    }),
};

// RSVP API calls
export const rsvpAPI = {
    registerAttendee: (registrationData: any) => apiCall('/rsvp/register', {
        method: 'POST',
        body: JSON.stringify(registrationData),
    }),

    exportAttendees: (eventId: string) => apiCall(`/rsvp/export/${eventId}`),
};

// Payment API calls
export const paymentAPI = {
    processPayment: (paymentData: any) => apiCall('/payment/process', {
        method: 'POST',
        body: JSON.stringify(paymentData),
    }),
};

export default {
    authAPI,
    eventsAPI,
    rsvpAPI,
    paymentAPI,
};