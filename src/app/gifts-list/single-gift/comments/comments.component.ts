import { Component, Input, OnInit } from '@angular/core';
import { CommentDTO } from 'src/app/models/CommentDTO';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {
@Input() comments: CommentDTO;
  constructor() { }

  ngOnInit(): void {

  }

}
