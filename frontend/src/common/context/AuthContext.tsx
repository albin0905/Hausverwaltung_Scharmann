import React, { createContext, useContext, useState, ReactNode } from 'react';
import {IUser} from "../models/IUser.d";

interface AuthContextProps {
    isAuthenticated: boolean;
    isAdmin: boolean;
    login: (isAdmin: boolean) => void;
    logout: () => void;
}

interface AuthProviderProps {
    children: ReactNode;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    const login = (admin: boolean) => {
        setIsAuthenticated(true);
        setIsAdmin(admin);
    };

    const logout = () => {
        setIsAuthenticated(false);
        setIsAdmin(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, isAdmin, login, logout }}>
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