import { GiftIdeaCategory } from './GiftIdeaCategory';

export interface Category{
    categoryId: number;
    name: string;

    giftIdeaCategory: GiftIdeaCategory[];
}
