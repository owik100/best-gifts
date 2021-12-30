import { Component, OnInit } from '@angular/core';
import { faExclamationCircle} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-another-error',
  templateUrl: './another-error.component.html',
  styleUrls: ['./another-error.component.scss']
})
export class AnotherErrorComponent implements OnInit {
  faExclamationCircle = faExclamationCircle;
  constructor() { }

  ngOnInit(): void {
  }

}

