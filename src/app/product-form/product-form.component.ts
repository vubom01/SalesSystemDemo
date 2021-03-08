import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from '../interface/Product';
import { BackendService } from '../_services/backend.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  public id = 0;
  productForm = new FormGroup({
    name: new FormControl(''),
    code: new FormControl(''),
    price: new FormControl(''),
    quantity: new FormControl(''),
    category: new FormControl(''),
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
    this.serverHttp.getProduct(id).subscribe((data) => {
      console.log('getProduct', data);
      for (const controlName in this.productForm.controls) {
        if (controlName) {
          this.productForm.controls[controlName].setValue(data[controlName]);
        }
      }
    });
  }

  public createNewData() {
    const newProduct = Object.assign({}, this.productForm.value);
    for (const controlName in this.productForm.controls) {
      if (controlName) {
        newProduct[controlName] = this.productForm.controls[controlName].value;
      }
    }
    return newProduct;
  }

  public saveAndGotoList() {
    if (this.id > 0) {
      this.serverHttp.modifyProduct(this.id, this.createNewData())
        .subscribe((data) => {
          this.router.navigate(['products']);
        });
    } else {
      this.serverHttp.addProduct(this.createNewData()).subscribe((data) => {
        this.router.navigate(['products']);
      });
    }
  }

  public save() {
    if (this.id > 0) {
      this.serverHttp
        .modifyProduct(this.id, this.createNewData())
        .subscribe((data) => {
        });
    } else {
      this.serverHttp.addProduct(this.createNewData()).subscribe((data) => {
        this.productForm.reset();
      });
    }
  }

}
