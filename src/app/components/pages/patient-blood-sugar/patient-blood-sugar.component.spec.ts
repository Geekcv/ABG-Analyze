import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientBloodSugarComponent } from './patient-blood-sugar.component';

describe('PatientBloodSugarComponent', () => {
  let component: PatientBloodSugarComponent;
  let fixture: ComponentFixture<PatientBloodSugarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientBloodSugarComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientBloodSugarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
