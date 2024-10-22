import { Pipe, PipeTransform } from '@angular/core';
import { Faculty } from '../model/faculty';

@Pipe({
  name: 'departmentFilter',
  standalone: true
})
export class DepartmentFilterPipe implements PipeTransform {
  transform(teachers: Faculty[], department: string): Faculty[] {
    return teachers.filter(teacher => teacher.department === department);
  }
}
