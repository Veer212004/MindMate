// API Configuration for Mental Health Care App
export const API_BASE = process.env.NODE_ENV === 'production' 
  ? 'https://your-mental-health-api.com' // Replace with your production API URL
  : 'http://localhost:5000'; // Local development server

/**
 * Enhanced API request function with authentication support
 * @param {string} endpoint - API endpoint (e.g., '/api/auth/login')
 * @param {object} options - Fetch options (method, body, headers, etc.)
 * @returns {Promise<Response>} - Fetch response
 */
export const apiRequest = async (endpoint, options = {}) => {
  // Get auth token from localStorage
  const token = localStorage.getItem('mental-care-token');
  
  // Default headers
  const defaultHeaders = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  };
  
  // Add authorization header if token exists
  if (token) {
    defaultHeaders['Authorization'] = `Bearer ${token}`;
  }
  
  // Merge headers
  const headers = {
    ...defaultHeaders,
    ...options.headers,
  };
  
  // Prepare request options
  const requestOptions = {
    ...options,
    headers,
  };
  
  // Make request
  try {
    const response = await fetch(`${API_BASE}${endpoint}`, requestOptions);
    
    // Handle token expiration
    if (response.status === 401) {
      // Token expired or invalid
      localStorage.removeItem('mental-care-user');
      localStorage.removeItem('mental-care-token');
      
      // Redirect to login if needed
      if (window.location.pathname !== '/login' && window.location.pathname !== '/signup') {
        window.location.href = '/login';
      }
    }
    
    return response;
  } catch (error) {
    console.error('API Request Error:', error);
    throw error;
  }
};

/**
 * Authentication API endpoints
 */
export const authAPI = {
  // User registration
  register: async (userData) => {
    return apiRequest('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  },
  
  // User login
  login: async (credentials) => {
    return apiRequest('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials),
    });
  },
  
  // Google authentication
  googleAuth: async (googleData) => {
    return apiRequest('/api/auth/google', {
      method: 'POST',
      body: JSON.stringify(googleData),
    });
  },
  
  // Forgot password
  forgotPassword: async (email) => {
    return apiRequest('/api/auth/forgot-password', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  },
  
  // Reset password
  resetPassword: async (resetData) => {
    return apiRequest('/api/auth/reset-password', {
      method: 'POST',
      body: JSON.stringify(resetData),
    });
  },
  
  // Verify OTP
  verifyOTP: async (otpData) => {
    return apiRequest('/api/auth/verify-otp', {
      method: 'POST',
      body: JSON.stringify(otpData),
    });
  },
  
  // Check if email exists
  checkEmail: async (email) => {
    return apiRequest('/api/auth/check-email', {
      method: 'POST',
      body: JSON.stringify({ email }),
    });
  },
  
  // Refresh token
  refreshToken: async () => {
    return apiRequest('/api/auth/refresh', {
      method: 'POST',
    });
  },
  
  // Logout
  logout: async () => {
    return apiRequest('/api/auth/logout', {
      method: 'POST',
    });
  },
};

/**
 * Mental Health specific API endpoints
 */
export const mentalHealthAPI = {
  // Get user's mental health profile
  getProfile: async () => {
    return apiRequest('/api/mental-health/profile');
  },
  
  // Update mental health preferences
  updatePreferences: async (preferences) => {
    return apiRequest('/api/mental-health/preferences', {
      method: 'PUT',
      body: JSON.stringify(preferences),
    });
  },
  
  // Get chat history
  getChatHistory: async () => {
    return apiRequest('/api/mental-health/chat-history');
  },
  
  // Save chat session
  saveChatSession: async (sessionData) => {
    return apiRequest('/api/mental-health/chat-session', {
      method: 'POST',
      body: JSON.stringify(sessionData),
    });
  },
  
  // Book appointment
  bookAppointment: async (appointmentData) => {
    return apiRequest('/api/mental-health/appointments', {
      method: 'POST',
      body: JSON.stringify(appointmentData),
    });
  },
  
  // Get user appointments
  getAppointments: async () => {
    return apiRequest('/api/mental-health/appointments');
  },
  
  // Get resources
  getResources: async (category = null) => {
    const endpoint = category 
      ? `/api/mental-health/resources?category=${category}`
      : '/api/mental-health/resources';
    return apiRequest(endpoint);
  },
  
  // Forum endpoints
  getForumPosts: async (page = 1) => {
    return apiRequest(`/api/mental-health/forum?page=${page}`);
  },
  
  createForumPost: async (postData) => {
    return apiRequest('/api/mental-health/forum', {
      method: 'POST',
      body: JSON.stringify(postData),
    });
  },
  
  // Crisis support
  reportCrisis: async (crisisData) => {
    return apiRequest('/api/mental-health/crisis-report', {
      method: 'POST',
      body: JSON.stringify(crisisData),
    });
  },
};

/**
 * User profile API endpoints
 */
export const userAPI = {
  // Get user profile
  getProfile: async () => {
    return apiRequest('/api/user/profile');
  },
  
  // Update user profile
  updateProfile: async (profileData) => {
    return apiRequest('/api/user/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData),
    });
  },
  
  // Upload profile picture
  uploadProfilePicture: async (formData) => {
    return apiRequest('/api/user/profile-picture', {
      method: 'POST',
      headers: {}, // Let browser set Content-Type for FormData
      body: formData,
    });
  },
  
  // Delete user account
  deleteAccount: async (confirmationData) => {
    return apiRequest('/api/user/account', {
      method: 'DELETE',
      body: JSON.stringify(confirmationData),
    });
  },
};

/**
 * Utility functions for API handling
 */
export const apiUtils = {
  // Handle API response
  handleResponse: async (response) => {
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(data.message || `HTTP error! status: ${response.status}`);
    }
    
    return data;
  },
  
  // Create form data for file uploads
  createFormData: (data) => {
    const formData = new FormData();
    
    Object.keys(data).forEach(key => {
      if (data[key] !== null && data[key] !== undefined) {
        formData.append(key, data[key]);
      }
    });
    
    return formData;
  },
  
  // Build query string
  buildQueryString: (params) => {
    const searchParams = new URLSearchParams();
    
    Object.keys(params).forEach(key => {
      if (params[key] !== null && params[key] !== undefined) {
        searchParams.append(key, params[key]);
      }
    });
    
    return searchParams.toString();
  },
};

export default {
  apiRequest,
  authAPI,
  mentalHealthAPI,
  userAPI,
  apiUtils,
  API_BASE,
};