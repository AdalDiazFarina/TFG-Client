import { HttpClient, HttpEvent } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";
import { SERVER_URL } from "../app.config";
import { UserRegister } from "../interfaces/iUserRegister";
import { UserLogin } from "../interfaces/iUserLogin";

@Injectable({
  providedIn: 'root'
})
export class sAuth {
  private url = '/api/';

  public $refreshToken = new Subject<boolean>;

  constructor(private http: HttpClient) {
    this.$refreshToken.subscribe((res: any) => {
      this.refreshToken();
    })
  }

  register(model: UserRegister): Observable<any> {
    return this.http.post(SERVER_URL + this.url + 'register', model)
  }

  login(model: UserLogin): Observable<any> {
    return this.http.post(SERVER_URL + this.url + 'login', model)
  }

  refreshToken(): Observable<HttpEvent<any>> {
    return this.http.post(SERVER_URL + this.url + 'refresh', {}) as Observable<HttpEvent<any>>;
  }
  
}