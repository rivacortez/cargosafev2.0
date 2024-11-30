import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDriverManagementComponent } from './add-driver-management.component';

describe('AddDriverManagementComponent', () => {
  let component: AddDriverManagementComponent;
  let fixture: ComponentFixture<AddDriverManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddDriverManagementComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddDriverManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
