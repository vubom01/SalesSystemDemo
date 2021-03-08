import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { Order } from '../interface/Order';
import { BackendService } from '../_services/backend.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  displayedColumns: string[] = ['date', 'name', 'code', 'quantity', 'unit_price', 'total', 'id'];
  public orders: Order[] = [];
  public dataSource: any = null;

  @ViewChild(MatSort) sort: MatSort | any;

  constructor(
    private serverHttp: BackendService,
    private router: Router
  ) {
  }

  ngOnInit(): void {
      this.serverHttp.getOrders().subscribe((data) => {
      this.orders = data;
      this.dataSource = new MatTableDataSource(this.orders);
      this.dataSource.sort = this.sort;
    })
  }

  private LoadData() {
    this.serverHttp.getOrders().subscribe(data => {
      this.orders = data;
      this.dataSource = new MatTableDataSource(this.orders);
      this.dataSource.sort = this.sort;
    })
  } 

  public AddOrder() {
    this.router.navigate(['order-form', 0]);
  }

  public DeleteOrder(orderId: number) {
    this.serverHttp.deleteOrders(orderId).subscribe((data) => {
      this.LoadData();
    })
  }

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim();
    filterValue = filterValue.toLowerCase();
    this.dataSource.filter = filterValue;
  }

}
