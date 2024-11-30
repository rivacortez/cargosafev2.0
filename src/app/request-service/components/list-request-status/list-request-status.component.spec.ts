import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRequestStatusComponent } from './list-request-status.component';

describe('ListRequestStatusComponent', () => {
  let component: ListRequestStatusComponent;
  let fixture: ComponentFixture<ListRequestStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListRequestStatusComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListRequestStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
