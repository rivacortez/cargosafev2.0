import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddDetailsTripComponent } from './add-details-trip.component';

describe('AddDetailsTripComponent', () => {
  let component: AddDetailsTripComponent;
  let fixture: ComponentFixture<AddDetailsTripComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddDetailsTripComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddDetailsTripComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
