import { Component, OnInit, ɵɵtrustConstantResourceUrl } from '@angular/core';
import { SignUpService } from '../../Services/sign-up.service';
import { NewUser1, NewUser2 } from '../../Interfaces/newUser1';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent implements OnInit {

  public id: string = ""
  public email: string = ""
  public password1: string = ""
  public password2: string = ""
  public city: string = ""
  public street: string = ""
  public firstName: string = ""
  public lastName: string = ""
  public firstPartDone: boolean = false;
  public newUserPart1: NewUser1 | undefined;
  public newUserPart2: NewUser2 | undefined;
  public messages: string = ""

  constructor(private SignUpService: SignUpService) { }

  ngOnInit(): void {
  }

  perfomFirstSignUp(): void {

    this.newUserPart1 = {
      userId: this.id,
      email: this.email,
      password: this.password1,
    };
    if (this.password1 != this.password2) {
      this.messages = "Passwords does not match"
      setTimeout(() => {
        this.messages = ""
      }, 3000)
    }
    else {
      this.SignUpService.submitFirstRegisteration(this.newUserPart1)
        .subscribe(data => {
          if (data.message === "success") {
            this.firstPartDone = true;
            this.messages = ""
          }
          else {
            this.messages = data.message
            setTimeout(() => {
              this.messages = ""
            }, 3000)
          }
        });
    }
  }

  perfomSecondSignUp(): void {
    this.newUserPart2 = {
      userId: this.id,
      city: this.city,
      street: this.street,
      firstName: this.firstName,
      lastName: this.lastName,
    };

    this.SignUpService.submitSecondRegisteration(this.newUserPart2)
      .subscribe(data => {
        if (data.ok)
          this.messages = "User successfuly registerd!"
        setTimeout(() => {
          this.messages = ""
        }, 2000)
      }

      )
  }

}

