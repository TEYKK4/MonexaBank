import type {ReactNode} from 'react';

export interface User {
    id: string;
    email: string;
    userName: string;
    firstName: string;
    lastName: string;
}

export interface LoginRequest {
    emailOrUsername: string;
    password: string;
}

export interface RegisterRequest {
    email: string;
    phoneNumber: string;
    userName: string;
    firstName: string;
    lastName: string;
    password: string;
    confirmPassword: string;
}

export interface AuthResult {
    success: boolean;
    error?: string;
    user?: User;
}

export interface RegisterResult {
    success: boolean;
    errors?: string[];
    message?: string;
}

export interface AuthContextType {
    user: User | null;
    login: (emailOrUsername: string, password: string) => Promise<AuthResult>;
    register: (userData: RegisterRequest) => Promise<RegisterResult>;
    logout: () => void;
    checkAuth: () => Promise<boolean>;
    loading: boolean;
    isAuthenticated: boolean;
}

export interface AuthProviderProps {
    children: ReactNode;
}
