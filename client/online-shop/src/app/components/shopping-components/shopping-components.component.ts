import { Component, OnInit } from '@angular/core';
import { LogInService } from 'src/app/Services/log-in.service';
import { ProductInCart } from '../../Interfaces/ProductInCart';



@Component({
  selector: 'app-shopping-components',
  templateUrl: './shopping-components.component.html',
  styleUrls: ['./shopping-components.component.css']
})
export class ShoppingComponentsComponent implements OnInit {

  public ifPopUp: boolean = false;
  public quantity: number = 0;
  public ifAdmin: boolean = true;
  public ifLoggedIn: boolean = false;
  

  constructor(private logInService: LogInService) {}

  ngOnInit(): void {
    this.logInService.userRole === "admin" ? this.ifAdmin = true : this.ifAdmin = false;
    this.ifLoggedIn = this.logInService.loggedIn
  }


}
