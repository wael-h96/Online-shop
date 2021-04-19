import { stringify } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { Product } from 'src/app/Interfaces/product';
import { AdminService } from "../../Services/admin.service";

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  public ifAddProduct: boolean = false;
  public productName: string = "";
  public productId: string = "";
  public productPrice: string | number = "";
  public productCategory: string = "";

  public updateProductName: string = "";
  public updateProductPrice: string | number = ""
  public updateProductCategory: string = ""

  public newProduct: Product | undefined
  public updatedProduct: Product | undefined;
  public ifProductSelectedToUpdate: boolean = false;

  public message: string = ""

  constructor(public adminService: AdminService) {
    this.adminService._productToUpdate
      .subscribe((product: Product) => {
        this.ifProductSelectedToUpdate = true;
        this.ifAddProduct = false
        this.updateProductName = product.productName;
        this.updateProductPrice = product.price;
        this.updateProductCategory = product.categoryId

      })

  }

  ngOnInit(): void { }

  addProduct(): void {

    this.newProduct = {
      productId: this.productId,
      productName: this.productName,
      price: (Number)(this.productPrice),
      categoryId: this.productCategory,
      image: "",
    }

    this.adminService.addProductToProductsList(this.newProduct)
      .subscribe((newProduct: any) => {

        if (newProduct.error) {
          console.log(newProduct.error)
        } else {

          this.adminService.setNewAddedProduct(newProduct)
        }
        this.productCategory = ""
        this.productId = ""
        this.productPrice = ""
        this.productName = ""
      });

  }


  updateProduct(): void {

    this.updatedProduct = {
      productId: this.adminService.productId,
      productName: this.updateProductName,
      price: (Number)(this.updateProductPrice),
      categoryId: this.updateProductCategory,
      image: "",
    }
    

    this.adminService.updateProduct(this.updatedProduct)
      .subscribe((data: any) => {
       
        if (data.message === "Successfuly Updated") {

          this.adminService.productCategoryId = this.updateProductCategory
          this.adminService.setIfUpdateSuccesseded(true)
          this.message = data.message
          this.ifProductSelectedToUpdate = false;
        } else {
         
          this.adminService.setIfUpdateSuccesseded(false)
          this.message = data.message
        }
        setTimeout(() => {
          this.message = ""
        }, 2000);
      })
  }

}
