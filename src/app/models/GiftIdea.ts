import { Comment } from './Comment';
import { GiftIdeaCategory } from './GiftIdeaCategory';

export interface GiftIdea{
    GiftIdeaId: number;
    Name: string;
    Description: string;
    Author: string;
    LikesCounter: string;

    Comments: Comment[];
    GiftIdeaCategory: GiftIdeaCategory[];
}
