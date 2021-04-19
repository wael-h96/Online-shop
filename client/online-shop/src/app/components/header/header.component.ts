import { Component, OnInit } from '@angular/core';
import { LogInService } from 'src/app/Services/log-in.service';
import { ProductsService } from 'src/app/Services/shopping.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public loggedIn: boolean = false;
  public CustomerName: string = ""
  public productName: string = ""

  constructor(private logInService: LogInService, private shoppingService: ProductsService) {
    this.logInService._ifLoggedIn.subscribe((data: boolean) => this.loggedIn = true)
  }

  ngOnInit(): void {
  }

  findSearchedProduct(): void {
    this.shoppingService.setFindSearchedProduct(this.productName);
    this.productName = ""
  }

}
