import { Component, OnInit } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { GiftIdeaDTO } from '../models/GiftIdeaDTO';
import { HttpGiftsService } from '../services/http-gifts.service';

@Component({
  selector: 'app-post-gift',
  templateUrl: './post-gift.component.html',
  styleUrls: ['./post-gift.component.scss']
})
export class PostGiftComponent implements OnInit {

  giftToPost: Partial<GiftIdeaDTO> = {};

  constructor(private http: HttpGiftsService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
  }

  postGift(): void{
    this.http.postGift(this.giftToPost as GiftIdeaDTO).subscribe(
      data => {
        const matConfig = new MatSnackBarConfig();
        matConfig.duration = 3000;
        matConfig.verticalPosition = 'top';
        matConfig.panelClass = ['ok-snackbar'];
        this.snackBar.open('Pomysł został dodany!', '', matConfig);

        // Redirect to mainPage
      },
      err => {
        (console.log('ERROR', err));
        const matConfig = new MatSnackBarConfig();
        matConfig.duration = 3000;
        matConfig.verticalPosition = 'top';
        matConfig.panelClass = ['err-snackbar'];
        this.snackBar.open('Błąd Komentrz nie został dodany!', '', matConfig);
      },
    );
  }

}
