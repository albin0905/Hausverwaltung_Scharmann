import React, { createContext, useContext, useState, ReactNode } from "react";
import { IUser } from "../models/IUser.d";

interface AuthContextProps {
    isAuthenticated: boolean;
    isAdmin: boolean;
    currentUser: IUser | null;
    login: (user: IUser) => void;
    logout: () => void;
}

interface AuthProviderProps {
    children: ReactNode;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [currentUser, setCurrentUser] = useState<IUser | null>(null);

    const login = (user: IUser) => {
        setCurrentUser(user);
        setIsAuthenticated(true);
        if(user.administrator === 1){
            setIsAdmin(true);
        }
    };

    const logout = () => {
        setCurrentUser(null);
        setIsAuthenticated(false);
        setIsAdmin(false);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, isAdmin, currentUser, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};