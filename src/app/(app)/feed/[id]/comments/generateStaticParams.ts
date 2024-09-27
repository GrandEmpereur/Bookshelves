import { getPosts } from '@/services/postService';
import { Post } from '@/types/post';

export async function generateStaticParams() {
    try {
        const postsResponse = await getPosts();
        if (!Array.isArray(postsResponse) || postsResponse.length === 0) {
            console.error("Aucun post n'a été récupéré");
            return [];
        }
        return postsResponse.map((post: Post) => ({
            id: post.id.toString()
        }));
    } catch (error) {
        console.error("Erreur lors de la récupération des posts:", error);
        return [];
    }
}