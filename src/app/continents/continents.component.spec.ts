import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContinentsComponent } from './continents.component';

describe('ContinentsComponent', () => {
  let component: ContinentsComponent;
  let fixture: ComponentFixture<ContinentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ContinentsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContinentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
