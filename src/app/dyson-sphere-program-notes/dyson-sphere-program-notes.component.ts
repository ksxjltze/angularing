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

      this.dspNoteList.forEach((note: DSPNote) => {

        this.dspService.getDSPSystem(note._links.system.href)
        .subscribe((system: DSPSystem) => {
          this.dspNotes.push({
            name: note.name,
            description: note.description,
            system_name: system.name,
            uri: note._links.self.href
          });
        });
      });
    });

    this.dspService.getAllDSPSystems()
    .subscribe((dspSystemsList: DSPSystem[]) => {
      this.dspSystemsList = dspSystemsList;
      console.log(this.dspSystemsList);
    });

  }

  createDSPNote(){
    let updateNoteList = (note: DSPNote) => {
      this.dspService.getDSPSystem(note._links.system.href)
        .subscribe((system: DSPSystem) => {
          note.system = system._links.self.href;
          this.dspNoteList.push(note);
    
          this.dspNotes.push({
            name: note.name,
            description: note.description,
            system_name: system.name,
            uri: note._links.self.href
          });

      });
    }

    this.dspService
      .addDSPNote({name: "Testing", description: "123", system: this.dspService.systemsUrl + "/649d8f15765a1409b2a5603b"})
      .subscribe(updateNoteList);
  }

  deleteDspNote(uri: string){
    this.dspService.deleteDSPNoteById(uri)
    .subscribe((result: DSPNote) => {
      let uri = result._links.self.href;
      this.dspNoteList = this.dspNoteList.filter((note: DSPNote) => note._links.self.href !== uri);
      this.dspNotes = this.dspNotes.filter((note: DSPNoteViewModel) => note.uri !== uri);
    });
  }
}
