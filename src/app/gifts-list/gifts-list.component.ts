import { HttpParams } from '@angular/common/http';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import { Observable, of, Subscriber, Subscription, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { CategoryDTO } from '../models/CategoryDTO';
import { FilterModel } from '../models/FilterModel';
import { GiftIdeaDTO } from '../models/GiftIdeaDTO';
import { PagedListDTO } from '../models/PagedListDTO';
import { SortingModel } from '../models/SortingModel';
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

  selectedSorting = SortingModel[SortingModel.Latest];
  allowedSort = ['0', '1', '2', '3'];
  filterModel: FilterModel = {} as FilterModel;
  allCategoriesObj: CategoryDTO[] = {} as CategoryDTO[];
  allCategoriesObservable: Observable<CategoryDTO[]>;
  allCategoriesSubscribtion: Subscription;

  pageNumber: number;
  pageSize: number;


  // tslint:disable-next-line:max-line-length
  constructor(private http: HttpGiftsService, private cookieService: CookieService, private route: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {

    this.route.queryParamMap.subscribe( paramMap => {

      this.pageNumber = paramMap.get('pageNumber') as unknown as number > 0 ? paramMap.get('pageNumber') as unknown as number : 1;
      this.pageSize = paramMap.get('pageSize') as unknown as number > 0 ? paramMap.get('pageSize') as unknown as number : 5;
      // tslint:disable-next-line:max-line-length
      this.selectedSorting = paramMap.get('sort')?.length > 0 && this.allowedSort.includes(paramMap.get('sort')) ? SortingModel[paramMap.get('sort')] : '0';
      this.filterModel.author = paramMap.get('author')?.length > 0 ? paramMap.get('author') : '';
      this.filterModel.giftName = paramMap.get('giftName')?.length > 0 ? paramMap.get('giftName') : '';
      this.filterModel.categoryID = paramMap.get('categoryID')?.length > 0 ? paramMap.get('categoryID') as unknown as number : -1;
  });

    this.giftIdeas = this.http.getAllGifts(this.pageNumber, this.pageSize, SortingModel[this.selectedSorting], this.filterModel)
      .pipe(
       catchError(err => {
          this.errorObject = err;
          return throwError(err);
        })
      );

    this.CheckCategoriesInCookie();
  }

  ngOnDestroy(): void {
    this?.allCategoriesSubscribtion?.unsubscribe();
  }



  CheckCategoriesInCookie(): void{
    const categoriesExists: boolean = this.cookieService.check('categories');
    if (categoriesExists){
      const catsJSON = this.cookieService.get('categories');
      this.allCategoriesObj = JSON.parse(catsJSON);
    }
    else{
      this.allCategoriesObservable = this.http.getAllCategories();

      this.allCategoriesSubscribtion = this.allCategoriesObservable.
        subscribe(
            data => {
              this.allCategoriesObj = data;
              const categoriesJson = JSON.stringify(this.allCategoriesObj );
              this.cookieService.set(`categories`, categoriesJson,  new Date(new Date().getTime() +  1000 * 60 * 60) , '/');
            },
            err => {
              (console.log('ERROR', err));
        });
    }
  }

  public getGifts(event?: PageEvent): void{
    this.pageNumber = event.pageIndex + 1;
    this.pageSize = event.pageSize;
    
    let queryParamsa = new HttpParams();
    queryParamsa = queryParamsa.append('pageNumber', (this.pageNumber).toString());
    // Dodac jezeli inne od defoltowych
        // tslint:disable-next-line:max-line-length
    this.router.navigate(['/gifts'], { queryParams: { pageNumber: this.pageNumber,  pageSize: this.pageSize, sort: SortingModel[this.selectedSorting], author: this.filterModel.author, giftName: this.filterModel.giftName, categoryID: this.filterModel.categoryID } });
    this.giftIdeas = this.http.getAllGifts(this.pageNumber, this.pageSize, SortingModel[this.selectedSorting], this.filterModel)
    .pipe(
     catchError(err => {
        this.errorObject = err;
        return throwError(err);
      })
    );
  }

  onSelectionChange(): void{
  this.search();
  }

  onCategoryChange(event): void {
    this.filterModel.categoryID = event.value;
  }

  search(): void{
        // Dodac jezeli inne od defoltowych
                // tslint:disable-next-line:max-line-length
    this.router.navigate(['/gifts'], { queryParams: { pageNumber: this.pageNumber,  pageSize: this.pageSize, sort: SortingModel[this.selectedSorting], author: this.filterModel.author, giftName: this.filterModel.giftName, categoryID: this.filterModel.categoryID  } });
    this.giftIdeas = this.http.getAllGifts(this.pageNumber, this.pageSize, SortingModel[this.selectedSorting], this.filterModel)
    .pipe(
     catchError(err => {
        this.errorObject = err;
        return throwError(err);
      })
    );


  }

}
