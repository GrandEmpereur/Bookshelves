import axios from 'axios';
import options from "@/lib/api";


import CommunityDetailsClient from './CommunityDetailsClient';

interface Params {
    params: {
        id: string;
    };
}

export default function CommunityPage({ params }: Params) {
    return <CommunityDetailsClient id={params.id} />;
}

// Fonction pour générer les chemins statiques
export async function generateStaticParams() {
    const response = await axios.get('https://bookish.empereur.me/api/community', options);
    const communities = response.data;

    return communities.map((community: any) => ({
        id: community.communityId,
    }));
}
