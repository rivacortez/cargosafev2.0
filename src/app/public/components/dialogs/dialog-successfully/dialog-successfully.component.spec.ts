import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSuccessfullyComponent } from './dialog-successfully.component';

describe('DialogSuccessfullyComponent', () => {
  let component: DialogSuccessfullyComponent;
  let fixture: ComponentFixture<DialogSuccessfullyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DialogSuccessfullyComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DialogSuccessfullyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
