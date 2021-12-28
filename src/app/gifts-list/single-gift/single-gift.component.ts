import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { GiftIdea } from 'src/app/models/giftIdea';
import { HttpGiftsService } from 'src/app/services/http-gifts.service';

@Component({
  selector: 'app-single-gift',
  templateUrl: './single-gift.component.html',
  styleUrls: ['./single-gift.component.scss']
})
export class SingleGiftComponent implements OnInit, OnDestroy {
  singleGiftObservable: Observable<GiftIdea>;
  singleGiftSubscription: Subscription;
  singleGift: GiftIdea;

  idFromRoute: string;

  constructor(private http: HttpGiftsService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe( paramMap => {
      this.idFromRoute = paramMap.get('id');
  });

    this.singleGiftObservable = this.http.getGift(this.idFromRoute);

    this.singleGiftSubscription = this.singleGiftObservable.subscribe(
        data => {this.singleGift = data; },
        err => console.log('ERROR', err),
        () => console.log('KONIEC', this.singleGift, this.singleGiftSubscription));
  }

  ngOnDestroy(): void {
    this.singleGiftSubscription .unsubscribe();
  }

}
