import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { SERVER_URL } from "../app.config";
import { InvestmentProfile } from "../interfaces/iInvestmentProfile";

@Injectable({
  providedIn: 'root'
})

export class sInvesmentProfile {
  private url = '/api/investmentprofile';

  constructor(private http: HttpClient) {}

  get(id: Number): Observable<any> {
    return this.http.get(SERVER_URL + this.url + '/' + id);
  }

  getList(model: InvestmentProfile): Observable<any> {
    return this.http.post(SERVER_URL + this.url + '/getList', model);
  }

  create(model: InvestmentProfile): Observable<any> {
    return this.http.post(SERVER_URL + this.url, model);
  }

  update(model: InvestmentProfile): Observable<any> {
    return this.http.put(SERVER_URL + this.url, model);
  }

  delete(id: number): Observable<any> {
    return this.http.delete(SERVER_URL + this.url + '/' + id);
  }

  deleteMultiple(ids: number[]): Observable<any> {
    return this.http.delete(SERVER_URL + this.url, {body: ids});
  }
}