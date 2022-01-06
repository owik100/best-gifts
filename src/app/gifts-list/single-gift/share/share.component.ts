import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MobileCheckService } from 'src/app/services/mobile-check.service';

@Component({
  selector: 'app-share',
  templateUrl: './share.component.html',
  styleUrls: ['./share.component.scss']
})
export class ShareComponent implements OnInit {

isMobile: boolean;
currentUrl: string;

  constructor(private mobileCheck: MobileCheckService, private router: Router ) { }

  ngOnInit(): void {
    this.isMobile = this.mobileCheck.IsRunningOnMobile();
    this.currentUrl = this.router.url;
  }

}
