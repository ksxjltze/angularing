import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { DspNoteComponent } from '../dsp-note/dsp-note.component';
import { DspNote } from '../models/dsp-note';
import { DspService } from '../services/dsp.service';

@Component({
  selector: 'app-dyson-sphere-program-notes',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet, DspNoteComponent],
  templateUrl: './dyson-sphere-program-notes.component.html',
  styleUrls: ['./dyson-sphere-program-notes.component.css']
})
export class DysonSphereProgramNotesComponent {
  dspNoteList: DspNote[] = [];
  dspService: DspService = inject(DspService);

  constructor() {
    this.dspService.getAllDspNotes()
    .subscribe((dspNoteList: DspNote[]) => {
      this.dspNoteList = dspNoteList;
    });
  }
}
