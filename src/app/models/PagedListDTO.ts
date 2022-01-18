export interface PagedListDTO<T>{
    currentPage: number;
    totalItems: number;
    totalPages: number;
    pageSize: number;

    items: T[];
}
