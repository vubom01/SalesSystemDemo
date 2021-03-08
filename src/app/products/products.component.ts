import { Component, ViewChild, OnInit } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Product } from '../interface/Product';
import { CommonService } from '../Services/common.service';
import { ServerHttpService } from '../Services/server-http.service';

@Component({
  selector: 'products.component',
  styleUrls: ['products.component.css'],
  templateUrl: 'products.component.html',
})
export class ProductsComponent implements OnInit {

  displayedColumns: string[] = ['name', 'code', 'price', 'quantity', 'category', 'id'];
  public products: Product[] = [];
  public dataSource: any = null;

  @ViewChild(MatSort) sort: MatSort | any;

  constructor(
    private common: CommonService,
    private serverHttp: ServerHttpService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
      this.serverHttp.getProducts().subscribe((data) => {
      console.log('products', data);
      this.products = data;
      this.dataSource = new MatTableDataSource(this.products);
      this.dataSource.sort = this.sort;
    })
  }

  private LoadData() {
    this.serverHttp.getProducts().subscribe(data => {
      console.log('products', data);
      this.products = data;
      this.dataSource = new MatTableDataSource(this.products);
      this.dataSource.sort = this.sort;
    })
  } 

  public AddProduct() {
    this.router.navigate(['product-form', 0]);
  }

  public DeleteProduct(productId: number) {
    console.log('product: ' + productId);
    this.serverHttp.deleteProducts(productId).subscribe((data) => {
      console.log('delete', data);
      this.LoadData();
    })
  }

  public EditProduct(productId: number) {
    this.router.navigate(['product-form', productId]);

  }
}