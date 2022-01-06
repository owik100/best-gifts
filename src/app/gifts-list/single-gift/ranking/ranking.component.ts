import { Component, Input, OnInit } from '@angular/core';
import { faThumbsUp, faThumbsDown } from '@fortawesome/free-regular-svg-icons';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss']
})
export class RankingComponent implements OnInit {
@Input() likesCounter: number;

faThumbsUp = faThumbsUp;
faThumbsDown = faThumbsDown;


  constructor() { }

  ngOnInit(): void {

  }

}
