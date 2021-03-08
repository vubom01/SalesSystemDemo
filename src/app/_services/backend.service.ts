import { Injectable } from '@angular/core';
import {
  HttpHeaders,
  HttpClient,
  HttpErrorResponse,
} from '@angular/common/http';
import { throwError } from 'rxjs/internal/observable/throwError';
import { Observable } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Product } from '../interface/Product';
import { Order } from '../interface/Order';


@Injectable({
  providedIn: 'root'
})

export class BackendService {

  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  private REST_API_SERVER = 'http://localhost:3000';

  constructor(private httpClient: HttpClient) { }

  public getProducts() {
    const url = `${this.REST_API_SERVER}/products`;
    return this.httpClient
      .get<any>(url, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  public getOrders() {
    const url = `${this.REST_API_SERVER}/orders`;
    return this.httpClient
      .get<any>(url, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  public addProduct(data: Product) {
    const url = `${this.REST_API_SERVER}/products`;
    return this.httpClient
      .post<any>(url, data, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  public addOrder(data: Order) {
    const url = `${this.REST_API_SERVER}/orders`;
    return this.httpClient
      .post<any>(url, data, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  public deleteProducts(productId: number) {
    const url = `${this.REST_API_SERVER}/products/` + productId;
    return this.httpClient
      .delete<any>(url)
      .pipe(catchError(this.handleError));
  }

  public deleteOrders(orderId: number) {
    const url = `${this.REST_API_SERVER}/orders/` + orderId;
    return this.httpClient
      .delete<any>(url)
      .pipe(catchError(this.handleError));
  }

  public modifyProduct(productId: number, data: Product) {
    const url = `${this.REST_API_SERVER}/products/` + productId;
    return this.httpClient
      .put<any>(url, data, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  public modifyOrder(orderId: number, data: Order) {
    const url = `${this.REST_API_SERVER}/orders/` + orderId;
    return this.httpClient
      .put<any>(url, data, this.httpOptions)
      .pipe(catchError(this.handleError));
  }


  public getProduct(productId: number) {
    const url = `${this.REST_API_SERVER}/products/` + productId;
    return this.httpClient
      .get<any>(url, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  public getOrder(orderId: number) {
    const url = `${this.REST_API_SERVER}/orders/` + orderId;
    return this.httpClient
      .get<any>(url, this.httpOptions)
      .pipe(catchError(this.handleError));
  }

  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong.
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Return an observable with a user-facing error message.
    return throwError(
      'Something bad happened; please try again later.');
  }
}
