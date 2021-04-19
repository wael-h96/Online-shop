import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { ProductsService } from '../../Services/shopping.service';
import { Product } from '../../Interfaces/product'
import { LogInService } from '../../Services/log-in.service';
import { ProductInCart } from '../../Interfaces/ProductInCart';
import { AdminService } from 'src/app/Services/admin.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  public products: Product[] = []
  public whichProduct: string = ""
  public ifPopUp: boolean = false;
  public quantity: number = 0;
  public productIndex: number = 0;
  public ifProductFound: boolean = false;
  public theFoundProduct: Product | undefined;
  public ifOrderPage: boolean = false;
  public role: string = ""

  @Output() itemAdded: EventEmitter<ProductInCart> = new EventEmitter<ProductInCart>();


  constructor(private productsService: ProductsService, private loginService: LogInService, private adminService: AdminService) {

    this.productsService._findSearchedProduct
      .subscribe((productName: string) => this.findSearchedProduct(productName))

    this.productsService._showOrderPage
      .subscribe((status: boolean) => this.ifOrderPage = status)

    this.adminService._product
      .subscribe((newProduct: Product) => {
        this.whichProduct = newProduct.categoryId
        if (newProduct.categoryId === this.whichProduct) {
          this.getProducts()
          this.whichProduct = ""
        }
      })

    this.adminService._ifUpdateSuccesseded
      .subscribe((status: boolean) => {
        if (status === true) {
          this.whichProduct = this.adminService.productCategoryId
          this.getProducts()
        }
      })

    this.role = this.loginService.userRole
  }

  ngOnInit(): void {

    this.productsService.fetchProducts("1").subscribe((data: Product[]) => this.products = data)
  }


  getProducts(): void {
    this.productsService.fetchProducts(this.whichProduct)
      .subscribe((data: Product[]) => this.products = data)
  }

  showPopUp(i?: number) {

    this.ifPopUp = true
    if (i != undefined)
      this.productIndex = i;

  }

  updateProduct(i?: number): void {

    if (i != undefined) {
      this.adminService.setProductToUpdate(this.products[i])
      this.adminService.productId = this.products[i].productId
    }
  }

  addToCart(): void {

    if (this.quantity > 0) {

      if (this.theFoundProduct === undefined) {

        this.productsService.addProductToCart(this.products[this.productIndex], this.loginService.customerId, this.quantity)
          .subscribe((product: ProductInCart) => this.productsService.setNewProduct(product))

      } else {

        this.productsService.addProductToCart(this.theFoundProduct, this.loginService.customerId, this.quantity)
          .subscribe((product: ProductInCart) => {
            this.productsService.setNewProduct(product)
            this.ifProductFound = !this.ifProductFound;
            this.theFoundProduct = undefined
          })
      }
      this.ifPopUp = false;
      this.quantity = 0;
    }
  }

  findSearchedProduct(productName: string) {

    this.productsService.getProduct(productName)
      .subscribe((product: Product[]) => {

        if (product.length > 0) {
          this.ifProductFound = !this.ifProductFound;
          this.theFoundProduct = {
            productId: product[0].productId,
            productName: product[0].productName,
            categoryId: product[0].categoryId,
            image: product[0].image,
            price: product[0].price
          }

        }
      })
  }

  goBackToMenu(): void {
    this.ifProductFound = !this.ifProductFound;
    this.ngOnInit()

  }


}




