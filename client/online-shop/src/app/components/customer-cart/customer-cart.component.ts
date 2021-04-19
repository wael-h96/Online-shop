import { ThisReceiver, ThrowStmt } from '@angular/compiler';
import { Component, Input, OnInit, resolveForwardRef, SimpleChange, ɵɵNgOnChangesFeature } from '@angular/core';
import { LogInService } from '../../Services/log-in.service';
import { ProductsService } from '../../Services/shopping.service';
import { ProductInCart } from "../../Interfaces/ProductInCart"
import { empty } from 'rxjs';


@Component({
  selector: 'app-customer-cart',
  templateUrl: './customer-cart.component.html',
  styleUrls: ['./customer-cart.component.css']
})

export class CustomerCartComponent implements OnInit {

  public cart: ProductInCart[] = new Array();
  public customerId: string;
  public totalPrice: number = 0;
  public productName: string = "";
  public ifOrderPage: boolean = false
  public errorMessages: string = ""

  constructor(private logInService: LogInService, private productsService: ProductsService) {
    this.customerId = this.logInService.customerId
    this.productsService._product.subscribe((newProduct: ProductInCart) => {

      this.addProdutToCart(newProduct)
    })
  }

  ngOnInit(): void {

    this.productsService.fetchCartProducts(this.customerId)
      .subscribe((cartProducts: any) => {
        
        if (cartProducts.length === 0)
          this.cart = []
        else {
          if (cartProducts[cartProducts.length - 1].products && cartProducts[cartProducts.length - 1].products.length > 0) {
            this.cart = cartProducts[cartProducts.length - 1].products
            this.totalPrice = cartProducts[cartProducts.length - 1].totalPrice
          } else {
            this.cart = [];
          }
        }
      })


  }

  addProdutToCart(newProduct: ProductInCart) {

    if (this.cart.length > 0) {

      const index = this.cart.findIndex(productInCart => productInCart.productId === newProduct.productId)
      if (index != -1) {
        this.cart[index].quantity += newProduct.quantity
      } else {
        this.cart.push(newProduct)
      }
    } else {
      this.cart.push(newProduct)
    }
    this.totalPrice += newProduct.quantity * newProduct.price


  }

  deleteProductFromCart(i: number) {
    
    this.productsService.deleteProductFromCart(this.cart[i], this.customerId)
      .subscribe((ServerResponse: any) => {
        this.cart = ServerResponse.restProducts;
        this.totalPrice = ServerResponse.totalPrice;
      })
  }

  deleteAllProducts(): void {
    this.productsService.deleteAllProducts(this.customerId)
      .subscribe(emptyArray => {
        console.log(emptyArray)
        this.cart = emptyArray
        this.totalPrice = 0;
      })
  }

  openOrderPage(): void {
    if (this.cart.length > 0) {
      this.productsService.setOpenOrderPage(true)
      this.ifOrderPage = !this.ifOrderPage
    } else {
      this.errorMessages = "You should have at least 1 item in the cart to order"
      setTimeout(() => {
        this.errorMessages = ""
      }, 3000)
    }
  }


  closeOrderPage(): void {
    this.productsService.setOpenOrderPage(false)
    this.ifOrderPage = !this.ifOrderPage
  }


}

