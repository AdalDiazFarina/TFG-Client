import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileDetailsPageComponent } from './profile-details-page.component';

describe('ProfileDetailsPageComponent', () => {
  let component: ProfileDetailsPageComponent;
  let fixture: ComponentFixture<ProfileDetailsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProfileDetailsPageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ProfileDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
