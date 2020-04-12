import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { Country } from '../models/country.model';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class CountriesService {

    private serviceUrl = 'https://api.covid19api.com/summary';

    constructor(private httpClient: HttpClient) { }

    getCountries(): Observable<any> {
        return this.httpClient.get<any>(this.serviceUrl).pipe(
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
