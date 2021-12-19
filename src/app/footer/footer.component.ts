import { Component, OnInit } from '@angular/core';
import { faGithub } from '@fortawesome/free-brands-svg-icons';
import { version } from '../../package.json';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {
  faGithub = faGithub;

  appVersion = '0.0';
  currYear = new Date().getFullYear();

  constructor() {
   }

  ngOnInit(): void {
  }

}
