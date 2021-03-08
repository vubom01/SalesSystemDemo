import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Product } from '../interface/Product';
import { BackendService } from '../_services/backend.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  displayedColumns: string[] = ['date', 'name', 'code', 'quantity', 'unit_price', 'total', 'id'];
  public products: Product[] = [];
  public dataSource: any = null;

  @ViewChild(MatSort) sort: MatSort | any;

  constructor(
    private serverHttp: BackendService,
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

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

}
