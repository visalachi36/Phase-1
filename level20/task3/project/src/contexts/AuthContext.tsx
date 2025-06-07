import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Define user type
export interface User {
  id: string;
  name: string;
  email: string;
  bio?: string;
  skills?: string[];
  avatar?: string;
}

interface AuthContextType {
  currentUser: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (userData: Partial<User>) => Promise<void>;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

interface AuthProviderProps {
  children: ReactNode;
}

export function AuthProvider({ children }: AuthProviderProps) {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  // Mock user data for demonstration
  const mockUsers = [
    {
      id: '1',
      name: 'Visalachi',
      email: 'visalachi@gmail.com',
      password: 'password123',
      bio: 'Full-stack developer passionate about React and Node.js. Love building user-friendly applications.',
      skills: ['React', 'Node.js', 'TypeScript', 'MongoDB', 'UI/UX'],
      avatar: 'https://randomuser.me/api/portraits/women/65.jpg'
    },
    {
      id: '2',
      name: 'Niranjan',
      email: 'niranjan@example.com',
      password: 'password123',
      bio: 'Backend developer specializing in microservices and cloud architecture',
      skills: ['Java', 'Spring Boot', 'AWS', 'Kubernetes', 'Docker'],
      avatar: 'https://randomuser.me/api/portraits/men/42.jpg'
    },
    {
      id: '3',
      name: 'Dinesh',
      email: 'dinesh@example.com',
      password: 'password123',
      bio: 'Frontend developer with a keen eye for design and animation',
      skills: ['JavaScript', 'Vue.js', 'CSS', 'Figma', 'Three.js'],
      avatar: 'https://randomuser.me/api/portraits/men/22.jpg'
    }
  ];

  // Check if user is logged in on load
  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    if (storedUser) {
      setCurrentUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  // Login function
  const login = async (email: string, password: string) => {
    setLoading(true);
    try {
      // In a real app, this would be an API call
      const user = mockUsers.find(u => u.email === email && u.password === password);
      
      if (!user) {
        throw new Error('Invalid credentials');
      }
      
      // Remove password before storing user
      const { password: _, ...userWithoutPassword } = user;
      
      setCurrentUser(userWithoutPassword);
      localStorage.setItem('currentUser', JSON.stringify(userWithoutPassword));
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Register function
  const register = async (name: string, email: string, password: string) => {
    setLoading(true);
    try {
      // In a real app, this would be an API call
      const existingUser = mockUsers.find(u => u.email === email);
      
      if (existingUser) {
        throw new Error('Email already in use');
      }
      
      const newUser = {
        id: String(mockUsers.length + 1),
        name,
        email,
        bio: '',
        skills: [],
        avatar: `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${Math.floor(Math.random() * 100)}.jpg`
      };
      
      setCurrentUser(newUser);
      localStorage.setItem('currentUser', JSON.stringify(newUser));
      
      // In a real app, we would save the new user to the database
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    localStorage.removeItem('currentUser');
    setCurrentUser(null);
    return Promise.resolve();
  };

  // Update profile function
  const updateProfile = async (userData: Partial<User>) => {
    setLoading(true);
    try {
      if (!currentUser) {
        throw new Error('No user logged in');
      }
      
      const updatedUser = { ...currentUser, ...userData };
      setCurrentUser(updatedUser);
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      
      // In a real app, we would save the updated user to the database
    } catch (error) {
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    currentUser,
    login,
    register,
    logout,
    updateProfile,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}