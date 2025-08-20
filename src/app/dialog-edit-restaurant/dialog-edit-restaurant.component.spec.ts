import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogEditRestaurantComponent } from './dialog-edit-restaurant.component';

describe('DialogEditRestaurantComponent', () => {
  let component: DialogEditRestaurantComponent;
  let fixture: ComponentFixture<DialogEditRestaurantComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogEditRestaurantComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogEditRestaurantComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
