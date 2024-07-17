import { User } from '@/interfaces/user';

export interface Community {
    communityId: string;
    name: string;
    description: string;
    image: string;
    users?: User[];
}