import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FacultyTrainingComponent } from './faculty-student.component';

describe('FacultyTrainingComponent', () => {
  let component: FacultyTrainingComponent;
  let fixture: ComponentFixture<FacultyTrainingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FacultyTrainingComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FacultyTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
