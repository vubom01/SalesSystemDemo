import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  public name = '';
  public password = '';

  constructor() { }

  ngOnInit(): void {
  }

  public onSubmit() {
    console.log(this.name);
    console.log(this.password);
  }
}
