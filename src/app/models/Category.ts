import { GiftIdeaCategory } from './GiftIdeaCategory';

export interface Category{
    CategoryId: number;
    Name: string;

    GiftIdeaCategory: GiftIdeaCategory[];
}
