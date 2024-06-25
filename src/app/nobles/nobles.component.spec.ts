import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoblesComponent } from './nobles.component';

describe('NoblesComponent', () => {
  let component: NoblesComponent;
  let fixture: ComponentFixture<NoblesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoblesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NoblesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
