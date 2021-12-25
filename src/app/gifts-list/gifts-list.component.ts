import { Component, OnInit } from '@angular/core';
import { HttpGiftsService } from '../services/http-gifts.service';

@Component({
  selector: 'app-gifts-list',
  templateUrl: './gifts-list.component.html',
  styleUrls: ['./gifts-list.component.scss']
})
export class GiftsListComponent implements OnInit {

  constructor(private http: HttpGiftsService) { }

  ngOnInit(): void {
    this.http.getAllGifts().subscribe();
  }

}
