import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { GiftIdea } from '../models/giftIdea';

@Injectable({
  providedIn: 'root'
})
export class HttpGiftsService {

private urlAPI = 'https://localhost:44302/api';

  constructor(private http: HttpClient) {

   }

   getAllGifts(): Observable<GiftIdea[]>{
    return this.http.get<GiftIdea[]>(this.urlAPI + '/GiftIdeas').
    pipe(tap(console.log));
   }
}
