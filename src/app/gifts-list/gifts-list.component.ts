import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscriber } from 'rxjs';
import { GiftIdea } from '../models/giftIdea';
import { HttpGiftsService } from '../services/http-gifts.service';

@Component({
  selector: 'app-gifts-list',
  templateUrl: './gifts-list.component.html',
  styleUrls: ['./gifts-list.component.scss']
})
export class GiftsListComponent implements OnInit, OnDestroy {
  giftIdeas: Observable<GiftIdea[]>;
  loading = false;
  constructor(private http: HttpGiftsService) { }

  ngOnInit(): void {
    this.loading = true;
    this.giftIdeas = this.http.getAllGifts();
    // const res = this.giftIdeas.subscribe(
    //   data => {},
    //   err => console.log('ERROR', err),
    //   () => console.log('KONIEC'));
    }

    ngOnDestroy(): void{
      console.log('GiftsListComponent destory');
    }

}
