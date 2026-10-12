import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PatientSugarHistoryComponent } from './patient-sugar-history.component';

describe('PatientSugarHistoryComponent', () => {
  let component: PatientSugarHistoryComponent;
  let fixture: ComponentFixture<PatientSugarHistoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PatientSugarHistoryComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PatientSugarHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
