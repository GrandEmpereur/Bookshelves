// hooks/useAuth.ts

import { useContext } from 'react';
import { AuthContext } from '@context/AuthContext';

// Hook personnalisé pour utiliser le contexte d'authentification
export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth doit être utilisé à l\'intérieur de AuthProvider');
    }
    return context;
};
