import { GiftIdea } from './giftIdea';

export interface Comment{
    CommentId: number;
    CommentContent: string;
    CommentAuthor: string;

    GiftIdeaId: number;
    GiftIdea: GiftIdea;
}
