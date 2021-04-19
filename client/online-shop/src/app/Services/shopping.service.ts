import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { Product } from '../Interfaces/product';
import { ProductInCart } from '../Interfaces/ProductInCart';
import { OrderDetails } from '../Interfaces/OrderDetails'

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  public URL: string = "http://localhost:8080/api"

  public ifOrderDone: boolean = false;

  newAddedProduct: Subject<ProductInCart>;
  _product: Observable<ProductInCart>

  openOrderPage: Subject<boolean>;
  _showOrderPage: Observable<boolean>;

  findSearchedProduct: Subject<string>;
  _findSearchedProduct: Observable<string>;

  constructor(public http: HttpClient) {

    this.newAddedProduct = new Subject<ProductInCart>();
    this._product = this.newAddedProduct.asObservable();

    this.openOrderPage = new Subject<boolean>();
    this._showOrderPage = this.openOrderPage.asObservable();

    this.findSearchedProduct = new Subject<string>();
    this._findSearchedProduct = this.findSearchedProduct.asObservable()

  }

  fetchProducts(categoryId: string): Observable<any> {
    return this.http.get(this.URL + `/product/fetchProducts/${categoryId}`)
  }

  getProduct(productName: string): Observable<any> {
    return this.http.get(this.URL + `/product/get-product/${productName}`)
  }

  addProductToCart(product: Product, customerId: string, quantity: number): Observable<any> {
    return this.http.post(this.URL + "/cart/add-product", { withCredentials: true, product, customerId, quantity })
  }

  deleteProductFromCart(product: ProductInCart, customerId: string): Observable<any> {
    return this.http.post(this.URL + "/cart/delete-product", { product, customerId })
  }

  deleteAllProducts(customerId: string): Observable<any> {
    return this.http.post(this.URL + "/cart/delete-all", customerId);
  }

  fetchCartProducts(customerId: string): Observable<any> {

    return this.http.get(this.URL + `/cart/${customerId}`)
  }

  getCustomerAdress(customerId: string, field: string): Observable<any> {
    return this.http.get(this.URL + `/user/get-adress/${customerId}/${field}`)
  }

  handleOrderPage(order: OrderDetails, customerId: string): Observable<any> {
    return this.http.post(this.URL + "/order/submit-order", { order, customerId });
  }

  downloadReceipt(customerId: string): Observable<any> {
    return this.http.get(this.URL + `/order/download-receipt/${customerId}`)
  }



  setNewProduct(newProdut: any) {

    this._product = newProdut;
    this.newAddedProduct.next(newProdut)

  }

  setOpenOrderPage(status: any) {
    this._showOrderPage = status;
    this.openOrderPage.next(status)
  }

  setFindSearchedProduct(productName: any) {
    this._findSearchedProduct = productName
    this.findSearchedProduct.next(productName)
  }

}
