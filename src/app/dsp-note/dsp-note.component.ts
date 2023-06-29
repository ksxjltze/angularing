import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { DSPNote } from '../models/dsp-note';
import { DspService } from '../services/dsp.service';
import { DSPSystem } from '../models/dsp-system';
import { DSPNoteViewModel } from '../view-models/dsp-note-viewmodel';

@Component({
  selector: 'app-dsp-note',
  standalone: true,
  templateUrl: './dsp-note.component.html',
  styleUrls: ['./dsp-note.component.css']
})
export class DspNoteComponent {
  @Input() dspNote!: DSPNoteViewModel
  @Output("deleteDspNote") onDeleteDspNote: EventEmitter<any> = new EventEmitter();
  dspService: DspService = inject(DspService);

  deleteDspNote(){
    this.onDeleteDspNote.emit(this.dspNote.uri);
  }

  constructor() {

  }
}
