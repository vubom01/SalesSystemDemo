import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from '../_services/backend.service';

@Component({
  selector: 'app-order-form',
  templateUrl: './order-form.component.html',
  styleUrls: ['./order-form.component.css']
})
export class OrderFormComponent implements OnInit {

  public id = 0;
  orderForm = new FormGroup({
    date: new FormControl(''),
    name: new FormControl(''),
    code: new FormControl(''),
    quantity: new FormControl(''),
    price: new FormControl(''),
  });

  constructor(
    private serverHttp: BackendService,
    private router: Router,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));
    if (this.id > 0) {
      this.LoadData(this.id);
    }
  }

  private LoadData(id: any) {
    this.serverHttp.getOrder(id).subscribe((data) => {
      for (const controlName in this.orderForm.controls) {
        if (controlName) {
          this.orderForm.controls[controlName].setValue(data[controlName]);
        }
      }
    });
  }

  public createNewData() {
    const newOrder = Object.assign({}, this.orderForm.value);
    for (const controlName in this.orderForm.controls) {
      if (controlName) {
        newOrder[controlName] = this.orderForm.controls[controlName].value;
      }
    }
    return newOrder;
  }

  public saveAndGotoList() {
    if (this.id > 0) {
      this.serverHttp.modifyOrder(this.id, this.createNewData())
        .subscribe((data) => {
          this.router.navigate(['orders']);
        });
    } else {
      this.serverHttp.addOrder(this.createNewData()).subscribe((data) => {
        this.router.navigate(['orders']);
      });
    }
  }

  public save() {
    if (this.id > 0) {
      this.serverHttp
        .modifyOrder(this.id, this.createNewData())
        .subscribe((data) => {
        });
    } else {
      this.serverHttp.addOrder(this.createNewData()).subscribe((data) => {
        this.orderForm.reset();
      });
    }
  }

}
