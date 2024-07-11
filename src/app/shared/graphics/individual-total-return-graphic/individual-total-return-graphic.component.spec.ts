import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IndividualTotalReturnGraphicComponent } from './individual-total-return-graphic.component';

describe('IndividualTotalReturnGraphicComponent', () => {
  let component: IndividualTotalReturnGraphicComponent;
  let fixture: ComponentFixture<IndividualTotalReturnGraphicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IndividualTotalReturnGraphicComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IndividualTotalReturnGraphicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
