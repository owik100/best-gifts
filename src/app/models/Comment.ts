import { GiftIdea } from './giftIdea';

export interface Comment{
    commentId: number;
    commentContent: string;
    commentAuthor: string;

    giftIdeaId: number;
    giftIdea: GiftIdea;
}
