import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FacultyService } from '../../../../service/faculty.service';
import { Faculty } from '../../../../model/faculty';
import * as bootstrap from 'bootstrap';
import { ajax, css } from "jquery";
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@Component({
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,CommonModule],
  selector: 'app-faculty-data',
  templateUrl: './faculty-data.component.html',
  styleUrls: ['./faculty-data.component.css']
})
export class FacultyDataComponent implements OnInit {
  facultyDetailsForm!: FormGroup;
  faculties: Faculty[] = [];
  isEditing = false;
  selectedFacultyNumber: string | null = null;
  totalFaculties: number = 0;

  constructor(private fb: FormBuilder, private facultyService: FacultyService) {}

  ngOnInit(): void {
    this.initForm();
    this.loadFaculties();
  }

  initForm() {
    this.facultyDetailsForm = this.fb.group({
      faculty_number: ['', Validators.required],
      faculty_name: ['', Validators.required],
      faculty_profile: [null],
      joining_year: ['', [Validators.required, Validators.pattern('^[0-9]{4}$')]],
      birth_date: ['', Validators.required],
      department: ['', Validators.required],
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      faculty_email: ['', [Validators.required]]
    });
  }

  loadFaculties() {
    this.facultyService.getFaculties().subscribe(
      (data: any) => {
        this.faculties = data;
        this.totalFaculties = data.length;
      },
      (error) => {
        console.error('Error loading faculties', error);
      }
    );
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.facultyDetailsForm.patchValue({
        faculty_profile: file
      });
    }
  }

  addFaculty() {
    if (this.facultyDetailsForm.valid) {
      const formData = new FormData();
      for (const key in this.facultyDetailsForm.value) {
        if (this.facultyDetailsForm.value[key]) {
          formData.append(key, this.facultyDetailsForm.value[key]);
        }
      }

      this.facultyService.addFaculty(formData).subscribe(
        response => {
          console.log('Faculty added successfully', response);
          this.loadFaculties();
          this.facultyDetailsForm.reset();
          $('#addFacultyModal').modal('hide'); // Use jQuery to hide modal
        },
        error => {
          console.error('Error adding faculty', error);
        }
      );
    } else {
      console.log('Form is invalid');
      this.facultyDetailsForm.markAllAsTouched();
    }
  }

  editFaculty(faculty_number: string) {
    this.isEditing = true;
    const faculty = this.faculties.find(f => f.faculty_number === faculty_number);
    if (faculty) {
      this.selectedFacultyNumber = faculty_number;
      this.facultyDetailsForm.patchValue({
        faculty_number: faculty.faculty_number,
        faculty_name: faculty.faculty_name,
        faculty_profile: faculty.faculty_profile,
        joining_year: faculty.joining_year,
        birth_date: faculty.birth_date,
        department: faculty.department,
        mobile: faculty.mobile,
        faculty_email: faculty.faculty_email
      });
    }
    $('#addFacultyModal').modal('show'); // Use jQuery to show modal
  }

  updateFaculty() {
    if (this.facultyDetailsForm.valid && this.selectedFacultyNumber) {
      const formData = new FormData();
      for (const key in this.facultyDetailsForm.value) {
        if (this.facultyDetailsForm.value[key]) {
          formData.append(key, this.facultyDetailsForm.value[key]);
        }
      }

      this.facultyService.updateFaculty(formData, this.selectedFacultyNumber).subscribe(
        response => {
          console.log('Faculty updated successfully', response);
          this.loadFaculties();
          this.facultyDetailsForm.reset();
          this.isEditing = false;
          this.selectedFacultyNumber = null;
          $('#addFacultyModal').modal('hide'); // Use jQuery to hide modal
        },
        error => {
          console.error('Error updating faculty', error);
        }
      );
    } else {
      console.log('Form is invalid');
      this.facultyDetailsForm.markAllAsTouched();
    }
  }

  cancelEdit() {
    this.isEditing = false;
    this.selectedFacultyNumber = null;
    this.facultyDetailsForm.reset();
    $('#addFacultyModal').modal('hide'); // Use jQuery to hide modal
  }

  deleteFaculty(faculty_number: string) {
    this.facultyService.deleteFaculty(faculty_number).subscribe(
      response => {
        console.log('Faculty deleted successfully', response);
        this.loadFaculties();
      },
      error => {
        console.error('Error deleting faculty', error);
      }
    );
  }
}
