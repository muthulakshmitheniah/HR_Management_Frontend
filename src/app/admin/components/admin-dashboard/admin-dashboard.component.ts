import { Component, OnInit } from '@angular/core';
import { FacultyDataComponent } from './faculty-data/faculty-data.component';
import { FacultyStudentComponent } from './faculty-student/faculty-student.component';
import { StudentDataComponent } from './student-data/student-data.component';

import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [RouterModule,CommonModule,FacultyDataComponent,FacultyStudentComponent,StudentDataComponent],
  templateUrl: './admin-dashboard.component.html',
  styleUrl: './admin-dashboard.component.css'
})
export class AdminDashboardComponent implements OnInit{

  faculty : boolean = false;
  teacher_student : boolean = false;
  student: boolean = false;

  constructor(private router : Router){}

  ngOnInit(): void {
      this.showFacultyData();
  }

  setoff() {
    this.faculty = false;
    this.teacher_student = false;
    this.student = false;
  }

  showFacultyData(){
    this.setoff();
    this.faculty = true;
  }

  showTeacherStudentData(){
    this.setoff();
    this.teacher_student = true;
  }

  showStudentData(){
    this.setoff();
    this.student = true;
  }
  signout() {
    localStorage.removeItem("token");
    this.router.navigate(['admin/login']);
  }
}
