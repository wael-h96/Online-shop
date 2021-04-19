import { ThrowStmt } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { LogInService } from 'src/app/Services/log-in.service';
import { PanelCService } from 'src/app/Services/panel-c.service';
import { DatePipe } from '@angular/common'
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';


@Component({
  selector: 'app-panel-c',
  templateUrl: './panel-c.component.html',
  styleUrls: ['./panel-c.component.css']
})
export class PanelCComponent implements OnInit {

  public numberOfOrders: string = ""
  public numberOfProducts: string = ""

  public hasOpenCart: boolean = false;
  public hasAlreadyOrdered: boolean = false;
  public newCustomer: boolean = false;

  public cartFromDate: string | any = "";
  public lastPurchaseDate: string | any = ""

  public customerName: string = ""
  public ifSignedIn: boolean = false;

  public ifCustomer: boolean = false;

  constructor(private panelCService: PanelCService, private logInService: LogInService, private datepipe: DatePipe) {



    this.logInService._ifSignedIn.subscribe((status: boolean) => {
      this.ifSignedIn = status
      if (this.logInService.userRole === "customer")
        this.ifCustomer = true

      this.panelCService.getCustomerHistory(this.logInService.customerId)
        .subscribe((customerHistory: any) => {

          if (customerHistory.cartDbResponse.length > 0 &&
            !customerHistory.cartDbResponse[customerHistory.cartDbResponse.length - 1].isDone) {
            this.hasOpenCart = true;
            this.hasOpenCart = true;
            let formattedDate = this.datepipe.transform(customerHistory.cartDbResponse[0].createdAt, 'yyyy-MM-dd')
            this.cartFromDate = formattedDate
          }
          if (customerHistory.orderDbResponse.length > 0) {
            this.hasAlreadyOrdered = true;
            let formattedDate = this.datepipe.
              transform(customerHistory.orderDbResponse[customerHistory.orderDbResponse.length - 1].orderDate, 'yyyy-MM-dd')
            this.lastPurchaseDate = formattedDate
          }
          if (customerHistory.cartDbResponse.length === 0 && customerHistory.orderDbResponse.length === 0) {
            this.newCustomer = true;
          }
        })

      this.panelCService.getCustomerName(this.logInService.customerId)
        .subscribe((name: string) => { this.customerName = name })


    })

  }

  ngOnInit(): void {

    this.panelCService.getNumberOfProducts()
      .subscribe(data => {
        this.numberOfProducts = data.length
      })

    this.panelCService.getNumberOfOrders()
      .subscribe(data => {
        this.numberOfOrders = data.length
      })

  }



}
