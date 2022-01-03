import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { GiftIdeaDTO } from '../models/GiftIdeaDTO';
import { ImageHelperService } from './image-helper.service';

@Injectable({
  providedIn: 'root'
})
export class HttpGiftsService {

private urlAPI = 'https://localhost:44302/api';

  constructor(private http: HttpClient, private imageHelper: ImageHelperService) {

   }

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

   checkServerStatus(): Observable<any>{
    return this.http.get<any>(this.urlAPI + '/GiftIdeas/Online', {observe: 'response'}).
    pipe(tap(console.log));
   }
}
