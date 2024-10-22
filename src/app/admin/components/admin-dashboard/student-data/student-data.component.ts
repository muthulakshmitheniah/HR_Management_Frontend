import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { StudentService } from '../../../../service/student.service';
import { Student } from '../../../../model/student';
import * as bootstrap from 'bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, CommonModule],
  selector: 'app-student-data',
  templateUrl: './student-data.component.html',
  styleUrls: ['./student-data.component.css']
})
export class StudentDataComponent implements OnInit {
  studentDetailsForm!: FormGroup;
  students: Student[] = [];
  isEditing = false;
  selectedStudentId: string | null = null;
  totalStudents: number = 0;

  constructor(private fb: FormBuilder, private studentService: StudentService) {}

  ngOnInit(): void {
    this.initForm();
    this.loadStudents();
  }

  initForm() {
    this.studentDetailsForm = this.fb.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      profile: [null],
      birth_date: ['', Validators.required],
      mobile: ['', [Validators.required, Validators.pattern('^[0-9]{10}$')]],
      email: ['', [Validators.required, Validators.email]],
      department: ['', Validators.required],
      cgpa: ['', [Validators.required, Validators.pattern('^[0-9](\.[0-9]{1,2})?$')]]
    });
  }

  loadStudents() {
    this.studentService.getStudents().subscribe(
      (data: any) => {
        this.students = data;
        this.totalStudents = data.length;
      },
      (error) => {
        console.error('Error loading students', error);
      }
    );
  }

  onFileChange(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.studentDetailsForm.patchValue({
        profile: file
      });
    }
  }

  addStudent() {
    if (this.studentDetailsForm.valid) {
      const formData = new FormData();
      for (const key in this.studentDetailsForm.value) {
        if (this.studentDetailsForm.value[key]) {
          formData.append(key, this.studentDetailsForm.value[key]);
        }
      }

      this.studentService.addStudent(formData).subscribe(
        response => {
          console.log('Student added successfully', response);
          this.loadStudents();
          this.studentDetailsForm.reset();
          $('#addStudentModal').modal('hide'); // Use jQuery to hide modal
        },
        error => {
          console.error('Error adding student', error);
        }
      );
    } else {
      console.log('Form is invalid');
      this.studentDetailsForm.markAllAsTouched();
    }
  }

  editStudent(id: string) {
    this.isEditing = true;
    const student = this.students.find(s => s.id === id);
    if (student) {
      this.selectedStudentId = id;
      this.studentDetailsForm.patchValue({
        id: student.id,
        name: student.name,
        birth_date: student.birth_date,
        mobile: student.mobile,
        email: student.email,
        department: student.department,
        cgpa: student.cgpa
      });
    }
    $('#addStudentModal').modal('show'); // Use jQuery to show modal
  }

  updateStudent() {
    if (this.studentDetailsForm.valid && this.selectedStudentId) {
      const formData = new FormData();
      for (const key in this.studentDetailsForm.value) {
        if (this.studentDetailsForm.value[key]) {
          formData.append(key, this.studentDetailsForm.value[key]);
        }
      }

      this.studentService.updateStudent(formData, this.selectedStudentId).subscribe(
        response => {
          console.log('Student updated successfully', response);
          this.loadStudents();
          this.studentDetailsForm.reset();
          this.isEditing = false;
          this.selectedStudentId = null;
          $('#addStudentModal').modal('hide'); // Use jQuery to hide modal
        },
        error => {
          console.error('Error updating student', error);
        }
      );
    } else {
      console.log('Form is invalid');
      this.studentDetailsForm.markAllAsTouched();
    }
  }

  cancelEdit() {
    this.isEditing = false;
    this.selectedStudentId = null;
    this.studentDetailsForm.reset();
    $('#addStudentModal').modal('hide'); // Use jQuery to hide modal
  }

  deleteStudent(id: string) {
    this.studentService.deleteStudent(id).subscribe(
      response => {
        console.log('Student deleted successfully', response);
        this.loadStudents();
      },
      error => {
        console.error('Error deleting student', error);
      }
    );
  }
}
