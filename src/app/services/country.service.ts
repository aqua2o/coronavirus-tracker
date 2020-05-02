import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

    constructor(private httpClient: HttpClient) { }

    getCountryApi1(countrySlug): Observable<any> {
      const serviceUrl = `https://api.covid19api.com/dayone/country/${countrySlug}`;
      return this.httpClient.get<any>(serviceUrl).pipe(
          retry(0),
          catchError(this.handleError)
      );
    }

    getCountryApi2(countrySlug): Observable<any> {
      const httpOptions = {
        headers: new HttpHeaders({
          'x-rapidapi-host':  'covid-193.p.rapidapi.com',
          'x-rapidapi-key': '1a7dc8c3b0mshd3ce3fd4fce1b28p1d1b40jsnbceb237fdbaf'
        })
      };
      const serviceUrl = `https://covid-193.p.rapidapi.com/history?country=${countrySlug}`;
      return this.httpClient.get<any>(serviceUrl, httpOptions).pipe(
          retry(0),
          catchError(this.handleError)
      );
    }


    getCountryApi3(countrySlug): Observable<any> {
      const httpOptions = {
        headers: new HttpHeaders({
          'x-rapidapi-host':  'coronavirus-monitor.p.rapidapi.com',
          'x-rapidapi-key': '1a7dc8c3b0mshd3ce3fd4fce1b28p1d1b40jsnbceb237fdbaf'
        })
      };
      const serviceUrl = `https://coronavirus-monitor.p.rapidapi.com/coronavirus/cases_by_particular_country.php?country=${countrySlug}`;
      return this.httpClient.get<any>(serviceUrl, httpOptions).pipe(
          retry(0),
          catchError(this.handleError)
      );
    }

    handleError(error) {
      let errorMessage = '';
      if (error.error instanceof ErrorEvent) {
          // client-side error
          errorMessage = `Client-side Error: ${error.error.message}`;
      } else {
          // server-side error
          errorMessage = `Server-side Error Code: ${error.status}\nMessage: ${error.message}`;
      }
      console.log(errorMessage);
      return throwError(errorMessage);
  }
}
