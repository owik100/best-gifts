import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, OnDestroy, OnInit, QueryList, ViewChild, ViewChildren } from '@angular/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable, Subscription } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { GiftIdeaDTO } from 'src/app/models/GiftIdeaDTO';
import { HttpGiftsService } from 'src/app/services/http-gifts.service';
import { ImageHelperService } from 'src/app/services/image-helper.service';
import { RankingComponent } from './ranking/ranking.component';

@Component({
  selector: 'app-single-gift',
  templateUrl: './single-gift.component.html',
  styleUrls: ['./single-gift.component.scss']
})
export class SingleGiftComponent implements OnInit, OnDestroy, AfterViewInit {
  singleGiftObservable: Observable<GiftIdeaDTO>;
  singleGiftSubscription: Subscription;
  singleGift: GiftIdeaDTO = null;

  idFromRoute: string;
  isLoading = false;
  is404Error = false;
  isAnotherError = false;

  @ViewChildren(RankingComponent) childRankingQueryList: QueryList<RankingComponent>;
  private childRanking: RankingComponent;

  // tslint:disable-next-line:max-line-length
  constructor(private http: HttpGiftsService, private route: ActivatedRoute, private router: Router, private imageHelper: ImageHelperService, private cookieService: CookieService)
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
          this.singleGift.imageContentB64 = this.imageHelper.prepareBase64imagePrefix(data.imageContentB64);
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

  CheckCookieVote(): void{
    const cookieExists: boolean = this.cookieService.check(`Vote${this.idFromRoute}`);
    if (cookieExists){
      const value: string = this.cookieService.get(`Vote${this.idFromRoute}`);
      if (value === 'true'){
        this.childRanking.clickedLike = true;
      }
      else if (value === 'false'){
        this.childRanking.clickedDislike = true;
      }

    }
  }

  ChangeGiftIdeaRanking(VoteIncrease: boolean): void{
    this.http.ChangeGiftIdeaRanking(this.idFromRoute, VoteIncrease).subscribe(
      data => {
        this.childRanking.RefreshCouner(VoteIncrease);
        const cookieExists: boolean = this.cookieService.check(`Vote${this.idFromRoute}`);
        if (cookieExists){
          this.cookieService.delete(`Vote${this.idFromRoute}`, '/');
        }

        this.cookieService.set(`Vote${this.idFromRoute}`, `${VoteIncrease}`, {path: '/'} );

      },
      err => {
        (console.log('ERROR', err));
      }
    );
  }

  onRefreshComments(pageIndex: string): void{
    this.http.GetComment(this.idFromRoute, pageIndex).subscribe(
      data => {
        this.singleGift.commentsDTO = data;
      },
      err => {
        (console.log('ERROR', err));
      }
    );
  }

  ngAfterViewInit(): void{
    this.childRankingQueryList.changes.subscribe((result: QueryList <RankingComponent>) =>
    {
        this.childRanking = result.first;
        setTimeout(() => {
          this.CheckCookieVote();
        }, 0);
    });

  }

  ngOnDestroy(): void {
    this.singleGiftSubscription.unsubscribe();
  }

}
