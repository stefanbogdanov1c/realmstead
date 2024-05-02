import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KingdomsComponent } from './kingdoms.component';

describe('KingdomsComponent', () => {
  let component: KingdomsComponent;
  let fixture: ComponentFixture<KingdomsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [KingdomsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(KingdomsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
