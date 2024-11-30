import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVehiclesManagementComponent } from './add-vehicles-management.component';

describe('AddVehiclesManagementComponent', () => {
  let component: AddVehiclesManagementComponent;
  let fixture: ComponentFixture<AddVehiclesManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddVehiclesManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddVehiclesManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
