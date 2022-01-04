import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { GiftIdeaDTO } from 'src/app/models/GiftIdeaDTO';
import { HttpGiftsService } from 'src/app/services/http-gifts.service';
import { ImageHelperService } from 'src/app/services/image-helper.service';

import { faThumbsUp, faThumbsDown } from '@fortawesome/free-regular-svg-icons';


@Component({
  selector: 'app-single-gift',
  templateUrl: './single-gift.component.html',
  styleUrls: ['./single-gift.component.scss']
})
export class SingleGiftComponent implements OnInit, OnDestroy {
  singleGiftObservable: Observable<GiftIdeaDTO>;
  singleGiftSubscription: Subscription;
  singleGift: GiftIdeaDTO = null;

  idFromRoute: string;
  isLoading = false;
  is404Error = false;
  isAnotherError = false;

  faThumbsUp = faThumbsUp;
  faThumbsDown = faThumbsDown;

  // tslint:disable-next-line:max-line-length
  constructor(private http: HttpGiftsService, private route: ActivatedRoute, private router: Router, private imageHelper: ImageHelperService)
  { }

  ngOnInit(): void {
    this.route.paramMap.subscribe( paramMap => {
      this.idFromRoute = paramMap.get('id');
  });

    this.singleGiftObservable = this.http.getGift(this.idFromRoute);
    this.isLoading = true;

    this.singleGiftSubscription = this.singleGiftObservable.
    subscribe(
        data => {
          this.singleGift = data;
          this.singleGift.imageContentB64 =  this.imageHelper.prepareBase64imagePrefix(data.imageContentB64);
          this.isLoading = false;
        },
        err => {
          (console.log('ERROR', err));
          this.isLoading = false;
          if (err instanceof HttpErrorResponse) {
            if (err.status === 404){
              this.is404Error = true;
            }
            else {
              this.isAnotherError = true;
            }
          }
        },
        () => console.log('KONIEC', this.singleGift, this.singleGiftSubscription));
  }

  ngOnDestroy(): void {
    this.singleGiftSubscription .unsubscribe();
  }


}
