import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LastDeliveryComponent } from './last-delivery.component';

describe('LastDeliveryComponent', () => {
  let component: LastDeliveryComponent;
  let fixture: ComponentFixture<LastDeliveryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LastDeliveryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LastDeliveryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
