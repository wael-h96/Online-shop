import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Product } from '../Interfaces/product';



@Injectable({
  providedIn: 'root'
})
export class AdminService {

  public URL: string = "http://localhost:8080/api/admin"

  public newAddedProduct: Subject<Product>;
  public _product: Observable<Product>

  public productToUpdate: Subject<Product>;
  public _productToUpdate: Observable<Product>;

  public ifUpdateSuccesseded: Subject<boolean>;
  public _ifUpdateSuccesseded: Observable<boolean>;

  public productCategoryId: string = ""
  public productId: string = ""

  constructor(public http: HttpClient) {
    this.newAddedProduct = new Subject<Product>();
    this._product = this.newAddedProduct.asObservable();

    this.productToUpdate = new Subject<Product>();
    this._productToUpdate = this.productToUpdate.asObservable();

    this.ifUpdateSuccesseded = new Subject<boolean>();
    this._ifUpdateSuccesseded = this.ifUpdateSuccesseded.asObservable();
  }

  addProductToProductsList(newProduct: Product): Observable<any> {
    return this.http.post(this.URL + "/add-new-product", newProduct);
  }

  updateProduct(updatedProduct: Product): Observable<any> {
    return this.http.post(this.URL + "/update-product", updatedProduct)
  }

  setNewAddedProduct(newProdut: any) {
    this._product = newProdut;
    this.newAddedProduct.next(newProdut)

  }

  setProductToUpdate(product: any) {

    this._productToUpdate = product;
    this.productToUpdate.next(product)

  }

  setIfUpdateSuccesseded(status: any): void {
    this._ifUpdateSuccesseded = status;
    this.ifUpdateSuccesseded.next(status)
  }

}
