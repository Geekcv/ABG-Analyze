import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OldPatientsComponent } from './old-patients.component';

describe('OldPatientsComponent', () => {
  let component: OldPatientsComponent;
  let fixture: ComponentFixture<OldPatientsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OldPatientsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OldPatientsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
