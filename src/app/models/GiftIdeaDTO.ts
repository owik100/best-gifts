import { CommentDTO } from './CommentDTO';
import { GiftIdeaCategoryDTO } from './GiftIdeaCategoryDTO';

export interface GiftIdeaDTO{
    giftIdeaId: number;
    name: string;
    description: string;
    author: string;
    likesCounter: string;
    imageContentB64: string;
    externalUrl: string;

    commentsDTO: CommentDTO[];
    giftIdeaCategoryDTO: GiftIdeaCategoryDTO[];
}
