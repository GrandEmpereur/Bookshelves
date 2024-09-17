// context/AuthContext.tsx

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { login, register, logout } from '@/services/authService';
import { CurrentUser } from '@/services/usersServices';
import { User } from '@/types/auth';
import { Storage } from '@capacitor/storage';

interface AuthContextProps {
    user: User | null;
    isAuthenticated: boolean;
    loginUser: (email: string, password: string) => Promise<void>;
    registerUser: (userData: Record<string, unknown>) => Promise<void>;
    logoutUser: () => void;
    hasCompletedOnboarding: boolean;
    setHasCompletedOnboarding: (value: boolean) => void;
}

export const AuthContext = createContext<AuthContextProps | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const [hasCompletedOnboarding, setHasCompletedOnboarding] = useState<boolean>(false);
    const router = useRouter();

    useEffect(() => {
        const fetchUser = async () => {
            try {
                const { value } = await Storage.get({ key: 'hasCompletedOnboarding' });
                setHasCompletedOnboarding(value === 'true');

                const currentUser = await CurrentUser();
                setUser(currentUser);
                setIsAuthenticated(!!currentUser);
            } catch (error) {
                console.error('Erreur lors de la vérification de l\'utilisateur:', error);
            }
        };

        fetchUser();
    }, []);

    const loginUser = async (email: string, password: string) => {
        try {
            const data = await login(email, password);
            setUser(data.user);
            setIsAuthenticated(true);
            await Storage.set({ key: 'hasCompletedOnboarding', value: 'true' }); // Mark onboarding as complete
            router.push('/feed');
        } catch (error) {
            console.error('Erreur lors de la connexion:', (error as Error).message);
        }
    };

    const registerUser = async (userData: Record<string, unknown>) => {
        try {
            const data = await register(userData);
            setUser(data.user);
            setIsAuthenticated(true);
            await Storage.set({ key: 'hasCompletedOnboarding', value: 'true' }); // Mark onboarding as complete
        } catch (error) {
            console.error('Erreur lors de l\'inscription:', (error as Error).message);
        }
    };

    const logoutUser = async () => {
        try {
            await logout();
            setUser(null);
            setIsAuthenticated(false);
            router.push('/auth/login');
        } catch (error) {
            console.error('Erreur lors de la déconnexion:', (error as Error).message);
        }
    };

    return (
        <AuthContext.Provider
            value={{ user, isAuthenticated, loginUser, registerUser, logoutUser, hasCompletedOnboarding, setHasCompletedOnboarding }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth doit être utilisé à l\'intérieur de AuthProvider');
    }
    return context;
};
