import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { faGifts, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FilterModel } from '../models/FilterModel';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  faGifts = faGifts;
  faPlus = faPlus;

  filterModel: FilterModel = {} as FilterModel;

  constructor(private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {
  }

  searchGift(): void{
    const queryParamsObj = {};
    queryParamsObj['giftName'] = this.filterModel.giftName;

    this.router.navigate(['/gifts'],
    { queryParams: queryParamsObj}
    );
      }
  }
