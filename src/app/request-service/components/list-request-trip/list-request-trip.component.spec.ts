import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRequestTripComponent } from './list-request-trip.component';

describe('ListTripComponent', () => {
  let component: ListRequestTripComponent;
  let fixture: ComponentFixture<ListRequestTripComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListRequestTripComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListRequestTripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
