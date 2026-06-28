import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { 
  User, 
  signInWithPopup, 
  signOut, 
  onAuthStateChanged 
} from 'firebase/auth';
import { auth, googleProvider, isConfigured } from '../firebase';

// Helper mock types matching Firebase User for unified state
export interface AuthUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  photoURL: string | null;
}

interface AuthContextType {
  user: AuthUser | null;
  role: 'student' | 'admin' | null;
  loading: boolean;
  loginWithGoogle: () => Promise<void>;
  loginWithEmail: (email: string, password: string, roleType: 'student' | 'admin') => Promise<{ success: boolean; error?: string }>;
  registerStudent: (email: string, password: string, name: string) => Promise<{ success: boolean; error?: string }>;
  logout: () => Promise<void>;
  isConfigured: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const ADMIN_CREDENTIALS = { email: 'camford.academy.edu@gmail.com', password: 'admin123' };
const STUDENT_CREDENTIALS = { email: 'student@camford.edu', password: 'student123' };

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [role, setRole] = useState<'student' | 'admin' | null>(null);
  const [loading, setLoading] = useState(true);

  // Sync state helpers
  const setSessionState = (currentUser: AuthUser | null, userRole: 'student' | 'admin' | null) => {
    setUser(currentUser);
    setRole(userRole);
    if (currentUser) {
      localStorage.setItem('camford_session', JSON.stringify({ user: currentUser, role: userRole }));
    } else {
      localStorage.removeItem('camford_session');
    }
  };

  const loginWithGoogle = async () => {
    if (!isConfigured || !auth || !googleProvider) {
      // Only use mock in local dev when Firebase is not configured at all
      console.warn("Firebase is not configured. Falling back to mock Google login for local dev.");
      const mockGoogleUser: AuthUser = {
        uid: 'mock_google_id_' + Date.now(),
        email: 'student@gmail.com',
        displayName: 'Google User',
        photoURL: null
      };
      setSessionState(mockGoogleUser, 'student');
      return;
    }
    try {
      const result = await signInWithPopup(auth, googleProvider);
      if (result.user) {
        const isUserAdmin = result.user.email === 'camford.academy.edu@gmail.com' || result.user.email === 'admin@camford.edu' || result.user.email?.endsWith('@camford.edu.pk');
        const unifiedUser: AuthUser = {
          uid: result.user.uid,
          email: result.user.email,
          displayName: result.user.displayName,
          photoURL: result.user.photoURL
        };
        setSessionState(unifiedUser, isUserAdmin ? 'admin' : 'student');
      }
    } catch (error: any) {
      console.error("Google Sign-In Error: ", error);
      // Re-throw so the UI can display the actual error to the user
      throw error;
    }
  };


  const loginWithEmail = async (email: string, password: string, roleType: 'student' | 'admin') => {
    // Standard mock credentials check
    if (roleType === 'admin') {
      if (email.trim().toLowerCase() === ADMIN_CREDENTIALS.email && password === ADMIN_CREDENTIALS.password) {
        const adminUser: AuthUser = {
          uid: 'mock_admin_id',
          email: ADMIN_CREDENTIALS.email,
          displayName: 'Academic Manager',
          photoURL: null
        };
        setSessionState(adminUser, 'admin');
        return { success: true };
      }
      return { success: false, error: 'Incorrect email or password.' };
    } else {
      if (email.trim().toLowerCase() === STUDENT_CREDENTIALS.email && password === STUDENT_CREDENTIALS.password) {
        const studentUser: AuthUser = {
          uid: 'mock_student_id',
          email: STUDENT_CREDENTIALS.email,
          displayName: 'Ammar Khan (Student)',
          photoURL: null
        };
        setSessionState(studentUser, 'student');
        return { success: true };
      }
      // Allow any random user sign-in for testing purposes
      if (email.includes('@') && password.length >= 6) {
        const testUser: AuthUser = {
          uid: 'mock_test_student_' + Math.random().toString(36).substr(2, 9),
          email: email.trim().toLowerCase(),
          displayName: email.split('@')[0],
          photoURL: null
        };
        setSessionState(testUser, 'student');
        return { success: true };
      }
      return { success: false, error: 'Incorrect email or password.' };
    }
  };

  const registerStudent = async (email: string, password: string, name: string) => {
    if (!email.includes('@') || password.length < 6 || name.trim().length === 0) {
      return { success: false, error: 'Please enter your name, a valid email, and a password of at least 6 characters.' };
    }
    const newUser: AuthUser = {
      uid: 'mock_student_reg_' + Date.now(),
      email: email.trim().toLowerCase(),
      displayName: name.trim(),
      photoURL: null
    };
    setSessionState(newUser, 'student');
    return { success: true };
  };

  const logout = async () => {
    setSessionState(null, null);
    if (isConfigured && auth) {
      try {
        await signOut(auth);
      } catch (error) {
        console.error("Sign-Out Error: ", error);
      }
    }
  };

  useEffect(() => {
    // Load local cached session if it exists to preserve login on refresh
    const cached = localStorage.getItem('camford_session');
    if (cached) {
      try {
        const parsed = JSON.parse(cached);
        setUser(parsed.user);
        setRole(parsed.role);
      } catch (e) {
        console.error("Failed to parse cached session:", e);
      }
    }

    if (!isConfigured || !auth) {
      setLoading(false);
      return;
    }

    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        const isUserAdmin = currentUser.email === 'camford.academy.edu@gmail.com' || currentUser.email === 'admin@camford.edu' || currentUser.email?.endsWith('@camford.edu.pk');
        const unifiedUser: AuthUser = {
          uid: currentUser.uid,
          email: currentUser.email,
          displayName: currentUser.displayName,
          photoURL: currentUser.photoURL
        };
        setSessionState(unifiedUser, isUserAdmin ? 'admin' : 'student');
      } else {
        // Only clear if firebase had a user and now signed out
        const session = localStorage.getItem('camford_session');
        if (session) {
          const parsed = JSON.parse(session);
          // If the session was a mock session, don't clear it. Only clear if it was Firebase.
          if (parsed.user && parsed.user.uid.startsWith('mock_')) {
            setLoading(false);
            return;
          }
        }
        setUser(null);
        setRole(null);
        localStorage.removeItem('camford_session');
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <AuthContext.Provider value={{ user, role, loading, loginWithGoogle, loginWithEmail, registerStudent, logout, isConfigured }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
