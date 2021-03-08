import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from '../interface/Product';
import { CommonService } from '../Services/common.service';
import { ServerHttpService } from '../Services/server-http.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  productForm = new FormGroup({
    name: new FormControl(''),
    code: new FormControl(''),
    price: new FormControl(''),
    quantity: new FormControl(''),
    category: new FormControl(''),
  });

  constructor(
    private common: CommonService,
    private serverHttp: ServerHttpService,
    private router: Router
  ) { }

  ngOnInit(): void {
  }

  public onSubmit() {
    console.log('onSubmit');
    const newProduct = Object.assign({}, this.productForm.value);
    for (const controlName in this.productForm.controls) {
      if (controlName) {
        newProduct[controlName] = this.productForm.controls[controlName].value;
      }
    }
    console.log(newProduct);
    this.serverHttp.addProducts(newProduct).subscribe(data => {
      console.log(data);
    })
  }

}
