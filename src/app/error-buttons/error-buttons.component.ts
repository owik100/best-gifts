import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { faHome, faSync, faArrowCircleLeft } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-error-buttons',
  templateUrl: './error-buttons.component.html',
  styleUrls: ['./error-buttons.component.scss']
})
export class ErrorButtonsComponent implements OnInit {
  @Input() allowRefresh = true;
  faHome = faHome;
  faSync = faSync;
  faArrowCircleLeft = faArrowCircleLeft;
  constructor(private router: Router, private location: Location) { }

  ngOnInit(): void {
  }

  reloadComponent(): void {
    const currentUrl = this.router.url;
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate([currentUrl]);
    });

  }

  backToLastPage(): void {
    this.location.back();
  }
}
