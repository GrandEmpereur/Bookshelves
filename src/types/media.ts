export interface Media {
    id: string;
    url: string;
    filePath: string;
    type: 'image' | 'video' | 'gif';
    postId: string;
    createdAt: string;
    updatedAt: string;
}