import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VolatilityGraphicComponent } from './volatility-graphic.component';

describe('VolatilityGraphicComponent', () => {
  let component: VolatilityGraphicComponent;
  let fixture: ComponentFixture<VolatilityGraphicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VolatilityGraphicComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(VolatilityGraphicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
