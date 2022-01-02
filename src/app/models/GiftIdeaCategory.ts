import { Category } from './Category';
import { GiftIdea } from './giftIdea';

export interface GiftIdeaCategory{
    giftIdeaId: number;
    giftIdea: GiftIdea;

    categoryId: number;
    category: Category;
}
