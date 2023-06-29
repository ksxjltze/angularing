import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { DspNoteComponent } from '../dsp-note/dsp-note.component';
import { DSPNote } from '../models/dsp-note';
import { DspService } from '../services/dsp.service';
import { DSPSystem } from '../models/dsp-system';
import { DSPNoteViewModel } from '../view-models/dsp-note-viewmodel';

@Component({
  selector: 'app-dyson-sphere-program-notes',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet, DspNoteComponent],
  templateUrl: './dyson-sphere-program-notes.component.html',
  styleUrls: ['./dyson-sphere-program-notes.component.css']
})
export class DysonSphereProgramNotesComponent {
  dspService: DspService = inject(DspService);

  //Data
  dspNoteList: DSPNote[] = [];
  dspSystemsList: DSPSystem[] = [];

  //View Data
  dspNotes: DSPNoteViewModel[] = [];

  constructor() {
    this.dspService.getAllDSPNotes()
    .subscribe((dspNoteList: DSPNote[]) => {
      this.dspNoteList = dspNoteList;
      console.log(this.dspNoteList);

      this.dspNotes = this.dspNoteList.map((note: DSPNote) => {
        return {
          name: note.name,
          description: note.description,
          system_name: null
        }
      });

      for (let index = 0; index < this.dspNoteList.length; index++) {
        this.dspNotes[index].system_name = "Loading...";
        let note : DSPNote = this.dspNoteList[index];

        this.dspService.getDSPSystem(note._links.system.href)
        .subscribe((system: DSPSystem) => {
          this.dspNotes[index].system_name = system.name;
        });
      }
    });

    this.dspService.getAllDSPSystems()
    .subscribe((dspSystemsList: DSPSystem[]) => {
      this.dspSystemsList = dspSystemsList;
      console.log(this.dspSystemsList);
    });

  }

  createDSPNote(){
    this.dspService
      .addDSPNote({name: "Testing", description: "123", _links: ""})
      .subscribe(note => this.dspNoteList.push(note));
  }
}
