import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTripsEntrepreneurComponent } from './list-trips-entrepreneur.component';

describe('ListTripsEntrepreneurComponent', () => {
  let component: ListTripsEntrepreneurComponent;
  let fixture: ComponentFixture<ListTripsEntrepreneurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListTripsEntrepreneurComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListTripsEntrepreneurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
