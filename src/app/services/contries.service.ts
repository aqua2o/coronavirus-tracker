import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Country } from '../models/country.model';
import { map } from 'rxjs/operators';

@Injectable({
    providedIn: 'root'
})

export class CountriesService {

    private serviceUrl = 'https://api.covid19api.com/summary';

    constructor(private httpClient: HttpClient) { }

    getCountries(): Observable<any> {
        return this.httpClient.get<any>(this.serviceUrl).pipe(
            map(res => res.Countries)
        );
    }
}
