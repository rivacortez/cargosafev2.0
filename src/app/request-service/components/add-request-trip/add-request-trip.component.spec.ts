import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRequestTripComponent } from './add-request-trip.component';

describe('AddTripComponent', () => {
  let component: AddRequestTripComponent;
  let fixture: ComponentFixture<AddRequestTripComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddRequestTripComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddRequestTripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
