import { Injectable } from '@angular/core';
import { Observable, ObservableInput } from 'rxjs';
import { DSPNote } from '../models/dsp-note';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DspService {
  // url = 'https://oyster-app-k3g3w.ondigitalocean.app/dspnotes'
  url = 'http://localhost:8080/dspnotes'
  constructor(private http: HttpClient) { }

  getAllDSPNotes() : Observable<DSPNote[]>{
    return this.http.get<DSPNote[]>(this.url).pipe(
      map((result:any) => {
        return result._embedded.dspnotes;
      }));
  }
  
  addDSPNote(note: DSPNote): Observable<DSPNote>{
    return this.http.post<DSPNote>(this.url, note)
      .pipe(
        // catchError(this.handleError)
      );
  }
}
