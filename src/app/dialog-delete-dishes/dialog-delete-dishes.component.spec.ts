import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDeleteDishesComponent } from './dialog-delete-dishes.component';

describe('DialogDeleteDishesComponent', () => {
  let component: DialogDeleteDishesComponent;
  let fixture: ComponentFixture<DialogDeleteDishesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogDeleteDishesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogDeleteDishesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
