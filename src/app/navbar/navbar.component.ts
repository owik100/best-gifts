import { Component, OnInit } from '@angular/core';
import { faGifts, faLeaf } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { HttpGiftsService } from '../services/http-gifts.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  faGifts = faGifts;
  statusAPI: boolean;

  constructor(private http: HttpGiftsService) { }

  ngOnInit(): void {
    setInterval(() => {
      this.http.checkServerStatus().subscribe(
        data => this.statusAPI = data.ok,
        err => this.statusAPI = false,
      );
    }, 3000);
  }

}
