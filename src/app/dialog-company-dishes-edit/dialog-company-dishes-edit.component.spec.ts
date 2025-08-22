import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCompanyDishesEditComponent } from './dialog-company-dishes-edit.component';

describe('DialogCompanyDishesEditComponent', () => {
  let component: DialogCompanyDishesEditComponent;
  let fixture: ComponentFixture<DialogCompanyDishesEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogCompanyDishesEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogCompanyDishesEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
