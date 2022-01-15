import { Component, Input, OnInit } from '@angular/core';
import { CommentDTO } from 'src/app/models/CommentDTO';
import { NgForm } from '@angular/forms';
import { HttpGiftsService } from 'src/app/services/http-gifts.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
@Input() comments: CommentDTO[];
@Input() giftIdeaId: number;

commentToPost: Partial<CommentDTO> = {};
  isCollapsed = false;
  constructor(private http: HttpGiftsService) { }

  ngOnInit(): void {
    this.commentToPost = {giftIdeaId : this.giftIdeaId} as Partial<CommentDTO>;
  }

  sendComment(): void{
    this.http.CreateComment(this.commentToPost as CommentDTO).subscribe(
      data => {

      },
      err => {
        (console.log('ERROR', err));

      },
    );
    console.log(this.commentToPost);
  }

}
