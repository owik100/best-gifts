import { GiftIdeaDTO } from './GiftIdeaDTO';

export interface CommentDTO{
    commentId: number;
    commentContent: string;
    commentAuthor: string;
    CreationTime: Date;

    giftIdeaId: number;
    giftIdeaDTO: GiftIdeaDTO;
}
