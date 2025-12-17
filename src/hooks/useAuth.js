import { useState, useEffect } from 'react';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  updateProfile
} from 'firebase/auth';
import { auth } from '../firebase';

export function useAuth() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const login = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      throw new Error(getAuthErrorMessage(error.code));
    }
  };

  const register = async (email, password, displayName) => {
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(result.user, { displayName });
      return result.user;
    } catch (error) {
      throw new Error(getAuthErrorMessage(error.code));
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return {
    user,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!user
  };
}

function getAuthErrorMessage(errorCode) {
  switch (errorCode) {
    case 'auth/email-already-in-use':
      return 'Cet email est déjà utilisé';
    case 'auth/weak-password':
      return 'Le mot de passe doit contenir au moins 6 caractères';
    case 'auth/invalid-email':
      return 'Email invalide';
    case 'auth/user-not-found':
    case 'auth/wrong-password':
      return 'Email ou mot de passe incorrect';
    default:
      return 'Une erreur est survenue';
  }
}
