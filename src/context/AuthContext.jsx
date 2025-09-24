import React, { createContext, useContext, useState, useEffect } from 'react';

// Create Auth Context
const AuthContext = createContext();

// Custom hook to use auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

// Auth Provider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);

  // Check for existing session on app load
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        const storedToken = localStorage.getItem('authToken');
        const storedUser = localStorage.getItem('userData');

        if (storedToken && storedUser) {
          const userData = JSON.parse(storedUser);
          setToken(storedToken);
          setUser(userData);
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error('Auth initialization error:', error);
        // Clear corrupted data
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
      } finally {
        setLoading(false);
      }
    };

    initializeAuth();
  }, []);

  // Login function
  const login = async (userData, authToken) => {
    try {
      console.log('🔐 AuthContext: Logging in user', { email: userData?.email });
      
      setUser(userData);
      setToken(authToken);
      setIsAuthenticated(true);
      
      // Persist to localStorage
      localStorage.setItem('authToken', authToken);
      localStorage.setItem('userData', JSON.stringify(userData));
      
      console.log('✅ AuthContext: User logged in successfully');
    } catch (error) {
      console.error('❌ AuthContext: Login error', error);
      throw error;
    }
  };

  // Logout function
  const logout = () => {
    console.log('🚪 AuthContext: Logging out user');
    
    setUser(null);
    setToken(null);
    setIsAuthenticated(false);
    
    // Clear from localStorage
    localStorage.removeItem('authToken');
    localStorage.removeItem('userData');
    
    console.log('✅ AuthContext: User logged out successfully');
  };

  // Update user data
  const updateUser = (updatedUserData) => {
    setUser(updatedUserData);
    localStorage.setItem('userData', JSON.stringify(updatedUserData));
  };

  // Check if user has specific permission (for mental health features)
  const hasPermission = (permission) => {
    if (!user) return false;
    return user.permissions?.includes(permission) || user.role === 'admin';
  };

  // Auth context value
  const value = {
    user,
    isAuthenticated,
    loading,
    token,
    login,
    logout,
    updateUser,
    hasPermission,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;