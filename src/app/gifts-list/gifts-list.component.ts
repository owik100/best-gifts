import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, of, Subscriber, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { GiftIdea } from '../models/giftIdea';
import { HttpGiftsService } from '../services/http-gifts.service';
import { ImageHelperService } from '../services/image-helper.service';

@Component({
  selector: 'app-gifts-list',
  templateUrl: './gifts-list.component.html',
  styleUrls: ['./gifts-list.component.scss']
})
export class GiftsListComponent implements OnInit, OnDestroy {
  giftIdeas: Observable<GiftIdea[]>;

  public errorObject = null;
  constructor(private http: HttpGiftsService) { }

  ngOnInit(): void {
    this.giftIdeas = this.http.getAllGifts()
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

}
