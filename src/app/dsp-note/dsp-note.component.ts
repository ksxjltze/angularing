import { Component, Input } from '@angular/core';
import { DspNote } from '../models/dsp-note';

@Component({
  selector: 'app-dsp-note',
  standalone: true,
  templateUrl: './dsp-note.component.html',
  styleUrls: ['./dsp-note.component.css']
})
export class DspNoteComponent {
  @Input() dspNote!: DspNote
}
