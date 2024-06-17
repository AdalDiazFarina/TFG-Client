import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class sReport {
  private jsonUrl = 'assets/reportTexts.json';

  constructor(private http: HttpClient) { }

  getReportTexts(): Observable<any> {
    return this.http.get<any>(this.jsonUrl);
  }
}
