import { Component, OnInit } from '@angular/core';
import { CommonService } from '../Services/common.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  public age = 20;
  
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
