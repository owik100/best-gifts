import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-status-server',
  templateUrl: './status-server.component.html',
  styleUrls: ['./status-server.component.scss']
})
export class StatusServerComponent implements OnInit {
@Input() statusAPI: boolean;

  constructor() { }

  ngOnInit(): void {
  }

}
