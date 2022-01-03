import { GiftIdeaDTO } from './GiftIdeaDTO';

export interface CommentDTO{
    commentId: number;
    commentContent: string;
    commentAuthor: string;

    giftIdeaId: number;
    giftIdeaDTO: GiftIdeaDTO;
}
