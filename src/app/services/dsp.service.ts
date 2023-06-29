import { Injectable } from '@angular/core';
import { Observable, ObservableInput } from 'rxjs';
import { DSPNote } from '../models/dsp-note';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map } from 'rxjs/operators';
import { DSPSystem } from '../models/dsp-system';

@Injectable({
  providedIn: 'root'
})
export class DspService {
  // url = 'https://oyster-app-k3g3w.ondigitalocean.app/dspnotes'

  root = 'http://localhost:8080/'
  url = this.root +'dspnotes'
  systemsUrl = this.root + 'dspsystems'

  constructor(private http: HttpClient) { }

  getAllDSPNotes() : Observable<DSPNote[]>{
    return this.http.get<DSPNote[]>(this.url).pipe(
      map((result:any) => {
        return result._embedded.dspnotes;
      }));
  }
  
  getAllDSPSystems() : Observable<DSPSystem[]>{
    return this.http.get<DSPSystem[]>(this.systemsUrl).pipe(
      map((result : any) => {
        return result._embedded.dspsystems;
      })
    )
  }

  getDSPSystem(url: string) : Observable<DSPSystem>{
    return this.http.get<DSPSystem>(url);
  }

  handleError(error: HttpErrorResponse): ObservableInput<any> {
    console.error('An error occurred:', error.error);
    return error.error;
  }
  
  addDSPNote(note: DSPNote): Observable<DSPNote>{
    return this.http.post<DSPNote>(this.url, note)
      .pipe(
        catchError(this.handleError)
      );
  }

  deleteDSPNoteById(uri: string): Observable<any>{
    return this.http.delete(uri);
  }
}
