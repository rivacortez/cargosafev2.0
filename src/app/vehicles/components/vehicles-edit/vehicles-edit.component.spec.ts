import { ComponentFixture, TestBed } from '@angular/core/testing';
import {VehiclesEdit} from "./vehicles-edt.component";


describe('VehiclesCreateAndEditComponent', () => {
  let component: VehiclesEdit;
  let fixture: ComponentFixture<VehiclesEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [VehiclesEdit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehiclesEdit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
