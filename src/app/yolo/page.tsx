import React from 'react';
import { cookies } from 'next/headers';

const Page = () => {
    // Récupérer les cookies
    const cookieStore = cookies();
    
    // Récupérer la valeur du cookie 'access_tokens'
    const accessToken = cookieStore.get('access_tokens');
    
    // Afficher la valeur du cookie dans la console pour le débogage
    console.log('Access token:', accessToken);

    return (
        <div>
            {/* Afficher d'autres contenus ou utiliser la valeur du cookie */}
        </div>
    );
};

export default Page;
