import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Faculty } from '../../../../model/faculty';
import { Student } from '../../../../model/student';
import { FacultyService } from '../../../../service/faculty.service';
import { StudentService } from '../../../../service/student.service';
import { DepartmentFilterPipe } from '../../../../pipe/department-filter.pipe';

@Component({
  selector: 'app-faculty-student',
  standalone: true,
  imports: [CommonModule, DepartmentFilterPipe],
  templateUrl: './faculty-student.component.html',
  styleUrls: ['./faculty-student.component.css']
})
export class FacultyStudentComponent implements OnInit {
  teachers: Faculty[] = [];
  students: Student[] = [];
  departments = ['CSE', 'IT'];

  constructor(private facultyService: FacultyService, private studentService: StudentService) {}

  ngOnInit(): void {
    this.loadClasses();
  }

  loadClasses() {
    this.facultyService.getFaculties().subscribe(faculty => {
      console.log('All Faculties:', faculty);
      this.teachers = faculty;
      this.loadStudents();
    });
  }

  loadStudents() {
    this.studentService.getStudents().subscribe(students => {
      console.log('All Students:', students);
      this.students = students;
    });
  }

  getStudentsByTeacher(department: string): { [teacher: string]: Student[] } {
    const teachers = this.teachers.filter(teacher => teacher.department === department);
    const students = this.students.filter(student => student.department === department).sort((a, b) => a.name.localeCompare(b.name));
    const teacherStudentMap: { [teacher: string]: Student[] } = {};

    console.log(`Teachers in ${department}:`, teachers);
    console.log(`Students in ${department}:`, students);

    // Initialize the map with empty arrays for each teacher
    teachers.forEach(teacher => {
      teacherStudentMap[teacher.faculty_name] = [];
    });

    // Distribute students evenly among teachers
    students.forEach((student, index) => {
      const teacherIndex = index % teachers.length;
      const teacherName = teachers[teacherIndex].faculty_name;
      teacherStudentMap[teacherName].push(student);
    });

    console.log(`Teacher-Student Map for ${department}:`, teacherStudentMap);

    return teacherStudentMap;
  }
}
