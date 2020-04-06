import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})

export class AjaxService {

    constructor(private httpClient: HttpClient) { }

    // This service uses the HttpClient for communicating with a remote server over HTTP
    getApiData(url): Observable<any> {
        return this.httpClient.get(url);
    }
}
