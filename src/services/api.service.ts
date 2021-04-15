import { Injectable, isDevMode } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams, HttpBackend } from '@angular/common/http';
import { Observable } from 'rxjs/';

import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';



@Injectable({
    providedIn: 'root',
})
export class ApiService {

    dumont = new Map();

    constructor(
        private http: HttpClient,
    ) { }

    private formatErrors(error: any) {
        return throwError(error);
    }

    get(path: string, params: HttpParams = new HttpParams()): Observable<any> {
        try {
            return this.http.get(`${environment.baseUrl}${path}`, { params })
                .pipe(catchError(this.formatErrors));

        } catch (error_code) {
            if (isDevMode()) {
                console.log("*-- ApiService.get() Errors --*");
            }
            console.log(error_code);
        }
        return null;
    }

    put(path: string, body: any): Observable<any> {
        return this.http.put(
            `${environment.baseUrl}${path}`,
            body
        ).pipe(catchError(this.formatErrors));
    }

    patch(path: string, body: Object = {}): Observable<any> {
        return this.http.patch(
            `${environment.baseUrl}${path}`,
            body
        ).pipe(catchError(this.formatErrors));
    }

    post(path: string, body: any): Observable<any> {
        const obj = this.http.post(`${environment.baseUrl}${path}`, body
        ).pipe(catchError(this.formatErrors));

        return obj;
    }

    delete(path): Observable<any> {
        return this.http.delete(
            `${environment.baseUrl}${path}`
        ).pipe(catchError(this.formatErrors));
    }

    options(path: string): Observable<any> {
        return this.http.options(`${environment.baseUrl}${path}`)
            .pipe(catchError(this.formatErrors));
    }

    // Implemented to not reference the application structure,
    //  but use a URL directly.  
    //   Example: Scoring Apply_Score API is not served from the
    //            /api/v1 structure as supported by the apiservice.
    //
    //            The Scoring api is served from the root directly.

    getDirect(path: string, params: HttpParams = new HttpParams()): Observable<any> {
        return this.http.get(`${path}`, { params })
            .pipe(catchError(this.formatErrors));
    }


    downloadFile(path): Observable<Blob> {
        return this.http.get(`${environment.baseUrl}${path}`, { responseType: 'blob' }).pipe(catchError(this.formatErrors));
    }

}