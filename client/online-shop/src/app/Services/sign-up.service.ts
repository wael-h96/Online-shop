import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NewUser1, NewUser2 } from '../Interfaces/newUser1';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class SignUpService {

  public URL: string = "http://localhost:8080/api/user"

  constructor(private http: HttpClient) { }

  public submitFirstRegisteration(newUser: NewUser1): Observable<any> {
    return this.http.post(this.URL + "/sign-up-1", newUser);
  }

  public submitSecondRegisteration(newUser: NewUser2): Observable<any> {
    return this.http.post(this.URL + "/sign-up-2", newUser);
  }

}
