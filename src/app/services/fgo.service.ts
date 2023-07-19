import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class FgoService {

  constructor(private http: HttpClient) { }

  getServants(){
    return this.http.get("https://api.atlasacademy.io/export/NA/basic_servant.json");
  }
}
