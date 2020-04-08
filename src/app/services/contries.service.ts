import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Country } from '../models/country.model';

@Injectable({
    providedIn: 'root'
})

export class CountriesService {

    private serviceUrl = 'https://api.covid19api.com/summary';

    constructor(private httpClient: HttpClient) { }

    getCountries(): Observable<Country[]> {
        return this.httpClient.get<Country[]>(this.serviceUrl);
    }
}
