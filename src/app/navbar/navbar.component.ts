import { Component, OnInit } from '@angular/core';
import { faGifts } from '@fortawesome/free-solid-svg-icons';
import { interval, Observable } from 'rxjs';
import { HttpGiftsService } from '../services/http-gifts.service';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {
  faGifts = faGifts;
  statusAPI: boolean;

  private source = interval(5000);

  constructor(private http: HttpGiftsService) { }

  ngOnInit(): void {
    this.checkServerStatus(),

      setInterval(() => {
        this.checkServerStatus();
      }, 5000);

  }

  checkServerStatus(): void {
    this.http.checkServerStatus().subscribe(
      data => this.statusAPI = data.ok,
      err => this.statusAPI = false,
    );
  }

}
