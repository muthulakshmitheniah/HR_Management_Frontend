import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Student } from '../model/student';

@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private apiUrl = 'http://localhost:3000/api/students'; // Adjust the URL as needed

  constructor(private http: HttpClient) {}

  getStudents(): Observable<Student[]> {
    return this.http.get<Student[]>(this.apiUrl);
  }

  addStudent(studentData: FormData): Observable<Student> {
    return this.http.post<Student>(this.apiUrl, studentData);
  }

  updateStudent(studentData: FormData, id: string): Observable<Student> {
    return this.http.put<Student>(`${this.apiUrl}/${id}`, studentData);
  }

  deleteStudent(id: string): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getStudentsByDepartment(department: string): Observable<Student[]> {
    return this.http.get<Student[]>(`${this.apiUrl}?department=${department}`);
  }
}
