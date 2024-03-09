import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpenseSimulatorComponent } from './expense-simulator.component';

describe('ExpenseSimulatorComponent', () => {
  let component: ExpenseSimulatorComponent;
  let fixture: ComponentFixture<ExpenseSimulatorComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ExpenseSimulatorComponent]
    });
    fixture = TestBed.createComponent(ExpenseSimulatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
