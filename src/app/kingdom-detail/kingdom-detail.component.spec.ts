import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KingdomDetailComponent } from './kingdom-detail.component';

describe('KingdomDetailComponent', () => {
  let component: KingdomDetailComponent;
  let fixture: ComponentFixture<KingdomDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KingdomDetailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KingdomDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
