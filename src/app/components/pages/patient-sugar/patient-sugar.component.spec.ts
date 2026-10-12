import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientSugarComponent } from './patient-sugar.component';

describe('PatientSugarComponent', () => {
  let component: PatientSugarComponent;
  let fixture: ComponentFixture<PatientSugarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientSugarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientSugarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
