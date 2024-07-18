// app/(main)/feed/[feedId]/commentaire/generateStaticParams.ts
import { fetchFeeds } from '@/services/feedServices';

export async function generateStaticParams(token: string) {
    const feeds = await fetchFeeds(token);

    console.log('Fetched feeds:', feeds);

    // Check if feeds is an array
    if (!Array.isArray(feeds)) {
        console.error('Expected an array but got:', feeds);
        throw new Error('Expected an array but got non-array response');
    }

    return feeds.map((feed: { feedId: string }) => ({
        feedId: feed.feedId,
    }));
}
