import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DspNoteComponent } from './dsp-note.component';

describe('DspNoteComponent', () => {
  let component: DspNoteComponent;
  let fixture: ComponentFixture<DspNoteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DspNoteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DspNoteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
