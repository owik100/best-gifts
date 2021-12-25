import { Category } from './Category';
import { GiftIdea } from './giftIdea';

export interface GiftIdeaCategory{
    GiftIdeaId: number;
    GiftIdea: GiftIdea;

    CategoryId: number;
    Category: Category;
}
