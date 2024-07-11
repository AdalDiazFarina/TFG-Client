import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TotalReturnGraphicComponent } from './total-return-graphic.component';

describe('TotalReturnGraphicComponent', () => {
  let component: TotalReturnGraphicComponent;
  let fixture: ComponentFixture<TotalReturnGraphicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TotalReturnGraphicComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TotalReturnGraphicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
