import { CategoryDTO } from './CategoryDTO';
import { CommentDTO } from './CommentDTO';
import { PagedListDTO } from './PagedListDTO';

export interface GiftIdeaDTO{
    giftIdeaId: number;
    name: string;
    description: string;
    author: string;
    likesCounter: string;
    imageContentB64: string;
    externalUrl: string;
    CreationTime: Date;

    commentsDTO: PagedListDTO<CommentDTO>;
    categoriesDTO: CategoryDTO[];
}
