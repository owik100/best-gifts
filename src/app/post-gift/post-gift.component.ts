import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { GiftIdeaDTO } from '../models/GiftIdeaDTO';
import { HttpGiftsService } from '../services/http-gifts.service';
import { faFileUpload, faTrashAlt, faBan  } from '@fortawesome/free-solid-svg-icons';
import { faCircle } from '@fortawesome/free-regular-svg-icons';
import { Router } from '@angular/router';
import {MatChipInputEvent} from '@angular/material/chips';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import { FormControl } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import {MatAutocompleteSelectedEvent} from '@angular/material/autocomplete';
import { map, startWith } from 'rxjs/operators';
import { CategoryDTO } from '../models/CategoryDTO';

export interface Fruit {
  name: string;
}

@Component({
  selector: 'app-post-gift',
  templateUrl: './post-gift.component.html',
  styleUrls: ['./post-gift.component.scss']
})
export class PostGiftComponent implements OnInit {

  giftToPost: Partial<GiftIdeaDTO> = {};
  faFileUpload = faFileUpload;
  faTrashAlt = faTrashAlt;
  imageSrc = null;
  faBan = faBan;

  separatorKeysCodes: number[] = [ENTER, COMMA];
  fruitCtrl = new FormControl();
  filteredFruits: Observable<string[]>;
  categories: string[] = [];
  isLoading = false;

  allCategoriesObservable: Observable<CategoryDTO[]>;
  allCategoriesSubscribtion: Subscription;
  allCategoriesObj: CategoryDTO[] = null;

  allCategories: string[] = [];

  @ViewChild('fruitInput') fruitInput: ElementRef<HTMLInputElement>;

  // tslint:disable-next-line:max-line-length
  constructor(private http: HttpGiftsService, private snackBar: MatSnackBar, private router: Router)
  {
    this.filteredFruits = this.fruitCtrl.valueChanges.pipe(
    startWith(null),
    map((fruit: string | null) => (fruit ? this._filter(fruit) : this.allCategories.slice())),
  ); }

  ngOnInit(): void {
    this.isLoading = true;
    this.allCategoriesObservable = this.http.getAllCategories();

    this.allCategoriesSubscribtion = this.allCategoriesObservable.
    subscribe(
        data => {
          this.allCategoriesObj = data;
          this.allCategories = this.allCategoriesObj.map(((x) => x.name));
          console.log(this.allCategories);
        },
        err => {
          (console.log('ERROR', err)),
          this.isLoading = true;
    });
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();

    // Add our category
    if (value) {
      this.categories.push(value);
      const index = this.allCategories.indexOf(value);
      if (index !== -1) {
        this.allCategories.splice(index, 1);
      }
    }

    // Clear the input value
    if (event.input) {
      event.input.value = '';
     }

    this.fruitCtrl.setValue(null);
    console.log(this.categories);
  }

  remove(fruit: string): void {
    const index = this.categories.indexOf(fruit);

    if (index >= 0) {
      this.categories.splice(index, 1);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    this.categories.push(event.option.viewValue);
    this.fruitInput.nativeElement.value = '';
    this.fruitCtrl.setValue(null);
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.allCategories.filter(fruit => fruit.toLowerCase().includes(filterValue));
  }

  prepareFile(event): void{
    const reader = new FileReader();
    const file: File = event.target.files[0];
    if (file != null){
      reader.readAsDataURL(file);

      reader.onload = () => {
        this.imageSrc = reader.result as string;
        const b64WithoutPrefix = this.imageSrc.split('base64,')[1];
        this.giftToPost.imageContentB64 = b64WithoutPrefix;
      };

    }
    console.log(file);
  }

  deleteImage(): void{
    this.imageSrc = null;
  }

  postGift(): void{
    const categoriesToAdd: CategoryDTO[] = [];

    for (const cat of this.categories) {
      if (this.allCategoriesObj.filter(x => x.name === cat).length > 0){
          const catInCategory: CategoryDTO = this.allCategoriesObj.filter(x => x.name === cat)[0];
          categoriesToAdd.push(catInCategory);
      }
      else{
       const newCat: Partial<CategoryDTO> = {
         categoryId: -1,
         name: cat,
       };
       categoriesToAdd.push(newCat as CategoryDTO);
      }
    }

    this.giftToPost.categoriesDTO = categoriesToAdd;
    this.http.postGift(this.giftToPost as GiftIdeaDTO).subscribe(
      data => {
        const matConfig = new MatSnackBarConfig();
        matConfig.duration = 3000;
        matConfig.verticalPosition = 'top';
        matConfig.panelClass = ['ok-snackbar'];
        this.snackBar.open('Pomysł został dodany!', '', matConfig);

        this.router.navigate([`gift/${data.giftIdeaId}`]);
      },
      err => {
        (console.log('ERROR', err));
        const matConfig = new MatSnackBarConfig();
        matConfig.duration = 3000;
        matConfig.verticalPosition = 'top';
        matConfig.panelClass = ['err-snackbar'];
        this.snackBar.open('Błąd Pomysł nie został dodany!', '', matConfig);
      },
    );
  }

}
