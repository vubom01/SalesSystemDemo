import { Component, ViewChild, OnInit } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from '../interface/Product';
import { CommonService } from '../Services/common.service';
import { ServerHttpService } from '../Services/server-http.service';

@Component({
  selector: 'products.component',
  styleUrls: ['products.component.css'],
  templateUrl: 'products.component.html',
})
export class ProductsComponent implements OnInit {

  displayedColumns: string[] = ['name', 'code', 'price', 'quanlity'];
  public products: Product[] = [];
  public dataSource: any = null;

  @ViewChild(MatSort) sort: MatSort | any;

  constructor(
    private common: CommonService,
    private serverHttp: ServerHttpService
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
}