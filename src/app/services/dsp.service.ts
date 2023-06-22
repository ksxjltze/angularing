import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { DspNote } from '../models/dsp-note';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DspService {
  url = 'https://oyster-app-k3g3w.ondigitalocean.app/dspnotes'
  // url = 'http://localhost:8080/dspnotes'
  constructor(private http: HttpClient) { }

  getAllDspNotes() : Observable<DspNote[]>{
    return this.http.get<DspNote[]>(this.url).pipe(
      map((result:any) => {
        return result._embedded.dspnotes;
      }));
  }
}
