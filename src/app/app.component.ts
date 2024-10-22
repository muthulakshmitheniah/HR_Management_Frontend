import { Component } from '@angular/core';
import { RouterOutlet,RouterModule } from '@angular/router';
import { AdminModule } from './admin/admin.module';
import { DepartmentFilterPipe } from './pipe/department-filter.pipe';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterModule,AdminModule,DepartmentFilterPipe],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'hr_management';
}
