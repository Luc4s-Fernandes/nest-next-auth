'use client';

import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';
import getJwtPayload from '@/utils/jwtDecode';
import { useRouter } from "next/navigation";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const checkLoggedIn = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const response = await axios.post('http://localhost:3000/users/verify-token', { token });
                } catch (error) {
                    console.error('Erro ao verificar token:', error);
                    setUser(null);
                }
            }
        };

        checkLoggedIn();
    }, []);

    const axiosLogin = async (login, enteredPassword) => {
        try {
            const response = await axios.post('http://localhost:3000/users/login', {
                login,
                enteredPassword
            });

            const token = response.data.token;
            localStorage.setItem('token', token);

            const payload = getJwtPayload(token);
            setUser(payload);

            router.push("/home"); 

            console.log('Decoded Token:', payload);
        } catch (error) {
            console.error('Erro ao fazer login:', error);
            setUser(null);
            throw error;
        }
    };

    const logout = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    const isAuthenticated = () => {
        return !!user;
    };

    return (
        <AuthContext.Provider value={{ user, axiosLogin, logout, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
