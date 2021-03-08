import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSidenav } from '@angular/material/sidenav';
import { BackendService } from './_services/backend.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  title = 'SalesSystemDemo';
  @ViewChild('sidenav') sidenav: MatSidenav | any;
  public isOpened = false;
  public totalStudents = 0;

  constructor(
    private serverHttp: BackendService
  ) {}
  
  ngOnInit(): void {
  }

  public openLeftSide() {
    this.isOpened = !this.isOpened;
    this.sidenav.toggle();
  }

  public closeLeftSide() {
    this.isOpened = false;
  }
}
