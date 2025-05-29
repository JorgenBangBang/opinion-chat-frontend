import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AuthService from '../services/AuthService';
import { UserRole } from '../types';

// Auth state interface
interface AuthState {
  isAuthenticated: boolean;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    role: UserRole;
  } | null;
  loading: boolean;
  error: string | null;
}

// Auth context interface
interface AuthContextInterface {
  state: AuthState;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, firstName: string, lastName: string, role: UserRole) => Promise<void>;
  logout: () => void;
  clearError: () => void;
  canModerate: () => boolean;
  isAdmin: () => boolean;
  isObserver: () => boolean;
}

// Initial auth state
const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  loading: true,
  error: null
};

// Create auth context
const AuthContext = createContext<AuthContextInterface | undefined>(undefined);

// Auth provider props
interface AuthProviderProps {
  children: ReactNode;
}

// Auth provider component
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, setState] = useState<AuthState>(initialState);

  // Check if user is already logged in
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await AuthService.getCurrentUser();
        if (user) {
          setState({
            isAuthenticated: true,
            user,
            loading: false,
            error: null
          });
        } else {
          setState({
            isAuthenticated: false,
            user: null,
            loading: false,
            error: null
          });
        }
      } catch (error) {
        setState({
          isAuthenticated: false,
          user: null,
          loading: false,
          error: 'Failed to authenticate'
        });
      }
    };

    checkAuth();
  }, []);

  // Login
  const login = async (email: string, password: string) => {
    try {
      setState({ ...state, loading: true, error: null });
      const user = await AuthService.login(email, password);
      setState({
        isAuthenticated: true,
        user,
        loading: false,
        error: null
      });
    } catch (error) {
      setState({
        ...state,
        loading: false,
        error: 'Invalid credentials'
      });
      throw error;
    }
  };

  // Register
  const register = async (email: string, password: string, firstName: string, lastName: string, role: UserRole) => {
    try {
      setState({ ...state, loading: true, error: null });
      const user = await AuthService.register(email, password, firstName, lastName, role);
      setState({
        isAuthenticated: true,
        user,
        loading: false,
        error: null
      });
    } catch (error) {
      setState({
        ...state,
        loading: false,
        error: 'Registration failed'
      });
      throw error;
    }
  };

  // Logout
  const logout = () => {
    AuthService.logout();
    setState({
      isAuthenticated: false,
      user: null,
      loading: false,
      error: null
    });
  };

  // Clear error
  const clearError = () => {
    setState({ ...state, error: null });
  };

  // Check if user can moderate (admin or moderator)
  const canModerate = () => {
    return state.isAuthenticated && state.user && (state.user.role === UserRole.ADMIN || state.user.role === UserRole.MODERATOR);
  };

  // Check if user is admin
  const isAdmin = () => {
    return state.isAuthenticated && state.user && state.user.role === UserRole.ADMIN;
  };

  // Check if user is observer
  const isObserver = () => {
    return state.isAuthenticated && state.user && state.user.role === UserRole.OBSERVER;
  };

  return (
    <AuthContext.Provider
      value={{
        state,
        login,
        register,
        logout,
        clearError,
        canModerate,
        isAdmin,
        isObserver
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = (): AuthContextInterface => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
