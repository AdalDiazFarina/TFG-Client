import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { SERVER_URL } from "../app.config";
import { UserRegister } from "../interfaces/iUserRegister";
import { UserLogin } from "../interfaces/iUserLogin";

@Injectable({
  providedIn: 'root'
})

export class sAuth {
  private url = '/api/';

  constructor(private http: HttpClient) {}

  register(model: UserRegister): Observable<any> {
    return this.http.post(SERVER_URL + this.url + 'register', model)
  }

  login(model: UserLogin): Observable<any> {
    return this.http.post(SERVER_URL + this.url + 'login', model)
  }
  
}