import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddInvestmentprofileComponent } from './dialog-add-investmentprofile.component';

describe('DialogAddInvestmentprofileComponent', () => {
  let component: DialogAddInvestmentprofileComponent;
  let fixture: ComponentFixture<DialogAddInvestmentprofileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogAddInvestmentprofileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogAddInvestmentprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
