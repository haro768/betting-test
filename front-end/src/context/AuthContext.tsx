import React, { createContext, useState, useEffect, ReactNode } from 'react';

interface AuthContextType {
    token: string | null;
    login: (userToken: string) => void;
    logout: () => void;
    setToken: (userToken: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const storedToken = localStorage.getItem('authToken');
        if (storedToken) {
            setToken(storedToken);
        }
    }, []);

    const login = (userToken: string) => {
        localStorage.setItem('authToken', userToken);
        setToken(userToken);
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        setToken(null);
    };

    const setAuthToken = (userToken: string) => {
        localStorage.setItem('authToken', userToken);
        setToken(userToken);
    };

    return (
        <AuthContext.Provider value={{ token, login, logout, setToken: setAuthToken }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthContext;
