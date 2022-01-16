import { Component, Input, OnInit, Output } from '@angular/core';
import { CommentDTO } from 'src/app/models/CommentDTO';
import { NgForm } from '@angular/forms';
import { HttpGiftsService } from 'src/app/services/http-gifts.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { config } from 'process';
import { EventEmitter } from '@angular/core';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
@Input() comments: CommentDTO[];
@Input() giftIdeaId: number;

@Output() refreshCommments = new EventEmitter<void>();

commentToPost: Partial<CommentDTO> = {};
  isCollapsed = false;
  constructor(private http: HttpGiftsService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.commentToPost = {giftIdeaId : this.giftIdeaId} as Partial<CommentDTO>;

  }

  sendComment(): void{
    this.http.CreateComment(this.commentToPost as CommentDTO).subscribe(
      data => {
        const matConfig = new MatSnackBarConfig();
        matConfig.duration = 3000;
        matConfig.verticalPosition = 'top';
        matConfig.panelClass = ['ok-snackbar'];
        this.snackBar.open('Komentarz dodany!', '', matConfig);

        this.refreshCommments.emit();
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
    this.commentToPost = {giftIdeaId : this.giftIdeaId} as Partial<CommentDTO>;
  }

}
function ShowSuccesSnackBar(): void {
  const matConfig = new MatSnackBarConfig();
  matConfig.duration = 3000;
  matConfig.verticalPosition = 'top';
  matConfig.panelClass = ['ok-snackbar'];
  this.snackBar.open('Komentarz dodany!', '', matConfig);
}

function ShowErrorSnackBar(): void {
  const matConfig = new MatSnackBarConfig();
  matConfig.duration = 3000;
  matConfig.verticalPosition = 'top';
  matConfig.panelClass = ['err-snackbar'];
  this.snackBar.open('Błąd Komentrz nie został dodany!', '', matConfig);
}

