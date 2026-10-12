import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AbgCalculatorComponent } from './abg-calculator.component';

describe('AbgCalculatorComponent', () => {
  let component: AbgCalculatorComponent;
  let fixture: ComponentFixture<AbgCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AbgCalculatorComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AbgCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
