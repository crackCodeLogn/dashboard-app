import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CsvService {

  constructor(private http: HttpClient) { }

  getCsvData(): Observable<any> {
    const csvUrl = 'assets/SimulatorResult.csv';
    return this.http.get(csvUrl, { responseType: 'text' });
  }
}
