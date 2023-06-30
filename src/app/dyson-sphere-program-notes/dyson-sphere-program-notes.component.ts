import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterOutlet } from '@angular/router';
import { DspNoteComponent } from '../dsp-note/dsp-note.component';
import { DSPNote } from '../models/dsp-note';
import { DspService } from '../services/dsp.service';
import { DSPSystem } from '../models/dsp-system';
import { DSPNoteViewModel } from '../view-models/dsp-note-viewmodel';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-dyson-sphere-program-notes',
  standalone: true,
  imports: [CommonModule, RouterLink, RouterOutlet, DspNoteComponent, ReactiveFormsModule],
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
  
  //Form Controls
  dspNoteForm = new FormGroup({
    dspNoteNameControl: new FormControl('', Validators.required),
    dspNoteDescriptionControl: new FormControl('', Validators.required),
    dspNoteSystemControl: new FormControl('', Validators.required),
  });

  constructor() {
  }

  ngOnInit(): void {
    this.dspService.getAllDSPNotes()
      .subscribe((dspNoteList: DSPNote[]) => {
        this.dspNoteList = dspNoteList;
        this.updateNoteViewModels();
    });

    this.dspService.getAllDSPSystems()
    .subscribe((dspSystemsList: DSPSystem[]) => {
      this.dspSystemsList = dspSystemsList;
    });
  }

  onSubmit(){
    let noteName = this.dspNoteForm.value.dspNoteNameControl;
    if (noteName === undefined || noteName === null || noteName === "") 
      throw new Error("Note name cannot be empty");

    let noteDescription = this.dspNoteForm.value.dspNoteDescriptionControl;
    if (noteDescription === undefined || noteDescription === null || noteDescription === "")
      throw new Error("Note description cannot be empty");

    let noteSystem = this.dspNoteForm.value.dspNoteSystemControl;
    if (noteSystem === undefined || noteSystem === null || noteSystem === "")
      throw new Error("Note system cannot be empty");

    this.createDSPNote(
      {
        name: noteName!,
        description: noteDescription!,
        system: noteSystem!
      }
    );

    this.dspNoteForm.reset();
  }

  createNoteViewModel(note: DSPNote, system: DSPSystem) {
    this.dspNotes.push({
      name: note.name,
      description: note.description,
      system_name: system.name,
      uri: note._links.self.href
    });
  };

  updateNoteViewModels() {
    this.dspNoteList.forEach((note: DSPNote) => {
      this.dspService.getDSPSystem(note._links.system.href)
        .subscribe((system: DSPSystem) => this.createNoteViewModel(note, system));
    });
  };

  createDSPNote(note: DSPNote){
    this.dspService
      .addDSPNote(note)
      .subscribe((note: DSPNote)=>{
        this.dspService.getDSPSystem(note._links.system.href)
        .subscribe((system: DSPSystem) => {
          note.system = system._links.self.href;
          this.dspNoteList.push(note);
  
          this.createNoteViewModel(note, system);
      });
      });
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
