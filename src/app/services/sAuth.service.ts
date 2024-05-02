import { HttpClient, HttpEvent } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, Subject, of, tap } from "rxjs";
import { SERVER_URL } from "../app.config";
import { UserRegister } from "../interfaces/iUserRegister";
import { UserLogin } from "../interfaces/iUserLogin";
import { User } from "../interfaces/iUser";

@Injectable({
  providedIn: 'root'
})
export class sAuth {
  private url = '/api';

  private userData?: User;
  public $refreshToken = new Subject<boolean>;

  constructor(private http: HttpClient) {
    this.$refreshToken.subscribe(() => {
      this.refreshToken().subscribe({
        next: (resp: any) => {
          localStorage.setItem('accesToken', resp.access_token);
          localStorage.setItem('refreshToken', resp.refresh_token)
        }, error: (error) => console.error(error)
      });
    })
  }

  getUserData(): Observable<any> {
    if (this.userData) {
      return of(this.userData);
    } else {
      return this.http.get<any>(SERVER_URL + this.url + '/user').pipe(
        tap(userData => this.userData = userData.data)
      );
    }
  }

  getUser(): Observable<any> {
    return this.http.get<any>(SERVER_URL + this.url + '/user');
  }

  register(model: UserRegister): Observable<any> {
    return this.http.post(SERVER_URL + this.url + '/register', model)
  }

  login(model: UserLogin): Observable<any> {
    return this.http.post(SERVER_URL + this.url + '/login', model)
  }

  refreshToken(): Observable<HttpEvent<any>> {
    return this.http.post(SERVER_URL + this.url + '/refresh', {}) as Observable<HttpEvent<any>>;
  }

  update(model: User):  Observable<any> {
    return this.http.put(SERVER_URL + this.url + '/user', model);
  }
}
