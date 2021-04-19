import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LayoutComponent } from './components/layout/layout.component';
import { LogInComponent } from './components/log-in/log-in.component';
import { MainComponentsComponent } from './components/main-components/main-components.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';
import { HttpClientModule } from '@angular/common/http';
import { ShoppingComponentsComponent } from './components/shopping-components/shopping-components.component';
import { ProductsComponent } from './components/products/products.component';
import { CustomerCartComponent } from './components/customer-cart/customer-cart.component';
import { OrderComponent } from './components/order/order.component';
import { AdminComponent } from './components/admin/admin.component';
import { PanelCComponent } from './components/panel-c/panel-c.component';
import { DatePipe } from '@angular/common';
import { HeaderComponent } from './components/header/header.component'
import { CookieService } from "ngx-cookie-service"
import { LogInService } from './Services/log-in.service';


@NgModule({
  declarations: [
    AppComponent,
    LayoutComponent,
    LogInComponent,
    MainComponentsComponent,
    SignUpComponent,
    ShoppingComponentsComponent,
    ProductsComponent,
    CustomerCartComponent,
    OrderComponent,
    AdminComponent,
    PanelCComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,

  ],
  providers: [DatePipe,LogInService],
  bootstrap: [AppComponent]
})
export class AppModule { }
