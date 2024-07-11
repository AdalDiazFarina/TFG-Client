import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { SERVER_URL } from "../app.config";

@Injectable({
  providedIn: 'root'
})

export class sOperation {
  private url = '/api/operation';

  constructor(private http: HttpClient) {}

  getList(strategy_id: number, profile_id: number): Observable<any> {
    return this.http.post(SERVER_URL + this.url + '/getList', {strategy_id: strategy_id, investment_profile_id: profile_id});
  }
}