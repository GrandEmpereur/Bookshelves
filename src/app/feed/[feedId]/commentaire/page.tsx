// app/(main)/feed/[feedId]/commentaire/page.tsx
"use client";

import React, { useEffect, useState } from 'react';
import CommentsClient from './CommentsClient';
import { generateStaticParams } from './generateStaticParams';
import { getToken } from '@/services/authentication';

const CommentsPage = ({ params }: { params: { feedId: string } }) => {
    const [token, setToken] = useState<string | null>(null);

    useEffect(() => {
        const fetchToken = async () => {
            const fetchedToken = await getToken();
            setToken(fetchedToken);
        };
        fetchToken();
    }, []);

    useEffect(() => {
        if (token) {
            generateStaticParams(token).then(staticParams => {
                console.log(staticParams);
                // You can use staticParams as needed
            });
        }
    }, [token]);

    return <CommentsClient />;
};

export default CommentsPage;
