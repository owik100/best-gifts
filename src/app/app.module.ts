import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
// Angular material
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatCardModule} from '@angular/material/card';
import {MatChipsModule} from '@angular/material/chips';
import {MatDividerModule} from '@angular/material/divider';
import {MatBadgeModule} from '@angular/material/badge';
import {MatListModule} from '@angular/material/list';
import { LayoutModule } from '@angular/cdk/layout';
// Own components
import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { FooterComponent } from './footer/footer.component';
import { GiftsListComponent } from './gifts-list/gifts-list.component';
import { NavbarComponent } from './navbar/navbar.component';
import { StatusServerComponent } from './navbar/status-server/status-server.component';
import { SingleGiftComponent } from './gifts-list/single-gift/single-gift.component';
import { AnotherErrorComponent } from './another-error/another-error.component';
import { ErrorButtonsComponent } from './error-buttons/error-buttons.component';
import { RankingComponent } from './gifts-list/single-gift/ranking/ranking.component';
import { CommentsComponent } from './gifts-list/single-gift/comments/comments.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    PageNotFoundComponent,
    FooterComponent,
    GiftsListComponent,
    StatusServerComponent,
    SingleGiftComponent,
    AnotherErrorComponent,
    ErrorButtonsComponent,
    RankingComponent,
    CommentsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatCardModule,
    MatChipsModule,
    MatDividerModule,
    MatBadgeModule,
    HttpClientModule,
    MatListModule,
    LayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
