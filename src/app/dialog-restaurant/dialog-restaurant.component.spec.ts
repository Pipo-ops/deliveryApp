import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogRestaurantComponent } from './dialog-restaurant.component';

describe('DialogRestaurantComponent', () => {
  let component: DialogRestaurantComponent;
  let fixture: ComponentFixture<DialogRestaurantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogRestaurantComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogRestaurantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
