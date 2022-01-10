import { Component, Input, OnInit, Output } from '@angular/core';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-regular-svg-icons';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss']
})
export class RankingComponent implements OnInit {
@Input() likesCounter: number;

faThumbsUp = faThumbsUp;
faThumbsDown = faThumbsDown;

clickedLike = false;
clickedDislike = false;


@Output() voteEmitt = new EventEmitter<boolean>();

Vote(increase: boolean): void{
  this.voteEmitt.emit(increase);
}

RefreshCouner(increase: boolean): void {
 if (increase){
   this.clickedLike = true;
   this.clickedDislike = false;
   this.likesCounter += 1;
 }
 else{
  this.clickedLike = false;
  this.clickedDislike = true;
  this.likesCounter -= 1;
 }
}

  constructor() { }

  ngOnInit(): void {

  }

}
