import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ToolbarEntrepreneurContentComponent } from './toolbar-entrepreneur-content.component';

describe('ToolbarEntrepreneurContentComponent', () => {
  let component: ToolbarEntrepreneurContentComponent;
  let fixture: ComponentFixture<ToolbarEntrepreneurContentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ToolbarEntrepreneurContentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ToolbarEntrepreneurContentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
