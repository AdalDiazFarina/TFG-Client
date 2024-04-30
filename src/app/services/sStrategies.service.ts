import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { SERVER_URL } from "../app.config";
import { Strategy } from "../interfaces/iStrategy";

@Injectable({
  providedIn: 'root'
})

export class sStrategies {
  private url = '/api/strategy';

  constructor(private http: HttpClient) {}

  getList(model: Strategy): Observable<any> {
    return this.http.post(SERVER_URL + this.url + '/getList', model);
  }
}