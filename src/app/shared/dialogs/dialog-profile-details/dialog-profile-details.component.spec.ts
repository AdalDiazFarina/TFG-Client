import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogProfileDetailsComponent } from './dialog-profile-details.component';

describe('DialogProfileDetailsComponent', () => {
  let component: DialogProfileDetailsComponent;
  let fixture: ComponentFixture<DialogProfileDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogProfileDetailsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogProfileDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
