import { Component, OnInit, OnDestroy } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { Observable, of, Subscriber, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { GiftIdeaDTO } from '../models/GiftIdeaDTO';
import { PagedListDTO } from '../models/PagedListDTO';
import { HttpGiftsService } from '../services/http-gifts.service';
import { ImageHelperService } from '../services/image-helper.service';

@Component({
  selector: 'app-gifts-list',
  templateUrl: './gifts-list.component.html',
  styleUrls: ['./gifts-list.component.scss']
})
export class GiftsListComponent implements OnInit, OnDestroy {
  giftIdeas: Observable<PagedListDTO<GiftIdeaDTO>>;

  public errorObject = null;
  pageEvent: PageEvent;

  constructor(private http: HttpGiftsService) { }

  ngOnInit(): void {
    this.giftIdeas = this.http.getAllGifts( 1, 5)
      .pipe(
       catchError(err => {
          this.errorObject = err;
          return throwError(err);
        })
      );
  }

  ngOnDestroy(): void {
    console.log('GiftsListComponent destory');
  }

  public getGifts(event?: PageEvent): void{
    this.giftIdeas = this.http.getAllGifts(event.pageIndex + 1, event.pageSize)
    .pipe(
     catchError(err => {
        this.errorObject = err;
        return throwError(err);
      })
    );
  }

}
