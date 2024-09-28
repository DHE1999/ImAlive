import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiabetiesComponent } from './diabeties.component';

describe('DiabetiesComponent', () => {
  let component: DiabetiesComponent;
  let fixture: ComponentFixture<DiabetiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiabetiesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DiabetiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
