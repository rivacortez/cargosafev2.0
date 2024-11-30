import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DriversEditComponent } from './drivers-edit.component';

describe('DriversCreateAndEditComponent', () => {
  let component: DriversEditComponent;
  let fixture: ComponentFixture<DriversEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DriversEditComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DriversEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
