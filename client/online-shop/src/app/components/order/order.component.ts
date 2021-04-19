import { Component, OnInit } from '@angular/core';
import { LogInService } from 'src/app/Services/log-in.service';
import { ProductsService } from 'src/app/Services/shopping.service';
import { OrderDetails } from '../../Interfaces/OrderDetails'
import { Router } from '@angular/router'


@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {

  public clickCounter: number = 0;
  public customerCity: string = ""
  public customerStreet: string = ""
  public shippingDate: string = "";
  public adress: string = ""
  public creditCard: string = ""
  public showOrderPopup: boolean = false
  public errors: string = ""

  public order: OrderDetails | undefined

  constructor(public shoppingService: ProductsService, public logInService: LogInService, private route: Router) { }

  ngOnInit(): void {
    setInterval(() => {
      this.clickCounter = 0
    }, 1000)
  }

  inputClicked(data: any): void {
    this.clickCounter++;
    if (this.clickCounter == 2) {

      this.shoppingService.getCustomerAdress(this.logInService.customerId, data)
        .subscribe((customerAdress: any) => {
          if (data === "street")
            this.customerStreet = customerAdress;
          else
            this.customerCity = customerAdress;
        })
      this.clickCounter = 0;
    }
  }

  submitOrder(): void {

    this.order = {
      city: this.customerCity,
      street: this.customerStreet,
      shippingDate: this.shippingDate,
      creditCard: this.creditCard
    }

    this.shoppingService.handleOrderPage(this.order, this.logInService.customerId)
      .subscribe((data: any) => {

        if (data.err) {
          this.errors = data.err
        } else {
          this.showOrderPopup = true
        }
        
        setTimeout(() => {
          this.errors = ""

        }, 3000)
      })
  }

  goBackToTheMainPage() {
    this.route.navigate(['/home-page'])
      .then(() => {
        window.location.reload();
      });

  }

  downloadReceipt(): void {
    this.shoppingService.downloadReceipt(this.logInService.customerId)
      .subscribe(data => console.log(data))
  }

}

