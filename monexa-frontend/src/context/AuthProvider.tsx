import React, { useState, useEffect } from 'react';
import type {
    AuthContextType,
    AuthProviderProps,
    User,
    LoginRequest,
    RegisterRequest,
    AuthResult,
    RegisterResult
} from './types';
import { AuthContext } from './AuthContext';


const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const API_BASE_URL = 'http://localhost:5217/api';
    const [authLoading, setAuthLoading] = useState(true);

    const login = async (userData: LoginRequest): Promise<AuthResult> => {
        setLoading(true);
        console.log(userData);
        try {
            const response = await fetch(`${API_BASE_URL}/Auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData),
            });

            const data = await response.json();

            if (response.ok) {
                localStorage.setItem('token', data.token);

                const userResponse = await fetch(`${API_BASE_URL}/Auth/me`, {
                    headers: { 'Authorization': `Bearer ${data.token}` },
                });

                if (userResponse.ok) {
                    const userData: User = await userResponse.json();
                    setUser(userData);
                    return { success: true, user: userData };
                }
            } else {
                return { success: false, error: data.message || 'Login failed' };
            }
        } catch {
            return { success: false, error: 'Network error. Please try again.' };
        } finally {
            setLoading(false);
        }

        return { success: false, error: 'An unexpected error occurred' };
    };

    const register = async (userData: RegisterRequest): Promise<RegisterResult> => {
        setLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(userData),
            });

            const data = await response.json();

            if (response.ok) {
                return { success: true, message: data.message };
            } else {
                return { success: false, errors: data.errors || ['Registration failed'] };
            }
        } catch {
            return { success: false, errors: ['Network error. Please try again.'] };
        } finally {
            setLoading(false);
        }
    };

    const logout = (): void => {
        localStorage.removeItem('token');
        setUser(null);
        console.log(user);
    };

    const checkAuth = async (): Promise<boolean> => {
        const token = localStorage.getItem('token');
        if (!token) return false;

        try {
            const response = await fetch(`${API_BASE_URL}/auth/me`, {
                headers: { 'Authorization': `Bearer ${token}` },
            });

            if (response.ok) {
                const userData: User = await response.json();
                setUser(userData);
                return true;
            } else {
                localStorage.removeItem('token');
                return false;
            }
        } catch {
            localStorage.removeItem('token');
            return false;
        }
    };

    useEffect(() => {
        checkAuth().finally(() => setAuthLoading(false));
    }, []);

    const value: AuthContextType = {
        user,
        login,
        register,
        logout,
        checkAuth,
        loading,
        isAuthenticated: !!user,
    };

    if (authLoading) {
        return null;
    }

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export { AuthProvider };
