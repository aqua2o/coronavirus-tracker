import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CountryService {

    constructor(private httpClient: HttpClient) { }

    getCountryAllStatus(countrySlug): Observable<any> {
      const serviceUrl = `https://api.covid19api.com/dayone/country/${countrySlug}`;
      return this.httpClient.get<any>(serviceUrl).pipe(
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
