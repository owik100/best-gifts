import { Comment } from './Comment';
import { GiftIdeaCategory } from './GiftIdeaCategory';

export interface GiftIdea{
    giftIdeaId: number;
    name: string;
    description: string;
    author: string;
    likesCounter: string;
    imageContentB64: string;
    externalUrl: string;

    comments: Comment[];
    giftIdeaCategory: GiftIdeaCategory[];
}
