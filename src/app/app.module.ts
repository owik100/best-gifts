import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
// Angular material
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatTooltipModule} from '@angular/material/tooltip';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatChipsModule} from '@angular/material/chips';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import { LayoutModule } from '@angular/cdk/layout';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule } from '@angular/material/input';

// Others
import { ShareButtonModule } from 'ngx-sharebuttons/button';
import { ShareIconsModule } from 'ngx-sharebuttons/icons';
import { CookieService } from 'ngx-cookie-service';

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
import { ShareComponent } from './gifts-list/single-gift/share/share.component';

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
    CommentsComponent,
    ShareComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    MatInputModule,
    AppRoutingModule,
    FontAwesomeModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatTooltipModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatDividerModule,
    HttpClientModule,
    MatListModule,
    LayoutModule,
    ShareButtonModule,
    ShareIconsModule,
    MatFormFieldModule
  ],
  providers: [CookieService],
  bootstrap: [AppComponent]
})
export class AppModule { }
