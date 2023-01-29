import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllTransactionDetailsComponent } from './all-transaction-details.component';

describe('AllTransactionDetailsComponent', () => {
  let component: AllTransactionDetailsComponent;
  let fixture: ComponentFixture<AllTransactionDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllTransactionDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AllTransactionDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
