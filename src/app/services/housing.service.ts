import { Injectable } from '@angular/core';
import { HousingLocation } from '../models/housinglocation';
import { HttpClient } from '@angular/common/http';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HousingService {
  // url = 'https://quick-and-dirty-restful-api.vercel.app/locations'
  url = 'https://oyster-app-k3g3w.ondigitalocean.app/locations'
  // url = 'http://localhost:8080/locations'

  getAllHousingLocations(): Observable<HousingLocation[]> {
    return this.http.get<HousingLocation[]>(this.url).pipe(
      map((result:any)=>{
        return result._embedded.locations;
     }));

  }
  
  getHousingLocationById(id: number): Observable<HousingLocation> {
    return this.http.get<HousingLocation>(`${this.url}/${id}`).pipe(
      map((result:any)=>{
        return result;
     }));
  }

  submitApplication(firstName: string, lastName: string, email: string) {
    console.log(`Homes application received: firstName: ${firstName}, lastName: ${lastName}, email: ${email}.`);
  }

  constructor(private http: HttpClient) { }
}