import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Faculty } from '../model/faculty';

@Injectable({
  providedIn: 'root'
})
export class FacultyService {
  private apiUrl = 'http://localhost:3000/api/faculties';

  constructor(private http: HttpClient) {}

  getFaculties(): Observable<Faculty[]> {
    return this.http.get<Faculty[]>(this.apiUrl);
  }

  getFaculty(facultyNumber: string): Observable<Faculty> {
    return this.http.get<Faculty>(`${this.apiUrl}/${facultyNumber}`);
  }

  addFaculty(formData: FormData): Observable<any> {
    return this.http.post<any>(this.apiUrl, formData);
  }

  updateFaculty(formData: FormData, facultyNumber: string): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${facultyNumber}`, formData);
  }

  deleteFaculty(facultyNumber: string): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/${facultyNumber}`);
  }

  getFacultiesByDepartment(department: string): Observable<Faculty[]> {
    return this.http.get<Faculty[]>(`${this.apiUrl}?department=${department}`);
  }
}
