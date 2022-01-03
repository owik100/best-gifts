import { CategoryDTO } from './CategoryDTO';
import { GiftIdeaDTO } from './GiftIdeaDTO';

export interface GiftIdeaCategoryDTO{
    giftIdeaId: number;
    giftIdeaDTO: GiftIdeaDTO;

    categoryId: number;
    categoryDTO: CategoryDTO;
}
