import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogUpdateInvestmentprofileComponent } from './dialog-investmentprofile.component';

describe('DialogUpdateInvestmentprofileComponent', () => {
  let component: DialogUpdateInvestmentprofileComponent;
  let fixture: ComponentFixture<DialogUpdateInvestmentprofileComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogUpdateInvestmentprofileComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogUpdateInvestmentprofileComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
