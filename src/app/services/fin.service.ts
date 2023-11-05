import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {IMarketData} from "../model/IMarketData";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FinService {

  constructor(private http: HttpClient) {
  }

  public getMarketData(symbol: string, start: string, end: string): Observable<IMarketData> {
    let string_url = `http://localhost:8083/mkt?symbol=${symbol}&start=${start}&end=${end}`;
    console.log(`Hitting url ${string_url}`)
    return this.http.get<IMarketData>(string_url)
  }
}
