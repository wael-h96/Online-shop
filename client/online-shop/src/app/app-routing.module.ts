import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LogInComponent } from './components/log-in/log-in.component';
import { MainComponentsComponent } from './components/main-components/main-components.component';
import { ShoppingComponentsComponent } from './components/shopping-components/shopping-components.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';

const routes: Routes = [
  { path: "online-shop", component: ShoppingComponentsComponent },
  { path: "home-page", component: MainComponentsComponent },
  { path: "**", redirectTo: '/home-page', pathMatch: 'full' },
  { path: "", redirectTo: '/home-page', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
