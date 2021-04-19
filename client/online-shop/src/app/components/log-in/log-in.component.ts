import { Component, OnInit } from '@angular/core';
import { LogInService } from "../../Services/log-in.service";
import { User } from "../../Interfaces/User";
import { ProductsService } from 'src/app/Services/shopping.service';
import { CookieService } from 'ngx-cookie-service';


@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrls: ['./log-in.component.css']
})
export class LogInComponent implements OnInit {

  userName: string = ""
  password: string = ""
  messages: string = ""
  loggedin: boolean = false;
  alreadyHasCart: boolean = false;
  public role: string = ""

  constructor(public logInService: LogInService, public shoppingService: ProductsService) { }

  ngOnInit(): void {

  }

  perfomLogIn(): void {

    const user: User = {
      userName: this.userName,
      password: this.password
    };

    this.logInService.perfomSignIn(user)
      .subscribe(data => {
        console.log(data)
        if (data.error)
          this.messages = data.error
        else {
          this.loggedin = true;
          
          this.logInService.customerId = data.loggedInUser.userId
          this.logInService.userRole = data.loggedInUser.role
          this.role = data.loggedInUser.role
          if (this.role === "admin")
            this.logInService.customerName = "Admin"
          else
            this.logInService.customerName = data.loggedInUser.firstName

          if (data.loggedInUser.role !== "admin") {
            this.shoppingService.fetchCartProducts(this.logInService.customerId)
              .subscribe((data: any) => {
                if (data.length != 0)
                  this.alreadyHasCart = true
                else {
                  this.alreadyHasCart = false;
                }
              })
          }

          this.logInService.setIfSignedIn(true)


        }
      })

  }

  startShopping(): void {
    this.logInService.setMyBool(true);
    this.logInService.setIfSignedIn(true)
  }

}
