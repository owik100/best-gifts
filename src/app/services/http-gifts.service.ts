import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { CommentDTO } from '../models/CommentDTO';
import { GiftIdeaDTO } from '../models/GiftIdeaDTO';
import { ImageHelperService } from './image-helper.service';

@Injectable({
  providedIn: 'root'
})
export class HttpGiftsService {

private urlAPI = 'https://localhost:44302/api';

  constructor(private http: HttpClient, private imageHelper: ImageHelperService) {

   }

   // GiftIdeasController
   getAllGifts(): Observable<GiftIdeaDTO[]>{
    return this.http.get<GiftIdeaDTO[]>(this.urlAPI + '/GiftIdeas/GetAll').
    pipe(
      map(x => x.map((y) => { y.imageContentB64 = this.imageHelper.prepareBase64imagePrefix(y.imageContentB64); return y; })),
      tap(console.log)
      );
   }

   getGift(id: string): Observable<GiftIdeaDTO>{
    return this.http.get<GiftIdeaDTO>(this.urlAPI + '/GiftIdeas/Get/' + id).
    pipe(tap(console.log));
   }


   // StatusController
   checkServerStatus(): Observable<any>{
    return this.http.get<any>(this.urlAPI + '/Status/Online', {observe: 'response'}).
    pipe(tap(console.log));
   }

   // RankingController
   ChangeGiftIdeaRanking(id: string, increase: boolean): Observable<any>{
    return this.http.patch<GiftIdeaDTO>(this.urlAPI + '/Ranking/ChangeGiftIdeaRanking/' + id + '/' + increase, null).
    pipe(tap(console.log));
   }

   // CommentController
   CreateComment(comment: CommentDTO): Observable<CommentDTO> {
    return this.http.post<CommentDTO>(this.urlAPI + '/Comment/Create' , comment).
    pipe(tap(console.log));
   }

}
