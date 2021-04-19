import { Component, OnInit } from '@angular/core';
import { LogInService } from 'src/app/Services/log-in.service';

@Component({
  selector: 'app-main-components',
  templateUrl: './main-components.component.html',
  styleUrls: ['./main-components.component.css']
})
export class MainComponentsComponent implements OnInit {

  public ifRegisterPage: boolean = false;

  constructor(private logInService: LogInService) {

  }

  ngOnInit(): void {}

  goToRegisterPage(): void {
    this.ifRegisterPage = true;
  }

  goBackToLogInPage(): void {
    this.ifRegisterPage = false;
  }


}
