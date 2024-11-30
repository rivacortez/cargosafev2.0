import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTripEntrepreneurComponent } from './list-trip-entrepreneur.component';

describe('ListTripEntrepreneurComponent', () => {
  let component: ListTripEntrepreneurComponent;
  let fixture: ComponentFixture<ListTripEntrepreneurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListTripEntrepreneurComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListTripEntrepreneurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
