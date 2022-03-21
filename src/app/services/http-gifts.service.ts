import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { CommentDTO } from '../models/CommentDTO';
import { GiftIdeaDTO } from '../models/GiftIdeaDTO';
import { PagedListDTO } from '../models/PagedListDTO';
import { CategoryDTO } from '../models/CategoryDTO';
import { ImageHelperService } from './image-helper.service';
import { SortingModel } from '../models/SortingModel';
import { FilterModel } from '../models/FilterModel';
import { environment } from '../../environments/environment';


@Injectable({
  providedIn: 'root'
})
export class HttpGiftsService {

  private urlAPI = environment.urlAPI;

  constructor(private http: HttpClient, private imageHelper: ImageHelperService) {

  }

   // GiftIdeasController
  getAllGifts(pageIndex: number, pageSize: number, sort: SortingModel, filter: FilterModel): Observable<PagedListDTO<GiftIdeaDTO>> {
    let params = new HttpParams();

    const filterAuthor = filter?.author?.length > 0 ? filter.author : '';
    const filterGiftName = filter?.giftName?.length > 0 ? filter.giftName : '';
    const filterCategoryID = filter?.categoryID > -1 ? filter.categoryID : -1;

    params = params.append('pageNumber', (pageIndex).toString());
    params = params.append('pageSize', (pageSize).toString());
    params = params.append('sort', (sort).toString());
    params = params.append('author', (filterAuthor));
    params = params.append('giftName', (filterGiftName));
    params = params.append('categoryID', (filterCategoryID).toString());
    return this.http
      .get<PagedListDTO<GiftIdeaDTO>>(this.urlAPI + '/GiftIdeas/GetAll', {params})
      .pipe(
        map(ideas => ({
          ...ideas,
          items: ideas.items.map(item => ({
            ...item,
            imageContentB64: this.imageHelper.prepareBase64imagePrefix(item.imageContentB64)
          }))
        })),
        tap(console.log)
      );
  }

  postGift(gift: GiftIdeaDTO): Observable<GiftIdeaDTO>{
    return this.http.post<GiftIdeaDTO>(this.urlAPI + '/GiftIdeas/PostGift', gift).
    pipe(tap(console.log));
  }


  getGift(id: string): Observable<GiftIdeaDTO> {
    return this.http.get<GiftIdeaDTO>(this.urlAPI + '/GiftIdeas/Get/' + id).
      pipe(tap(console.log));
  }

  // CategoryController
  getAllCategories(): Observable<CategoryDTO[]> {
    return this.http.get<CategoryDTO[]>(this.urlAPI + '/Category/GetAll').
    pipe(tap(console.log));
  }

  // StatusController
  checkServerStatus(): Observable<any> {
    return this.http.get<any>(this.urlAPI + '/Status/Online', { observe: 'response' }).
      pipe(tap(console.log));
  }

  // RankingController
  ChangeGiftIdeaRanking(id: string, increase: boolean): Observable<any> {
    return this.http.patch<GiftIdeaDTO>(this.urlAPI + '/Ranking/ChangeGiftIdeaRanking/' + id + '/' + increase, null).
      pipe(tap(console.log));
  }

  // CommentController
  CreateComment(comment: CommentDTO): Observable<CommentDTO> {
    return this.http.post<CommentDTO>(this.urlAPI + '/Comment/Create', comment).
      pipe(tap(console.log));
  }

  GetComment(id: string, pageIndex: string): Observable<PagedListDTO<CommentDTO>> {
    let params = new HttpParams();
    params = params.append('pageNumber', (pageIndex as unknown as number + 1).toString());
    return this.http.get<PagedListDTO<CommentDTO>>(this.urlAPI + '/Comment/Get/' + id, { params }).
      pipe(tap(console.log));
  }

}
