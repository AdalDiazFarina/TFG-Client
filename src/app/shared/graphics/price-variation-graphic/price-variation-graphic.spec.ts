import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PriceVariationGraphicComponent } from './price-variation-graphic.component';

describe('PriceVariationGraphicComponent', () => {
  let component: PriceVariationGraphicComponent;
  let fixture: ComponentFixture<PriceVariationGraphicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PriceVariationGraphicComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PriceVariationGraphicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
