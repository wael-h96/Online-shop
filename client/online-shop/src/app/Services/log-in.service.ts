import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { User } from "../Interfaces/User";
import { Observable, Subject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class LogInService {

  public _ifLoggedIn: Observable<boolean>;
  public ifLoggedIn: Subject<boolean>;

  public _ifSignedIn: Observable<boolean>
  public ifSignedIn: Subject<boolean>

  public userRole: string = "";
  public customerId: string = ""

  public loggedIn: boolean = false;

  constructor(private http: HttpClient) {

    this.ifLoggedIn = new Subject<boolean>();
    this._ifLoggedIn = this.ifLoggedIn.asObservable();

    this.ifSignedIn = new Subject<boolean>();
    this._ifSignedIn = this.ifSignedIn.asObservable();

  }


  perfomSignIn(user: User): Observable<any> {

    return this.http.post("http://localhost:8080/api/user/log-in", { withCredentials: true, user });

  }

  setMyBool(newValue: any) {
    this._ifLoggedIn = newValue;
    this.ifLoggedIn.next(newValue);
    this.loggedIn = newValue
  }

  setIfSignedIn(newValue: any) {
    this._ifSignedIn = newValue;
    this.ifSignedIn.next(newValue)
    this.loggedIn = newValue
  }



}
