import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { LogInService } from "../../Services/log-in.service";

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {

  public ifLoggedIn: boolean = false;

  constructor(private logInService: LogInService) {
    this.logInService._ifLoggedIn.subscribe((status: boolean) => { this.ifLoggedIn = status })
  }

  ngOnInit(): void {

  }

}
