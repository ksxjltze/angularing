import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DysonSphereProgramNotesComponent } from './dyson-sphere-program-notes.component';

describe('DysonSphereProgramNotesComponent', () => {
  let component: DysonSphereProgramNotesComponent;
  let fixture: ComponentFixture<DysonSphereProgramNotesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ DysonSphereProgramNotesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DysonSphereProgramNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
