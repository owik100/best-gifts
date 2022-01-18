import {Component, Injectable, NgModule} from '@angular/core';
import {MatPaginatorIntl, MatPaginatorModule} from '@angular/material/paginator';
import {Subject} from 'rxjs';

@Injectable()
export class PLPaginatorIntl implements MatPaginatorIntl {
  changes = new Subject<void>();

  // For internationalization, the `$localize` function from
  // the `@angular/localize` package can be used.
  firstPageLabel = $localize`Pierwsza strona`;
  itemsPerPageLabel = $localize`Komentarzy na stronę:`;
  lastPageLabel = $localize`Ostatnia strona`;

  // You can set labels to an arbitrary string too, or dynamically compute
  // it through other third-party internationalization libraries.
  nextPageLabel = 'Następna strona';
  previousPageLabel = 'Poprzednia strona';


  getRangeLabel(page: number, pageSize: number, length: number): string {
    if (length === 0) {
      return $localize`Strona 1 z 1`;
    }
    const amountPages = Math.ceil(length / pageSize);
    return $localize`Strona ${page + 1} z ${amountPages}`;
  }
}
