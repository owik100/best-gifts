import { GiftIdeaCategoryDTO } from './GiftIdeaCategoryDTO';

export interface CategoryDTO{
    categoryId: number;
    name: string;

    giftIdeaCategoryDTO: GiftIdeaCategoryDTO[];
}
