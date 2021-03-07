import { Component, OnInit } from '@angular/core';
import { CommonService } from '../Services/common.service';
import { ServerHttpService } from '../Services/server-http.service';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  public age = 20;
  
  constructor(
    private common: CommonService,
    private serverHttp: ServerHttpService
    ) { 
    this.age = common.age;
  }

  ngOnInit(): void {
    this.serverHttp.getProfile().subscribe((data) => {
      console.log(data);
    })
  }

  public tangtuoi() {
    this.common.age++;
    this.age = this.common.age;
  }

}
