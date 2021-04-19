import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PanelCService {

  public URL: string = "http://localhost:8080/api"

  constructor(private http: HttpClient) { }

  getNumberOfProducts(): Observable<any> {
    return this.http.get(this.URL + "/product")
  }

  getNumberOfOrders(): Observable<any> {
    return this.http.get(this.URL + "/order")
  }

  getCustomerName(customerId: string): Observable<any> {
    return this.http.get(this.URL + `/user/${customerId}`)
  }

  getCustomerHistory(customerId: string): Observable<any> {
    return this.http.get(this.URL + `/user/cart&orders/${customerId}`)
  }

}
