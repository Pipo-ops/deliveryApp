import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogCatagoryComponent } from './dialog-catagory.component';

describe('DialogCatagoryComponent', () => {
  let component: DialogCatagoryComponent;
  let fixture: ComponentFixture<DialogCatagoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogCatagoryComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DialogCatagoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
