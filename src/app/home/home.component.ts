import { Component, OnInit } from '@angular/core';
import { CommonService } from '../Services/common.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public name = "Vu";
  public age = 15;
  public vehicles = ['toyota', 'honda', 'nissan', 'ford', 'mustang'];

  constructor(private common: CommonService) { 
    this.age = common.age;
  }

  ngOnInit(): void {
  }

  public tangtuoi() {
    this.common.age++;
    this.age = this.common.age;
  }

}
