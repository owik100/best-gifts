import { AfterViewChecked, AfterViewInit, Component, Input, OnInit, Output } from '@angular/core';
import { CommentDTO } from 'src/app/models/CommentDTO';
import { NgForm } from '@angular/forms';
import { HttpGiftsService } from 'src/app/services/http-gifts.service';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';
import { config } from 'process';
import { EventEmitter } from '@angular/core';
import { PagedListDTO } from 'src/app/models/PagedListDTO';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
@Input() comments: PagedListDTO<CommentDTO>;
@Input() giftIdeaId: number;

pageEvent: PageEvent;

@Output() refreshCommments = new EventEmitter<number>();

commentToPost: Partial<CommentDTO> = {};
  isCollapsed = false;
  constructor(private http: HttpGiftsService, private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.commentToPost = {giftIdeaId : this.giftIdeaId} as Partial<CommentDTO>;

  }

  public getComments(event?: PageEvent): void{
    this.refreshCommments.emit(event.pageIndex);
  }

  sendComment(): void{
    this.http.CreateComment(this.commentToPost as CommentDTO).subscribe(
      data => {
        const matConfig = new MatSnackBarConfig();
        matConfig.duration = 3000;
        matConfig.verticalPosition = 'top';
        matConfig.panelClass = ['ok-snackbar'];
        this.snackBar.open('Komentarz dodany!', '', matConfig);

        this.refreshCommments.emit(0);
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
